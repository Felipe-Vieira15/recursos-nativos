import { TouchableOpacity, View, Text } from "react-native";

import Header from "../components/Header";

import Footer from "../components/Footer";

import * as LocalAuthentication from "expo-local-authentication";

export default function MyLocalAuthentication({ navigation }) {
  const autenticar = async () => {
    try {
      const disponivel = await LocalAuthentication.hasHardwareAsync();
      
      if (!disponivel) {
        alert("Você não tem autenticação biométrica disponível");

        return;
      }

      const { success, error } = await LocalAuthentication.authenticateAsync();

      if (success) {
        alert("ok");
      } else {
        alert("negado");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Header title="Autentication" />

      <View>
        <TouchableOpacity onPress={autenticar}>
          <Text>Autenticar</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
}
