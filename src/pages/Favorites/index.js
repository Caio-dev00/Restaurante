import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { getFavorites } from "../../utils/storage";
import { useIsFocused } from "@react-navigation/native";

import Foods from '../../components/Foods';

export default function Favorites(){
    const [receipes, setReceipes] = useState([]);
    const isFacused = useIsFocused();

    useEffect(() => {

        let isActive = true;

        async function getReceipes(){
            const result = await getFavorites("@appreceitas");
            if(isActive){
                setReceipes(result);
            }
        }
        if(isActive){
            getReceipes(); 
        }

        return () => {}

     

    }, [isFacused])

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Receitas Favoritas</Text>

            {receipes.length === 0 && (
            <Text>Você ainda não tem nehuma receita salva</Text>
        )}

        <FlatList
            showsVerticalScrollIndicator={false}
            style={{marginTop: 24}}
            data={receipes}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => <Foods data={item}/>}
        />

        </SafeAreaView>

   
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F3F9FF',
        paddingHorizontal: 14,
        paddingTop: 36
    },
    title:{
        color: '#000',
        fontWeight: 'bold',
        fontSize: 24
    }
})