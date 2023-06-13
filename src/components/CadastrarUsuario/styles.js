import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
    
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        width: '100%',
    },
    


    containerCadastro: {
        backgroundColor: '#A3D8EE',
        borderColor: '#0000000',
        borderWidth: 2,
        borderRadius: 15,
        paddingTop: '1%',
        margin: 30,
        marginBottom: 0,
        paddingLeft: 0,
        height: '85%',
        width: '90%',
        alignSelf: 'center',
    },
    containerVertical: {
        alignItems:'center',
    },
    userImageTemplate: {
        borderRadius: 250,
        borderColor: '#000000',
        borderWidth: 1,
        backgroundColor: '#45B9B9',
        height: 100,
        width: 100,
        marginLeft: 5,
        paddingBottom: 15,
        paddingLeft: '1%',
        alignContent: 'center',
    },
    userImage: {
        borderRadius: 55,
        borderColor: '#000000',
        borderWidth: 1,
        backgroundColor: '#45B9B9',
        height: 100,
        width: 100,
        alignContent: 'center'
    },

    loginText: {
        height: 30,
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
    },
    containerHorizontal: {
        flexDirection: 'row',
        width: '100%',
    },
    gradientBox: {
        height: 30,
        borderRadius: 10,
        width: '100%',
    },
    input: {
        height: 30,
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'transparent',
        position: 'absolute',
    },

    botoesInf:{
        flexDirection: 'row',
        width: '100%',
        backgroundColor:'#45B9B9',
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopColor: 'black',
        borderTopWidth: 2,
    },

    botaoInferiorEsq: {
        flexDirection: 'row',
        width: '50%',
        height: '100%',
        borderRightColor: 'black',
        borderRightWidth: 1,
        justifyContent:'center',
        alignItems:'center'
    },

    botaoInferiorDir: {
        flexDirection: 'row',
        width: '50%',
        height: '100%',
        borderLeftColor: 'black',
        borderLefttWidth: 1,
        justifyContent:'center',
        alignItems:'center'
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

    botaoCancelarModal:{
        height:'100%',
        width: '25%',
        backgroundColor:'#CC6666',
        borderColor: 'black',
        borderRadius: 15,
        borderWidth:2,
        alignItems:'center',
    },
    botaoConfirmarModal:{
        height:'100%',
        width: '25%',
        backgroundColor:'#45B9B9',
        borderColor: 'black',
        borderRadius: 15,
        borderWidth:2,
        alignItems:'center',
    },
});

export default styles;