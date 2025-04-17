import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
          },
          default: {},
        }),
      }}>


      <Tabs.Screen
        name="contac"
        options={{
          title: 'Contactos',
          tabBarIcon: ({ color }) => <IconSymbol size={40} name="person.text.rectangle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="items"
        options={{
          title: 'Articulos',
          tabBarIcon: ({ color }) => <IconSymbol size={30} name="doc.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <IconSymbol size={30} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="resultados"
        options={{
          title: 'Resultados',
          tabBarIcon: ({ color }) => <IconSymbol size={30} name="chart.bar.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Ventas',
          tabBarIcon: ({ color }) => <IconSymbol size={30} name="dollarsign.circle" color={color} />,
        }}
      />
    </Tabs>
  );
}
