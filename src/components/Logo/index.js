import { View, Text, StyleSheet } from "react-native";

export default function Logo(){
    return(
        <View style={styles.logoArea}>
            <Text style={styles.logo}>Receita Fácil</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logoArea:{
        backgroundColor: '#4cbe6c',
        alignSelf: "flex-start",
        padding: 8,
        paddingLeft: 16,
        paddingRight: 20,
        borderTopRightRadius: 3,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 40,
        marginBottom: 8,
    },

    logo:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF'
    }
})