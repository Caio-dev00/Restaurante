import React, {useLayoutEffect} from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {Entypo, AntDesign, Feather} from '@expo/vector-icons'

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
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Pressable>
                <View style={styles.playIcon}>
                    <AntDesign name="playcircleo" size={44} color="#FAFAFA"/>
                </View>
                <Image
                    style={styles.image}
                    source={{uri: data.cover}}
                />
            </Pressable>

            <View style={styles.headerDetails}>
                <View>
                    <Text style={styles.title}>{data.name}</Text>
                    <Text style={styles.ingredientesTxt}>Ingredientes ({data.total_ingredients})</Text>
                </View>
                <Pressable>
                    <Feather name="share-2" size={24} color="#121212"/>
                </Pressable>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#f3f9ff',
        paddingTop: 14,
        paddingHorizontal: 14
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 14,
    },

    playIcon: {
        position: 'absolute',
        zIndex: 9,
        top: 0, left: 0, right: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontSize: 18,
        marginTop: 14,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4
    },

    ingredientesTxt: {
        marginBottom: 14,
        fontSize: 16
    },

    headerDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
})