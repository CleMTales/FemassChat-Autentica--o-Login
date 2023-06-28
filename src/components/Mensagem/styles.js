import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerHorizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: '3%'
    },
    containerVertical: {
        height: '100%',
    },
    mensagemContainer: {
        height: 45,
        borderRadius: 30,
        marginRight: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: '2%',
        marginBottom: 10,
        backgroundColor: '#45B9B9',
    },
    textoMensagem: {
        height: 30,
        fontSize: 20,
        paddingHorizontal: 5,
        borderRadius: 10,
        marginBottom: '2%',
        textAlignVertical: 'center'
    },
    horaMsg: {
        height: 15,
        width: '100%',
        fontSize: 8,
        bottom: 0,
        right: 0,
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