import * as Notifications from "expo-notifications";
import { View, Text, StyleSheet, Button } from "react-native";
import { useState, useEffect } from "react";
import * as Device from "expo-device";
import * as Battery from "expo-battery";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default Notify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  content: {},
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

function Notify({ navigation }) {
  const [nivelBateria, setNivelBateria] = useState();

  async function bateria() {
    const nivel = await Battery.getBatteryLevelAsync();
    setNivelBateria(Math.round(nivel * 100));
  }

  useEffect(()=> {
    bateria()
  }, [nivelBateria])


  const [expoToken, setExpoToken] = useState("");

  async function notificarExpo() {
    const token = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notificação",
        subtitle: "Teste",
        body: "Teste de Notificação",
      },
      trigger: {
        seconds: 3,
      },
    });
    setExpoToken(token);
  }

  async function deviceNotification() {
    const token = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notificação",
        subtitle: "Teste",
        body: "Seu aparelho " + Device.deviceName + ", é excelente",
      },
      trigger: {
        seconds: 3,
      },
    });
    setExpoToken(token);
  }

  async function alertNotification() {
    const token = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notificação",
        subtitle: "Teste",
        body: alert("Teste de Notificação"),
      },
      trigger: {
        seconds: 3,
      },
    });
    setExpoToken(token);
  }

  async function homeNotification() {
    const token = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notificação",
        subtitle: "Teste",
        body: "Volte para a Home"+ navigation.navigate("HomeScreen"),
      },
      trigger: {
        seconds: 3,
      },
    });
    setExpoToken(token);
  }

  async function batteryNotification() {
    const token = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notificação",
        subtitle: "Teste",
        body: "O nivel de bateria é "+nivelBateria+"%",
      },
      trigger: {
        seconds: 3,
      },
    });
    setExpoToken(token);
  }

  const ultimaNotificacao = Notifications.useLastNotificationResponse();
  async function exibirNotificacao() {
    alert(ultimaNotificacao.notification.request.content.body);
  }

  useEffect(() => {
    exibirNotificacao();
  }, [ultimaNotificacao]);

  return (
    <View>
      <View>
        <Header title="Notificações" />
      </View>
      <View style={styles.content}>
        <Text>Expo Token: {expoToken}</Text>
        <Button
          title="Enviar Notificação"
          onPress={async () => notificarExpo()}
        />
        <Button
          title="Ultima  Notificação"
          onPress={async () => exibirNotificacao()}
        />
        <Button
          title="Dispositivo"
          onPress={async () => deviceNotification()}
        />
        <Button
          title="Notificação Alerta"
          onPress={async () => alertNotification()}
        />
        <Button
          title="Home"
          onPress={async () => homeNotification()}
        />
        <Button
          title="Nivel de Bateria"
          onPress={async () => batteryNotification()}
        />
      </View>
      <Footer />
    </View>
  );
}
