import { StyleSheet, Image, View, useColorScheme, ScrollView, Modal, TouchableOpacity, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DataTable, Button } from 'react-native-paper';
import { useState } from 'react';

const icon = require('@/assets/images/logo_abarrotes.png');

const proveedores = [
  { name: 'Distribuidora El Sol', product: 'Arroz, Frijoles', phone: '555-1234', address: 'Calle 123, CDMX' },
  { name: 'Lácteos del Valle', product: 'Leche, Queso', phone: '555-5678', address: 'Av. Central, Monterrey' },
  { name: 'Panadería San Juan', product: 'Pan, Galletas', phone: '555-9012', address: 'Carrera 45, Bogotá' },
  { name: 'Carnes Selectas', product: 'Carne de res, Pollo', phone: '555-3456', address: 'Calle 8, Guadalajara' },
  { name: 'Bebidas La Fuente', product: 'Jugos, Refrescos', phone: '555-7890', address: 'Avenida Siempre Viva, Springfield' },
  { name: 'Verduras Frescas', product: 'Tomate, Lechuga', phone: '555-2345', address: 'Pasaje Verde, Lima' },
];

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? '#FFFFFF' : '#000000';
  const tableHeaderColor = colorScheme === 'dark' ? '#444' : '#DCDCDC';
  const backgroundColor = colorScheme === 'dark' ? '#1E3A5F' : '#31D490';

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  const showModal = (provider: Provider) => {
    setSelectedProvider(provider);
    setModalVisible(true);
  };

  type Provider = {
    name: string;
    product: string;
    phone: string;
    address: string;
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#31D490', dark: '#1E3A5F' }}
      headerImage={
        <View style={styles.headerContainer}>
          <Image source={icon} style={styles.headerImage} resizeMode="contain" />
        </View>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Proveedores</ThemedText>
      </ThemedView>
      <ThemedText>Listado de proveedores de la tienda de abarrotes.</ThemedText>
      <ScrollView>
        <DataTable style={styles.container}>
          <DataTable.Header style={[styles.tableHeader, { backgroundColor: tableHeaderColor }]}>
            <DataTable.Title textStyle={{ color: textColor }}>Proveedor</DataTable.Title>
            <DataTable.Title textStyle={{ color: textColor }}>Producto</DataTable.Title>
            <DataTable.Title textStyle={{ color: textColor }}>Acción</DataTable.Title>
          </DataTable.Header>

          {proveedores.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell textStyle={{ color: textColor }}>{item.name}</DataTable.Cell>
              <DataTable.Cell textStyle={{ color: textColor }}>{item.product}</DataTable.Cell>
              <DataTable.Cell>
                <Button mode="contained" onPress={() => showModal(item)} style={styles.button}>Ver</Button>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalles del Proveedor</Text>
            {selectedProvider && (
              <>
                <Text style={styles.modalText}><Text style={styles.bold}>Nombre:</Text> {selectedProvider.name}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Producto:</Text> {selectedProvider.product}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Teléfono:</Text> {selectedProvider.phone}</Text>
                <Text style={styles.modalText}><Text style={styles.bold}>Dirección:</Text> {selectedProvider.address}</Text>
              </>
            )}
            <View style={styles.buttonContainer}>
              <Button mode="contained" onPress={() => setModalVisible(false)} style={styles.modalButton}>Cerrar</Button>
              <Button mode="contained" onPress={() => setModalVisible(false)} style={styles.modalButton}>Llamar</Button>
            </View>
          </View>
        </View>
      </Modal>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    padding: 15,
  },
  tableHeader: {
    paddingVertical: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
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
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#31D490',
    borderRadius: 5,
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
    marginTop: 10,
    borderRadius: 5,
  },
});
