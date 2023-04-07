import React, {useLayoutEffect, useState} from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Image, Modal, Share } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {Entypo, AntDesign, Feather} from '@expo/vector-icons'

import { Ingredientes } from "../../components/Ingredientes";
import { Instructions } from "../../components/Instructions";
import { VideoView } from "../../components/Video";

import { isFavorite, saveFavorites, removeItem } from "../../utils/storage";

export default function Detail(){
    const route = useRoute();
    const navigation = useNavigation();
    const data = route.params?.data;

    const [showVideo, setShowVideo] = useState(false);
    const [favorite, setFavorite] = useState(false);

    useLayoutEffect(() => {

        async function getStatusFavorites(){
            const receipeFavorite = await isFavorite(data)
            setFavorite(receipeFavorite)
        }
        getStatusFavorites();

        navigation.setOptions({
            title: data ? data.name : "Detalhes da Receita",
            headerRight: () => (
                <Pressable onPress={() => handleFavoriteReceipe(data)}>

                   {favorite ? (
                     <Entypo
                     name="heart"df
                     size={28}
                     color="#FF4141"
                 /> 
                   ): (
                    <Entypo
                    name="heart-outlined"
                    size={28}
                    color="#FF4141"
                />
                   )}

                </Pressable>
              
            )
        })
    }, [navigation, data, favorite])


    async function handleFavoriteReceipe(receipe){
        if(favorite){
            await removeItem(receipe.id)
            setFavorite(false);
        }else{
            await saveFavorites("@appreceitas", receipe)
            setFavorite(true);
        }
    }

    function handleOpenVideo(){
        setShowVideo(true);
    }

    async function shareReceive(){
        try{
            await Share.share({
                url: "https://sujeitoprogramador",
                message: `Receita: ${data.name}\n Ingredientes: ${data.total_ingredients}\nVi lá no app receita facil`
            })
        }catch(error){
            console.log('error')
        }
    }

    return(
        <ScrollView contentContainerStyle={{paddingBottom: 14}} style={styles.container} showsVerticalScrollIndicator={false}>


            <Pressable onPress={handleOpenVideo}>
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
                <Pressable onPress={shareReceive}>
                    <Feather name="share-2" size={24} color="#121212"/>
                </Pressable>
            </View>


            {data.ingredients.map((item) => (
                <Ingredientes key={item.id} data={item}/>
            ))}

            <View style={styles.instructionsArea}>
                <Text style={styles.instructionsText}>Modo de Preaparo</Text>
                <Feather name="arrow-down" size={24} color="#FFF"/>
            </View>


            {data.instructions.map((item, index) => (
                <Instructions key={item.id} data={item} index={index}/>
            ))}

            <Modal visible={showVideo} animationType="slide">
                <VideoView
                    handleClose={() => setShowVideo(false)}
                    videoUrl={data.video}
                />
            </Modal>

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

    instructionsArea: {
        backgroundColor: '#4cbe6c',
        flexDirection: 'row',
        padding: 8,
        borderRadius: 4,
        marginBottom: 4
    },

    instructionsText: {
        fontSize: 16,
        fontWeight: 500,
        color: '#FFF',
        marginRight: 8
    }
})