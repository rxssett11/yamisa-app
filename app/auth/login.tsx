import { Link, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Alert, Button, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Inputs from '@/components/inputs';
import React from 'react';

export default function Index() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();
  const icon = require('../../assets/images/logo_YAMISA.png');


  const handlePress = () => {
    Alert.alert('Inicio de sesión exitoso');
    router.push('/(tabs)');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Image source={icon} style={{width: 100, height: 100}}
        />
        <Text style={styles.textTitle}>Yamisa</Text>
        <Text style={styles.textSubTitle}>Bienvenido al mejor gestor de inventarios</Text>

        <Inputs
          label="Correo"
          placeholder="Introduce tu correo"
          value={email}
          onChangeText={setEmail}
        />
        <Inputs
          label="Contraseña"
          placeholder="Introduce tu contraseña"
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.linkContainer}>

          <Button title='Iniciar sesión' onPress={handlePress}></Button>xx
          <Text>¿Aún no tienes cuenta con nosotros?</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  textTitle: {
    fontFamily: 'SF PRO DISPLAY',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  textSubTitle: {
    fontFamily: 'SF PRO DISPLAY',
    fontSize: 20,
    fontWeight: 'semibold',
    textAlign: 'center',
    padding: 20,
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
