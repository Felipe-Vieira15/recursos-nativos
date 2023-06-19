import { View, Text, StyleSheet } from "react-native";
import * as Device from 'expo-device';

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
  

export default function DeviceInfo() {
  return (
    <View style={styles.container}>
        <Header title="Informações do Dispositivo" />
      <Text style={styles.contentTextStyle}>
        O nome do seu aparelho é: {Device.deviceName}
      </Text>
      <Text style={styles.contentTextStyle}>
        A marca do seu aparelho é: {Device.brand}
      </Text>
      <Text style={styles.contentTextStyle}>
        O modelo do aparelho é: {Device.modelName}
      </Text>
      <Text style={styles.contentTextStyle}>
        O nome completo do aparelho é: {Device.productName}
      </Text>
      <Text style={styles.contentTextStyle}>
        O design do aparelho é: {Device.designName}
      </Text>
      <Text style={styles.contentTextStyle}>
        O ano do lançamento é: {Device.deviceYearClass}
      </Text>
      <Text style={styles.contentTextStyle}>
        A memória do aparelho é: {Device.totalMemory}
      </Text>
      <Text style={styles.contentTextStyle}>
        A versão do sistema é a: {Device.osVersion}
      </Text>
      <Text style={styles.contentTextStyle}>
        A arquitetura do aparelho é: {Device.supportedCpuArchitectures}
      </Text>
      <Footer />
    </View>
  );
}