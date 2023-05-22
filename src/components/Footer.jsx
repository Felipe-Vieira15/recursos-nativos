import { Button, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#ffa500',
        paddinghorizontal: 25,
        padding: 20,
    },
    footerButton: {

        
    }
});

export default function Footer() {
    return (
        <View style={styles.footer}>
            <Button style={styles.footerButton} title="Sair"></Button>
        </View>
    );
}