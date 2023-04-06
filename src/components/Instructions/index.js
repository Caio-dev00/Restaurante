import { Text, View, StyleSheet } from "react-native";

export function Instructions({data, index}){
    return(
        <View style={styles.container}>
            <Text style={styles.name}>{index+1} -</Text>
            <Text>{data.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingRight: 8
    }
})