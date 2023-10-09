import React, { useEffect, useState } from 'react';
import { View, Button, Alert, Text, StyleSheet } from 'react-native';

import * as LocalAuthentication from 'expo-local-authentication';
import * as ScreenCapture from 'expo-screen-capture';
import * as MediaLibrary from 'expo-media-library';

import Footer from '../components/Footer';
import Header from '../components/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  content: {
    flex: 1,
    gap: 20,
    padding: 20,
    alignSelf: 'center',
},
  contentTextStyle: {
    padding: 5,
    textAlignVertical: "center",
    minHeight: 50,
    backgroundColor: "#969",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  footer: {
    backgroundColor: "#888",
    paddingHorizontal: 25,
    padding: 20,
  },
});

const LocalAuthenticationScreen = () => {
    const [isTimerEnabled, setIsTimerEnabled] = useState(false);

    const [timeRemaining, setTimeRemaining] = useState(15);

    const authenticateWithBiometrics = async () => {
        try {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            if (!hasHardware) {
                Alert.alert('Error:', 'Autenticação não suportada');
                return;
            }

            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            if (!isEnrolled) {
                Alert.alert('Error:', 'Nenhuma biometria cadastrada');
                return;
            }

            const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
            if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
                const { success, error } = await LocalAuthentication.authenticateAsync({
                    promptMessage: 'Use Autenticação Biométrica para autenticar',
                    authenticationType: LocalAuthentication.AuthenticationType.FINGERPRINT,
                });

                if (success && !isTimerEnabled) {
                    Alert.alert('Success', 'Autenticação realizada com sucesso');
                } else if (error === 'user_cancel') {
                    Alert.alert('Error:', 'Autenticação cancelada pelo usuário');
                }else if(error === 'lockout') {
                    Alert.alert('Error:', 'Autenticação bloqueada');
                }else if(error === 'lockout_permanent') {
                    Alert.alert('Error:', 'Autenticação bloqueada permanentemente');
                }else if(error === 'too_many_attempts') {
                    Alert.alert('Error:', 'Muitas tentativas de autenticação');
                }else {
                    Alert.alert('Error:', 'Autenicação falhou');
                }
                
                setIsTimerEnabled(true);
            }else if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
                const { success, error } = await LocalAuthentication.authenticateAsync({
                    promptMessage: 'Use Face ID para autenticar',
                    authenticationType: LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
                });

                if (success && !isTimerEnabled) {
                    Alert.alert('Success', 'Autenticação realizada com sucesso');
                } else if (error === 'user_cancel') {
                    Alert.alert('Error:', 'Autenticação cancelada pelo usuário');
                }else if(error === 'lockout') {
                    Alert.alert('Error:', 'Autenticação bloqueada');
                }else if(error === 'lockout_permanent') {
                    Alert.alert('Error:', 'Autenticação bloqueada permanentemente');
                }else if(error === 'too_many_attempts') {
                    Alert.alert('Error:', 'Muitas tentativas de autenticação');
                }else {
                    Alert.alert('Error:', 'Autenicação falhou');
                }

                setIsTimerEnabled(true);
            }else {
                Alert.alert('Error:', 'Nenhum método de autenticação disponível neste dispositivo.');
            }
        } catch (error) {
            console.log(error);
        }
    };

    
    const inativeButton = (bol) => {
        if (bol) {
            const interval = setInterval(() => {
                setTimeRemaining(timer => {
                    if (timer > 0) {
                        return timer - 1;
                    }
                    clearInterval(interval);
                    setIsTimerEnabled(false);
                    
                    return (timer == 0 ? timeRemaining : timer);
                });
            }, 1000);
    
            return () => clearInterval(interval);
        }
    };
    
    const hasPermissions = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        return status === 'granted';
    }

    useEffect(() => {
        inativeButton(isTimerEnabled)

        if (hasPermissions()) {
            return async () => {
                await ScreenCapture.preventScreenCaptureAsync();
            };
        }
        
    }, [isTimerEnabled]);

    return (
        <View style={styles.container}>
            <Header title='Autenticador' />
            <View style={styles.center}>
                <Button disabled={isTimerEnabled} title='Autenticar' onPress={authenticateWithBiometrics} />
                {isTimerEnabled && <Text>Tempo restante: {(timeRemaining <= 9 ? `0${timeRemaining}` : timeRemaining)} segundos</Text>}
            </View>
            <Footer text='Sair' />
        </View>
    );
}

export default LocalAuthenticationScreen;