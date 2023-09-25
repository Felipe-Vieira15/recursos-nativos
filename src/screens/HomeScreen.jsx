import * as React from 'react';

import { Button, View } from 'react-native';

export default function HomeScreen({navigation}){
    return(
        <View>
            <Button title='Nivel da Bateria' onPress={() => navigation.navigate('Batteryinfo')} />
            <Button title='Informações do Dispositivo' onPress={() => navigation.navigate('Deviceinfo')} />
            <Button title='Orientação de Tela' onPress={() => navigation.navigate('MyScreenOrientation')} />
            <Button title='Notificações' onPress={() => navigation.navigate('Notify')} />
            <Button title='Sensores' onPress={() => navigation.navigate('Sensors')} />
            <Button title='Captura de Tela' onPress={() => navigation.navigate('Screen')} />
            <Button title='Autenticação' onPress={() => navigation.navigate('LocalAuthentication')} />
            <Button title='Informações da Câmera' onPress={() => navigation.navigate('Camerainfo')} />
        </View>
    )
}