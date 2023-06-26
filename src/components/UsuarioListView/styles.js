import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerHorizontal: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botao: {
        borderRadius: 250,
        borderColor: '#000000',
        borderWidth: 1,
        backgroundColor: '#45B9B9',
        height: 30,
        width: 30,
        marginRight: 5,
        marginTop: '1%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    gradientBox: {
        height: 30,
        borderRadius: 10,
        width: '77%',
        marginRight: 5,
    },
    nomeContato: {
        height: 30,
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        paddingHorizontal: 5,
        borderRadius: 10,
        backgroundColor: 'transparent',
    }
});

export default styles;