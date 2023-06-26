import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    containerHorizontal: {
        flexDirection: 'row',
        width: '100%',
    },

    viewCentralizada: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },

    janelaModal: {
        backgroundColor: '#A3D8EE',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 25,
        width: '80%',
        alignSelf: 'center',
    },
    loginText: {
        height: 30,
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
    },
    botaoConfirmarModal: {
        height: '100%',
        width: '25%',
        backgroundColor: '#45B9B9',
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 2,
        alignItems: 'center',
    },
    botaoCancelarModal:{
        height:'100%',
        width: '25%',
        backgroundColor:'#CC6666',
        borderColor: 'black',
        borderRadius: 15,
        borderWidth:2,
        alignItems:'center',
    },
});

export default styles;