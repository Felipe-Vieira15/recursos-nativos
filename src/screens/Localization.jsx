import React, { useEffect, useState } from 'react';
import { View, Button, Alert, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';

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

const Localization = () => {

    const [ getLocation, setLocation ] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted') {
                Alert.alert('Permissão de acesso à localização negada!');
                console.log('Permissão de acesso à localização negada!');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
            console.log(location.coords);
        })();
    }, []);

    return (
        <View>
            <Header title='Localização' />
            <View>
                {!getLocation
                ?
                    <Text>Carregando...</Text>
                :
                    <>
                        <Text>Latitude: {getLocation.latitude ?? '0'}</Text>
                        <Text>Longitude: {getLocation.longitude ?? '0'}</Text>
                        <View style={{ flex: 1, width: 300 }}>
                        <MapView
                            style={{ flex: 1 }}
                            initialRegion={{
                                latitude: getLocation.latitude,
                                longitude: getLocation.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker
                                coordinate={{ latitude: getLocation.latitude, longitude: getLocation.longitude }}
                                title="Localização do dispositivo"
                                description="Esta é a atual localização do dispositivo."
                            />
                        </MapView>
                        </View>
                    </>
                }

            </View>
            <Footer text='Sair' />
        </View>
    );
}

export default Localization;