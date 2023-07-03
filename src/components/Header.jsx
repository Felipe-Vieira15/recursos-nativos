import { useEffect, useState } from "react";
import * as Battery from "expo-battery";
import { View, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
    header: {
        paddingTop: 30,
        backgroundColor: "#606",
        paddingBottom: 5,
        paddingHorizontal: 5,
    },
    headerTextStyle: {
        marginTop: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center'
    }
});

export default function Header({title}) {
    
    const [nivelBateria, setNivelBateria] = useState();
  
    async function bateria() {
      const nivel = await Battery.getBatteryLevelAsync();
      setNivelBateria(Math.round(nivel * 100));
    }
  
    useEffect(()=> {
      bateria()
      CorBateria()
    }, [nivelBateria])

    function CorBateria(){
        if (nivelBateria < 5) {
            return 'black';
        } else if (nivelBateria < 30) {
            return 'red';
        } else if (nivelBateria < 60) {
            return 'orange';
        } else {
            return '#606';
        }
    }

    return (
        <View style={{backgroundColor: CorBateria()}}>
            <Text style={styles.headerTextStyle}>
                {title}
            </Text>
        </View>
    );
}