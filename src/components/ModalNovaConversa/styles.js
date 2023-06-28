import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    containerVertical: {
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
        width: '90%',
        height: '85%',
        alignSelf: 'center',
    },
    messageText: {
        height: 60,
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    botaoCancelarModal:{
        aspectRatio: 1,
        width: '15%',
        backgroundColor:'#CC6666',
        borderColor: 'black',
        borderRadius: 15,
        borderWidth:2,
        alignItems:'center',
        alignSelf:'center',
        justifyContent: 'center',
        marginTop: '2%'
    },
});

export default styles;