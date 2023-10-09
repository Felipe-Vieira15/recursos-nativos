import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import * as MediaLib from 'expo-media-library';

import { Camera } from 'expo-camera';

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

const CameraInfo = () => {
    const [ hasPermission, setHasPermission ] = useState(null);
    const [ cameraRef, setCameraRef ] = useState(null);
    const [ type, setType ] = useState(Camera.Constants.Type.back);
    
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleCameraType = () => {
        setType(type == Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
    }

    const takePicture  = async () => {
        if(cameraRef) {
            const { uri } = await cameraRef.takePictureAsync();
            await MediaLib.requestPermissionsAsync()
            await MediaLib.createAssetAsync(uri)
        }
    }

    if (hasPermission === null) {
        return (<View />);
    }

    if (hasPermission === false) {
        return (<Text>Sem acesso a câmera</Text>);
    }

    return (
        <View style={styles.container}>
            <Header title='Camera' />
            <View style={styles.center}>
                <Camera
                    ratio='16:9'
                    style={{
                        width: 350,
                        height: 350,
                    }}
                    ref={ref => setCameraRef(ref)}
                    type={type}
                    zoom={0}
                />
                <Button title='Trocar Câmera' onPress={() => handleCameraType()} />
                <Button title='Tirar Foto' onPress={() => takePicture()} />
            </View>
            <Footer text='Sair' />
        </View>
    );
}

export default CameraInfo;