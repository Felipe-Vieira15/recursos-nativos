import { View, Text, StyleSheet, Button } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";

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

export default function ScreenOrientations() {

  const [cor, setCor] = useState();

  function corDirecao() {
    if (ScreenOrientation == 'OrientationLock.DEFAULT'){
      setCor = 'red';
    } else if (ScreenOrientation == 'OrientationLock.PORTRAIT_DOWN'){
      setCor = 'red';
      } else if (ScreenOrientation == 'OrientationLock.LANDSCAPE_RIGHT'){
        setCor = 'green'; 
      } else {
         'green'
      }
    }

    useEffect(()=> {
      corDirecao()
    }, [cor])

  async function padrao() {
    await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.DEFAULT
    );
    setCor = 'red';
  }

  async function down() {
    await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.PORTRAIT_DOWN
    );
    setCor = 'red';
  }

  async function right() {
    await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
    setCor = 'green';
  }

  async function left() {
    await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
    setCor = 'green';
  }

  async function other() {
    await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.PORTRAIT_DOWN
    );
    setCor = 'red';
  }

  return (
    <View style={styles.container}>
      <Header title="Orientação de Tela" />
        <ScrollView style={{backgroundColor: corDirecao()}}>
            <View style={styles.content}>
            <Button title="Padrão" onPress={padrao} />
            <Button title="Para Baixo" onPress={down} />
            <Button title="Á Direita" onPress={right} />
            <Button title="Á Esquerda" onPress={left} />
            <Button title="Outros" onPress={other} />
            </View>
        </ScrollView>
        <Footer />
    </View>
  );
}