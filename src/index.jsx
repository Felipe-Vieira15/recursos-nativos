import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import Batteryinfo from './screens/Batteryinfo';
import Deviceinfo from './screens/Deviceinfo';
import MyScreenOrientation from './screens/MyScreenOrientation';
import Notify from './screens/Notify';
import Sensors from './screens/Sensors';
import Screen from './screens/Screen';
import LocalAuthentication from './screens/LocalAuthentication';
import Camerainfo from './screens/Camerainfo';
import Localization from './screens/Localization';

const Stack = createStackNavigator();

export default function RootNavigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown: true}} />
                <Stack.Screen name='Batteryinfo' component={Batteryinfo} options={{headerShown: true}} />
                <Stack.Screen name='Deviceinfo' component={Deviceinfo} options={{headerShown: true}} />
                <Stack.Screen name='MyScreenOrientation' component={MyScreenOrientation} options={{headerShown: true}} />
                <Stack.Screen name='Notify' component={Notify} options={{headerShown: true}} />
                <Stack.Screen name='Sensors' component={Sensors} options={{headerShown: true}} />
                <Stack.Screen name='Screen' component={Screen} options={{headerShown: true}} />
                <Stack.Screen name='LocalAuthentication' component={LocalAuthentication} options={{headerShown: true}} />
                <Stack.Screen name='Camerainfo' component={Camerainfo} options={{headerShown: true}} />
                <Stack.Screen name='Localization' component={Localization} options={{headerShown: true}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}