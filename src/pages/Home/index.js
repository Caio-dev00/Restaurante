import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity,FlatList } from "react-native";
import {Ionicons} from '@expo/vector-icons';

import Logo from "../../components/Logo";
import Foods from "../../components/Foods";
import api from '../../services/api'

export default function Home(){
    const [inputValue, setInputValue] = useState('');
    const [receitas, setReceitas] = useState([]);

    useEffect(() => {

        async function fetchApi(){
            const response = await api.get("/foods")
            setReceitas(response.data);
        }

        fetchApi();

    }, [])


    function handleSearch(){
        alert('Você clicou nesse botão')
    }

    return(
        <SafeAreaView style={styles.container}>
            <Logo/>
            <Text style={styles.title}>Encontre a receita</Text>
            <Text style={styles.title}>que combina com você</Text>


            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome da comida"
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Ionicons name="search" size={28} color="#4cbe6c"/>
                </TouchableOpacity>
            </View>

            <FlatList
                data={receitas}
                keyExtractor={ (item) => String(item.id)}
                showsVerticalScrollIndicator={false}
                renderItem={( {item} ) => (<Foods data={item}/>)}
            />
           
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#F3F9FF',
        paddingTop: 36,
        paddingStart: 14,
        paddingEnd: 14
    },

    title:{
        fontSize: 28,
        fontWeight: 'bold',
    },

    form:{
        width: '100%',
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    input:{
        fontSize: 16,
    }
})