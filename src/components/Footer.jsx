import { Button, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#606',
        paddinghorizontal: 25,
        padding: 20,
    },
    footerButton: {

        
    }
});

export default function Footer({navigation}) {
    return (
        <View style={styles.footer}>
            <Button style={styles.footerButton} title="Sair" onPress={() => navigation.navigate('HomeScreen')}></Button>
        </View>
    );
}