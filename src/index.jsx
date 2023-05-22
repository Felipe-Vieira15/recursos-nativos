import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import Batteryinfo from './screens/Batteryinfo';
import Deviceinfo from './screens/Deviceinfo';

const Stack = createStackNavigator();

export default function RootNavigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown: true}} />
                <Stack.Screen name='Batteryinfo' component={Batteryinfo} options={{headerShown: true}} />
                <Stack.Screen name='Deviceinfo' component={Deviceinfo} options={{headerShown: true}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}