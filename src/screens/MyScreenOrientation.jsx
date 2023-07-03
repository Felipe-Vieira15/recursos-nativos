import { View, Text, StyleSheet, Button } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';

import Header from '../components/Header';
import Footer from '../components/Footer';

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

  function corDirecao() {
    if (ScreenOrientation == 'OrientationLock.PORTRAIT'){
      return 'red'; } else return 'green';
  }

  async function padrao() {
    await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.DEFAULT
    )
  }

  async function down() {
    await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.PORTRAIT_DOWN
    )
  }

  async function right() {
    await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    )
  }

  async function left() {
    await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    )
  }

  async function other() {
    await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.PORTRAIT_DOWN
    )
  }

  return (
    <View style={styles.container}>
      <Header title="Orientação de Tela" />
        <View style={{backgroundColor: corDirecao()}}>
            <Button title="Padrão" onPress={padrao} />
            <Button title="Para Baixo" onPress={down} />
            <Button title="Á Direita" onPress={right} />
            <Button title="Á Esquerda" onPress={left} />
            <Button title="Outros" onPress={other} />
        </View>
        <Footer />
    </View>
  );
}