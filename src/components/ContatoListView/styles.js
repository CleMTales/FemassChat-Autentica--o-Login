import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerHorizontal: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botao: {
        borderRadius: 250,
        borderColor: '#black',
        backgroundColor: '#45B9B9',
        height: 50,
        width: 50,
        marginRight: 5,
        marginTop: '1%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    gradientBox: {
        height: 45,
        borderRadius: 30,
        width: '65%',
        marginRight: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: '2%'
    },
    nomeUsuario: {
        height: 30,
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 5,
        borderRadius: 10,
        backgroundColor: 'transparent',
        textAlignVertical: 'bottom'
    },
    userImage: {
        borderRadius: 55,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#45B9B9',
        height: 50,
        width: 50,
        alignContent: 'center',
        justifyContent: 'center'
    },
});

export default styles;