import * as React from 'react';

import { Button, View } from 'react-native';

export default function HomeScreen({navigation}){
    return(
        <View>
            <Button title='Nivel da Bateria' onPress={() => navigation.navigate('Batteryinfo')} />
            <Button title='Informações do Dispositivo' onPress={() => navigation.navigate('Deviceinfo')} />
        </View>
    )
}