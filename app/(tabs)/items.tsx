import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, StyleSheet, View } from 'react-native';
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
    } catch (error) {
      console.error('Error al actualizar stock:', error);
    }
  };

  const showModal = (producto: Producto) => {
    setSelectedProduct(producto);
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
              <Button mode="contained" onPress={() => showModal(item)} style={{ backgroundColor: colors.primary }}>
                Detalles
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </View>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: colors.modalBackground }]}>
            <Text style={[styles.modalTitle, { color: colors.modalText }]}>Detalles del Producto</Text>
            {selectedProduct && (
              <>
                <Text style={[styles.modalText, { color: colors.modalText }]}><Text style={styles.bold}>Nombre:</Text> {selectedProduct.nombre_product}</Text>
                <Text style={[styles.modalText, { color: colors.modalText }]}><Text style={styles.bold}>Precio:</Text> ${selectedProduct.precio_product}</Text>
                <Text style={[styles.modalText, { color: colors.modalText }]}><Text style={styles.bold}>Stock:</Text> {selectedProduct.stock_product}</Text>
                <Text style={[styles.modalText, { color: colors.modalText }]}><Text style={styles.bold}>Vendidos:</Text> {selectedProduct.vendidos_product}</Text>
              </>
            )}
            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={() => setModalVisible(false)} style={[styles.modalButton, { backgroundColor: colors.primary }]}>
                Cerrar
              </Button>
              <Button mode="contained" onPress={() => setModalVisible(false)} style={[styles.modalButton, { backgroundColor: colors.error }]}>
                Eliminar
              </Button>
            </View>
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
  stockButton: {
    marginLeft: 8,
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
    marginTop: 15,
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    borderRadius: 5,
  },
});
