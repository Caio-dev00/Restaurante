import React, {useLayoutEffect} from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {Entypo} from '@expo/vector-icons'

export default function Detail(){
    const route = useRoute();
    const navigation = useNavigation();
    const data = route.params?.data;

    useLayoutEffect(() => {

        navigation.setOptions({
            title: data ? data.name : "Detalhes da Receita",
            headerRight: () => (
                <Pressable onPress={() => alert('CLICOU')}>
                    <Entypo
                        name="heart"
                        size={28}
                        color="#FF4141"
                    />
                </Pressable>
              
            )
        })
    }, [navigation, data])

    return(
        <View>
            <Text>{data.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    constainer:{
        backgroundColor: '#14e245',
    }
})