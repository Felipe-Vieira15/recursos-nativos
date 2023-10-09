import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Gyroscope, Magnetometer, Accelerometer, Barometer} from "expo-sensors";
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        gap: 10
    },
    content: {
        flex: 1,
        gap: 20,
        padding: 20,
        alignSelf: 'center',
    },
    contentTextStyle: {
        padding: 5,
        textAlignVertical: 'center',
        minHeight: 50,
        backgroundColor: '#969',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    footer: {
        backgroundColor: '#888',
        paddingHorizontal: 25,
        padding: 20,
    }
  });
    
  
  export default function Sensors({ navigation }) {
    const [ giroscopio, setGiroscopio] = useState({})
    const [ magneto, setMagneto] = useState({})
    const [ accelerometer, setAccelerometer] = useState({})
    const [ barometer, setBarometer] = useState({})
    const [ cor, setCor ] = useState("#fff");
    const [ infoD, setInfoD ] = useState("");

    useEffect(() => {
        Gyroscope.addListener(giroscopioListener);
        Magnetometer.addListener(magnetoListener);
        Accelerometer.addListener(accelerometerListener);
        Barometer.addListener(barometerListener);
    }, [])

    const giroscopioListener = (data) => {
        setGiroscopio(data)
    }
    const magnetoListener = (data) => {
        setMagneto(data)
    }
    const accelerometerListener = (data) => {
        setAccelerometer(data)
    }
    const barometerListener = (data) => {
        setBarometer(data)
    }

    useEffect(() => {
        if (magneto.x <= (-5)) {
          setCor("#adfcff");
          setInfoD("Horizontal");
        }else if (magneto.x >= (5)) {
          setCor("#fff4ad");
          setInfoD("Horizontal");
        }else if (magneto.y <= (-5.875)) {
          setCor("#d3adff");
          setInfoD("Vertical");
        }else if (magneto.y >= (5.875)) {
          setCor("#ffadb4");
          setInfoD("Vertical");
        }else if (giroscopio.z >= (-36)) {
          setCor("#adffad");
          setInfoD("Inclinado");
        }
        else{
          setCor("#fff");
          setInfoD("Normal");
        }
      }, [giroscopio, magneto]);

    return (
      <View style={styles.container}>
        <Header title="Sensores" />
        <View style={[styles.content, {backgroundColor: cor}]}>
            <Text styles={styles.Sensors}>
                Giroscopio: {'\n'}
                x: {giroscopio.x} {'\n'}
                y: {giroscopio.y} {'\n'}
                z: {giroscopio.z} {'\n'}
            </Text>
            <Text styles={styles.Sensors}>
                Magneto: {'\n'}
                x: {magneto.x} {'\n'}
                y: {magneto.y} {'\n'}
                z: {magneto.z} {'\n'}
            </Text>
            <Text styles={styles.Sensors}>
                Acelerometro: {'\n'}
                x: {accelerometer.x} {'\n'}
                y: {accelerometer.y} {'\n'}
                z: {accelerometer.z} {'\n'}
            </Text>
            <Text styles={styles.Sensors}>
                Barometro: {'\n'}
                Pressão: {barometer.pressure} {'\n'}
            </Text>
            <Text>
                Orientação de tela: {infoD}
            </Text>
        </View>
        <Footer 
            onPress={() => navigation.goBack()}
        />
      </View>
    );
  }