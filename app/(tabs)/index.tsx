import { Image, StyleSheet, View, useColorScheme } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const icon = require('@/assets/images/logo_abarrotes.png');

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const [user, setUser] = useState ('');
  
  useEffect(() => {
    const getNameUser = async () => {
      const {data : { user}, error} = await supabase.auth.getUser();
      if(error){
        console.error('Error al obtener usuario', error.message);
      }
      else if (user){
        setUser(user.user_metadata?.nombre || user.email);
      }
    };
      getNameUser();
  }, []);


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#31D490', dark: '#1E3A5F' }} 
      headerImage={
        <View style={styles.headerContainer}>
          <Image
            source={icon}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bienvenid@ { user } </ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Este es tu panorama de las ventas</ThemedText>
        <ThemedText>
          Descripción breve de la empresa a la que se le brinda el servicio.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Nuestros Servicios</ThemedText>
        <ThemedText>
          Lista de servicios principales que ofrece tu empresa o aplicación.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Cómo contactarnos</ThemedText>
        <ThemedText>
          Información de contacto relevante para tus usuarios.
        </ThemedText>
      </ThemedView>
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
  },
  bottomRightImage: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 100,
    height: 100,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    marginTop: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
});
