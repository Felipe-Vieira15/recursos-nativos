import { useCallback, usestate } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import * as Contacts from "expo-contacts";
import Header from '../components/Header';
import Footer from '../components/Footer';


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

  export default function Constactsinfo({ navigation }){
    const [contatos, setContatos] = useState([{}]);

    async function carregarContatos() {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
    }

    useEffect(() => {
        useCallback(() => {
            (async () => {
                const { status } = await Contacts.requestPermissionsAsync();
                if (status === 'granted') {
                    carregarContatos();
                }
            })();
        })
    },[]);

    }