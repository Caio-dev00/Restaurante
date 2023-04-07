import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity,FlatList } from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {Text as MotiText} from 'moti';

import Logo from "../../components/Logo";
import Foods from "../../components/Foods";
import api from '../../services/api'

import { useNavigation } from "@react-navigation/native";

export default function Home(){
    const [inputValue, setInputValue] = useState('');
    const [receitas, setReceitas] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {

        async function fetchApi(){
            const response = await api.get("/foods")
            setReceitas(response.data);
        }

        fetchApi();

    }, [])


    function handleSearch(){
        if(!inputValue) return;

        let input = inputValue;
        navigation.navigate('Search', {name: input});
        setInputValue('');
    }

    return(
        <SafeAreaView style={styles.container}>
            <Logo/>
            <MotiText 
            from={{
                opacity: 0,
                translateY: 15,
            }}
            animate={{
                opacity: 1,
                translateY: 0
            }}
            transition={{
                delay: 100,
                type: "timing",
                duration: 650
            }}
            style={styles.title}>Encontre a receita</MotiText>
            <MotiText
              from={{
                opacity: 0,
                translateY: 15,
            }}
            animate={{
                opacity: 1,
                translateY: 0
            }}
            transition={{
                delay: 200,
                type: "timing",
                duration: 850
            }}
            style={styles.title}>que combina com você</MotiText>


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