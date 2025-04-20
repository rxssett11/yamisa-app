import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { supabase } from '../../lib/supabase';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';

const icon = require('@/assets/images/logo_abarrotes.png');

type Producto = {
  id_product: number;
  nombre_product: string;
  precio_product: number;
  stock_product: number;
  vendidos_product: number;
};

const ItemsScreen = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [cantidadStock, setCantidadStock] = useState<string>('0');

  const [razonModalVisible, setRazonModalVisible] = useState(false);
  const [accionPendiente, setAccionPendiente] = useState<'disminuir' | 'eliminar' | null>(null);
  const [razonCambio, setRazonCambio] = useState('');


  const schemeTheme = useColorScheme();
  const isDark = schemeTheme === 'dark';

  const colors = {
    background: isDark ? '#121212' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    surface: isDark ? '#1e1e1e' : '#f5f5f5',
    primary: isDark ? '#90caf9' : '#1976d2',
    error: isDark ? '#ef5350' : '#d32f2f',
    modalBackground: isDark ? '#1e1e1e' : '#ffffff',
    modalText: isDark ? '#ffffff' : '#333333',
  };

  const fetchProductos = async () => {
    try {
      const { data, error } = await supabase.from('productos_yamisa').select('*');
      if (error) throw error;
      setProductos(data as Producto[]);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const actualizarStock = async (id: number, cantidad: number) => {
    const producto = productos.find((p) => p.id_product === id);
    if (!producto) return;

    const nuevoStock = producto.stock_product + cantidad;
    if (nuevoStock < 0) {
      Alert.alert('Error', 'No se puede reducir el stock por debajo de 0.');
      return;
    }

    try {
      const { error } = await supabase
        .from('productos_yamisa')
        .update({ stock_product: nuevoStock })
        .eq('id_product', id);
      if (error) throw error;
      fetchProductos();
      setModalVisible(false);
      setCantidadStock('0');
    } catch (error) {
      console.error('Error al actualizar stock:', error);
    }
  };


  const registrarRazon = async (id_producto: number, razon: string, tipo: 'disminuir' | 'eliminar') => {
    try {
      const { error } = await supabase.from('registro_stock').insert([
        {
          id_product: id_producto,
          razon_cambio: razon,
          tipo_cambio: tipo,
          fecha_cambio: new Date().toISOString(),
        },
      ]);
      if (error) throw error;
    } catch (error) {
      console.error('Error al registrar razón:', error);
    }
  };


  const eliminarProducto = async (id: number) => {
    try { 
      const { error } = await supabase.from('productos_yamisa').delete().eq('id_product', id);
      if (error) throw error;
      setModalVisible(false);
      fetchProductos();
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el producto.');
      console.error('Error al eliminar producto:', error);
    }
  };

  const showModal = (producto: Producto) => {
    setSelectedProduct(producto);
    setCantidadStock('0');
    setModalVisible(true);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.text }}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <ParallaxScrollView
      headerImage={<Image source={icon} style={styles.headerImage} resizeMode="contain" />}
      headerBackgroundColor={{ light: '#31D490', dark: '#1E3A5F' }}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Stock Disponible</ThemedText>
      </ThemedView>

      <View style={[styles.cardContainer, { backgroundColor: colors.background }]}>
        {productos.map((item) => (
          <Card key={item.id_product} style={[styles.card, { backgroundColor: colors.surface }]}>
            <Card.Title title={item.nombre_product} titleStyle={{ color: colors.text }} />
            <Card.Content>
              <Text style={{ color: colors.text }}>Precio: ${item.precio_product}</Text>
              <Text style={{ color: colors.text }}>Stock: {item.stock_product}</Text>
              <Text style={{ color: colors.text }}>Vendidos: {item.vendidos_product}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() => showModal(item)}
                style={{ backgroundColor: colors.primary }}
              >
                Detalles
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </View>

      <Modal visible={razonModalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: colors.modalBackground }]}>
            <Text style={[styles.modalTitle, { color: colors.modalText }]}>¿Cuál es la razón?</Text>
            <TextInput
              placeholder="Escribe la razón del cambio..."
              value={razonCambio}
              onChangeText={setRazonCambio}
              style={{
                backgroundColor: isDark ? '#2c2c2c' : '#f0f0f0',
                color: colors.text,
                padding: 10,
                borderRadius: 8,
                marginBottom: 15,
              }}
            />

            <Button
              mode="contained"
              onPress={async () => {
                if (!selectedProduct || !accionPendiente) return;

                await registrarRazon(selectedProduct.id_product, razonCambio, accionPendiente);

                if (accionPendiente === 'disminuir') {
                  await actualizarStock(
                    selectedProduct.id_product,
                    -parseInt(cantidadStock || '0', 10)
                  );
                } else if (accionPendiente === 'eliminar') {
                  await eliminarProducto(selectedProduct.id_product);
                }

                setRazonCambio('');
                setAccionPendiente(null);
                setRazonModalVisible(false);
              }}
              style={[styles.modalButton, { backgroundColor: colors.primary }]}
            >
              Confirmar
            </Button>

            <Button
              mode="outlined"
              onPress={() => {
                setRazonModalVisible(false);
                setRazonCambio('');
                setAccionPendiente(null);
              }}
              style={[styles.modalButton, { marginTop: 10 }]}
            >
              Cancelar
            </Button>
          </View>
        </View>
      </Modal>


      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: colors.modalBackground }]}>
            <Text style={[styles.modalTitle, { color: colors.modalText }]}>Detalles del Producto</Text>
            {selectedProduct && (
              <>
                <Text style={[styles.modalText, { color: colors.modalText }]}>
                  <Text style={[styles.bold, { color: colors.modalText }]}>Nombre:</Text> {selectedProduct.nombre_product}
                </Text>
                <Text style={[styles.modalText, { color: colors.modalText }]}>
                  <Text style={[styles.bold, { color: colors.modalText }]}>Precio:</Text> ${selectedProduct.precio_product}
                </Text>
                <Text style={[styles.modalText, { color: colors.modalText }]}>
                  <Text style={[styles.bold, { color: colors.modalText }]}>Stock:</Text> {selectedProduct.stock_product}
                </Text>
                <Text style={[styles.modalText, { color: colors.modalText }]}>
                  <Text style={[styles.bold, { color: colors.modalText }]}>Vendidos:</Text> {selectedProduct.vendidos_product}
                </Text>

                {/* Campo para modificar stock */}
                <TextInput
                  placeholder="Cantidad a ajustar"
                  placeholderTextColor={isDark ? '#31D490' : '#1D3D47'}
                  keyboardType="numeric"
                  value={cantidadStock}
                  onChangeText={setCantidadStock}
                  style={{
                    backgroundColor: '#f0f0f0',
                    borderRadius: 8,
                    padding: 10,
                    marginVertical: 10,
                    color: '#000',
                  }}
                />

                <View style={styles.buttonContainer}>
                  <Button
                    mode="contained"
                    onPress={() =>
                      actualizarStock(
                        selectedProduct.id_product,
                        parseInt(cantidadStock || '0', 10)
                      )
                    }
                    style={[styles.modalButton, { backgroundColor: colors.primary }]}
                  >
                    Aumentar
                  </Button>
                  <Button
                    mode="contained"
                    onPress={() => {
                      setAccionPendiente('disminuir');
                      setRazonModalVisible(true);
                    }}
                    style={[styles.modalButton, { backgroundColor: colors.error }]}
                  >
                    Disminuir
                  </Button>
                </View>
                <Button
                  mode="contained"
                  onPress={() => {
                    setAccionPendiente('eliminar');
                    setRazonModalVisible(true);
                  }}
                  style={[styles.modalButton, { backgroundColor: colors.error, marginTop: 10 }]}
                >
                  Eliminar
                </Button>

                <Button
                  mode="outlined"
                  onPress={() => setModalVisible(false)}
                  style={[styles.modalButton, { marginTop: 10 }]}
                >
                  Cerrar
                </Button>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ParallaxScrollView>
  );
};

export default ItemsScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 40,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  cardContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 12,
    elevation: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    padding: 25,
    borderRadius: 15,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    borderRadius: 5,
  },
});
