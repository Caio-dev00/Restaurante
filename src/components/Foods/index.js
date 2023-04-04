import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function Foods({data}){

    const navigation = useNavigation();

    return(
        <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={() => navigation.navigate('Detail', { data: data })}>
            <Image
                style={styles.cover}
                source={{uri: data.cover}}
            />
            <View style={styles.info}>
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.description}>{data.total_ingredients} ingredientes | {data.time} min</Text>
            </View>
            <LinearGradient
                style={styles.gradient}
                colors={['transparent', 'rgba(0,0,0, 0.70)', 'rgba(0,0,0,0.95)']}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 14,
    },

    cover:{
        width: '100%',
        height: 200,
        borderRadius: 14
    },

    info:{
        position: 'absolute',
        padding: 8,
        bottom: 2,
        zIndex: 99
    },

    name:{
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },

    description:{
        color: '#FFF'
    },

    gradient:{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '55%',
        borderRadius: 14,
        zIndex: 1,
        backgroundColor: 'transparent'
    }
})