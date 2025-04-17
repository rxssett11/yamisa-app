import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { supabase } from '../../lib/supabase';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { BarChart } from 'react-native-chart-kit';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const screenWidth = Dimensions.get("window").width;

type Producto = {
  id_product: number;
  nombre_product: string;
  precio_product: number;
  stock_product: number;
  vendidos_product: number;
};

export default function ResultadosScreen() {
  const theme = useColorScheme();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchProductos();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: theme === 'dark' ? '#1e1e1e' : '#fff',
    backgroundGradientTo: theme === 'dark' ? '#1e1e1e' : '#fff',
    color: (opacity = 1) => theme === 'dark'
      ? `rgba(135,206,250,${opacity})`
      : `rgba(30, 144, 255, ${opacity})`,
    labelColor: (opacity = 1) => theme === 'dark'
      ? `rgba(255,255,255,${opacity})`
      : `rgba(0,0,0,${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.6,
    useShadowColorFromDataset: false,
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: '#D0D0D0',
        dark: '#353636',
      }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Resultados</ThemedText>
      </ThemedView>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {productos.map((producto) => (
          <View key={producto.id_product} style={[
            styles.card,
            { backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f4f4f4' }
          ]}>
            <Text style={[
              styles.title,
              { color: theme === 'dark' ? '#fff' : '#000' }
            ]}>
              {producto.nombre_product}
            </Text>
            <BarChart
              data={{
                labels: ['Stock', 'Vendidos'],
                datasets: [
                  {
                    data: [producto.stock_product, producto.vendidos_product],
                  },
                ],
              }}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              fromZero
              showValuesOnTopOfBars
              style={styles.chart}
            />
          </View>
        ))}
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  chart: {
    borderRadius: 16,
  },
});
