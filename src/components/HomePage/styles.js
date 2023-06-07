import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      },
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
        paddingTop: 0,
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
    userImage: {
        borderRadius: 250,
        borderColor: '#000000',
        borderWidth: 1,
        backgroundColor: '#45B9B9',
        height: 107,
        width: 100,
        marginLeft: 5,
        paddingBottom: 15,
        paddingLeft: '1%',
        alignContent: 'center',
        marginTop: '6%',
    },
    loginText: {
        height: 30,
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginTextAviso: {
        height: 30,
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF4646'
    },
    containerHorizontal: {
        flexDirection: 'row',
        width: '100%',
    },
    containerBackground: {
        paddingTop: '5%',
        alignItems: 'center',
        height: '100%',

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
    botaoMostrarSenha: {
        width: '100%',
        height: '100%',
        // position:'absolute',
        //bottom: '-15%',
        // right:'-15%',
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
    botaoLogin: {
        width: 40,
        aspectRatio: 1,
        backgroundColor: '#45B9B9',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        position:'absolute',
        top: '3%',
        right:'3%',
    },

    botaoInferior: {
        backgroundColor: '#47A86E',
        height: '100%',
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',

    },
    botoesInferioresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: '5%',
        width: '90%',
        bottom: 0,
        marginHorizontal: 30,
        borderColor: '#000000',
        borderWidth: 2,
        borderTopWidth: 0,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    }
});

export default styles;