import { StyleSheet, useColorScheme, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const dynamicCardStyle = {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#f2f2f2',
    shadowColor: isDarkMode ? '#000' : '#aaa',
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Reporte de ventas</ThemedText>
      </ThemedView>

      <ThemedText style={styles.subtitle}>
        Se muestran las ganancias y/o pérdidas en cuestión cantidades (dinero).
      </ThemedText>

      <View style={styles.cardContainer}>
        <ThemedView style={[styles.card, dynamicCardStyle]}>
          <ThemedText style={styles.cardTitle}>Ventas Totales</ThemedText>
          <ThemedText style={styles.cardValue}>$25,000</ThemedText>
        </ThemedView>

        <ThemedView style={[styles.card, dynamicCardStyle]}>
          <ThemedText style={styles.cardTitle}>Ganancias</ThemedText>
          <ThemedText style={[styles.cardValue, { color: isDarkMode ? '#81c784' : '#2e7d32' }]}>
            $8,500
          </ThemedText>
        </ThemedView>

        <ThemedView style={[styles.card, dynamicCardStyle]}>
          <ThemedText style={styles.cardTitle}>Pérdidas</ThemedText>
          <ThemedText style={[styles.cardValue, { color: isDarkMode ? '#ef9a9a' : '#c62828' }]}>
            $1,200
          </ThemedText>
        </ThemedView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  subtitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '600',
  },
});
