import { Link, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Alert, Button, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Inputs from '@/components/inputs';
import React from 'react';

export default function Inicio() {
    const router = useRouter();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handlePress = () => {
        Alert.alert('Inicio de sesión exitoso');
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Image
                        source={require('@/assets/images/logo_YAMISA.png')}
                        style={styles.reactLogo}
                    />
                    <Text style={styles.textTitle}>Yamisa</Text>
                    <Text style={styles.textSubTitle}>Bienvenido al mejor gestor de inventarios</Text>
                </View>

                <View style={styles.formContainer}>
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
                </View>

                <View style={styles.linkContainer}>
                    <Button
                        title="Entrar a la App"
                        color="#1D3D47"
                        onPress={() => router.replace("/(tabs)")}
                    />
                    <Text style={styles.registerText}>¿Aún no tienes cuenta con nosotros?</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F6F9',
        padding: '5%', 
    },
    headerContainer: {
        alignItems: 'center',
        marginVertical: '10%',
        flex: 1,
        justifyContent: 'center',
    },
    textTitle: {
        fontFamily: 'SF PRO DISPLAY',
        fontSize: 8 * Math.min(2, 3),
        fontWeight: 'bold',
        color: '#1D3D47',
        textAlign: 'center',
        marginVertical: 10,
    },
    textSubTitle: {
        fontFamily: 'SF PRO DISPLAY',
        fontSize: 16, 
        fontWeight: '600',
        color: '#1D3D47',
        textAlign: 'center',
        marginBottom: 20,
    },
    formContainer: {
        marginBottom: 30,
    },
    linkContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    reactLogo: {
        width: '70%',
        height: undefined,
        aspectRatio: 1.7, 
        resizeMode: 'contain',
        marginBottom: 20,
    },
    registerText: {
        marginTop: 10,
        color: '#1D3D47',
        textAlign: 'center',
        fontWeight: '600',
    },
});
