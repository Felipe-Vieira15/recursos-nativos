import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';

import * as Contacts from 'expo-contacts';
// import { useFocusEffect } from '@react-navigation/native';

import Header from '../components/Header';
import Footer from '../components/Footer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  content: {
    flex: 1,
    gap: 20,
    padding: 20,
    alignSelf: 'center',
},
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

const ContactsInfo = () => {
    const [contacts, setContacts] = useState();
    const [filteredContacts, setFilteredContacts] = useState([]);

    const filterContacts = (searchText) => {
        const filtered = contacts.filter((contact) => {
            const name = `${contact.firstName}`.toLowerCase();
            const phone = `${contact.phoneNumbers[0].number}`.toLowerCase();
            
            return name.includes(searchText.toLowerCase()) || phone.includes(searchText.toLowerCase());
        });
        
        setFilteredContacts(filtered);
    };

    useEffect(() => {
        const loadContacts = async () => {
            const { status } = await Contacts.requestPermissionsAsync();

            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.FirstName, Contacts.Fields.PhoneNumbers],
                });

                if (data.length > 0) {
                    setContacts(data);
                    setFilteredContacts(data);
                }
            }
        };

        loadContacts();
    }, []);

    return(
        <View style={styles.container}>
            <Header title='Contato' />
            <View style={styles.center}>
            <TextInput placeholder='Search' onChangeText={filterContacts} style={{ paddingHorizontal: 5, paddingVertical: 2, borderBottomWidth: 1, borderBottomColor: '#000' }} />
                {contacts ?
                    <FlatList
                        data={filteredContacts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Items 
                                item = {item}
                            />
                        )}
                    />
                :
                    <>
                        <Text style={styles.content}>Não foi possivel carregar os itens.</Text>
                    </>
                }
            </View>
            <Footer text='Sair' />
        </View>
    )
}

export default ContactsInfo;