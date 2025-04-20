import { Link, useRouter } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    Button,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Inputs from '@/components/inputs';
import React from 'react';
import { supabase } from '@/lib/supabase';
import { useWindowDimensions } from 'react-native';

export default function Inicio() {
    //cambio de pantallas
    const router = useRouter();

    //Estado de los inputs
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    //Dimenciones de pantalla
    const { width } = useWindowDimensions();
    const isWeb = width>768;

    //fiunción para inicio de sesión
    const InicioSesion = async () => {
        if (!email || !password) {
            Alert.alert('ERROR', 'Ingresa tu correo y contraseña');
            return;
        }
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            Alert.alert('Error al iniciar sesión', error.message);
        } else {
            router.replace('/(tabs)');
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, isWeb && styles.webContainer]}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                        <View style={styles.headerContainer}>
                            <Image
                                source={require('@/assets/images/logo_YAMISA.png')}
                                style={styles.reactLogo}
                            />
                            <Text style={styles.textTitle}>Yamisa</Text>
                            <Text style={styles.textSubTitle}>
                                Bienvenido al mejor gestor de inventarios
                            </Text>
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
                                secureTextEntry
                            />
                        </View>

                        <View style={styles.linkContainer}>
                            <Button title="Entrar a la App" color="#1D3D47" onPress={InicioSesion} />
                            <Text style={styles.registerText}>¿Aún no tienes cuenta con nosotros?</Text>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
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
        fontSize: 24,
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
    webContainer: {
        maxWidth: 480,
        alignSelf: 'center',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4, // para Android
        marginTop: 40,
        marginBottom: 40,
      },          
});
