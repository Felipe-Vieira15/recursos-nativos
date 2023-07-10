import { View, Text, Button, ScrollView } from 'react-native';
import * as Battery from 'expo-battery';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

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

export default function BatteryInfo() {

    const [nivelBateria, setNivelBateria] = useState();
  
    async function atualizarTudo() {
      bateria();
    }
  
    async function bateria() {
      const nivel = await Battery.getBatteryLevelAsync();
      setNivelBateria(Math.round(nivel * 100));
    }
  
    useEffect(()=> {
      bateria()
      CorBateria()
    }, [nivelBateria])

    function CorBateria(){
        if (nivelBateria < 20) {
            return 'red';
        } else if (nivelBateria < 50) {
            return 'orange';
        } else if (nivelBateria < 80) {
            return 'yellow';
        } else {
            return 'green';
        }
    }

  return (
    <View>
        <Header title="Nivel de Bateria" />
        <ScrollView style={{backgroundColor: CorBateria()}}>
            <Text style={styles.content}>
              {nivelBateria}%
            </Text>

          <View style={styles.content}>
            <Button 
            title="Atualizar"
            onPress={atualizarTudo}>
            </Button>
          </View>
        </ScrollView>
            <Footer />
    </View>
  );
}