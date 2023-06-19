import { View, Text, Button } from 'react-native';
import * as Battery from 'expo-battery';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

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
        <Text style={{backgroundColor: CorBateria()}}>
        {nivelBateria}%
        </Text>
            <Button 
            title="Atualizar"
            onPress={atualizarTudo}>
            </Button>
            <Footer />
    </View>
  );
}