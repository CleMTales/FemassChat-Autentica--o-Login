import { Text, Modal, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import { API_BASE_URL } from '@env'
import ModalMsg from "../ModalMsg"
import { useFocusEffect } from '@react-navigation/native';

export default function Login({ route, navigation }) {

    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [erro, setErro] = useState(false)
    const [msgLogin, setMsgLogin] = useState('')
    const [concluirModal, setConcluirModal] = useState(false)
    const [usuario, setUsuario] = useState([])
    const [redirecionar, setRedirecionar] = useState(false)

    function loginChanged(login) {
        setLogin(login)
    }

    function senhaChanged(senha) {
        setSenha(senha)
    }

    function BotaoMostrarSenha() {
        if (mostrarSenha == true)
            return (
                <Feather name="x-circle" size={24} color="black" />
            )
        else return (
            <Feather name="circle" size={24} color="black" />
        )
    }
    function MensagemErro() {
        if (erro == true)
            return (
                <View style={[styles.containerHorizontal, { marginLeft: 35 }]}>
                    <AntDesign name="exclamationcircle" size={30} color="#FF0000" />
                    <Text style={[styles.loginText, { height: '70%', color: '#FF0000', marginLeft: 5, alignSelf: 'center' }]}>Login incorreto ou não encontrado</Text>
                </View>
            )
    }
    function validarLogin() {
        if (login == '' || senha == '')
            setErro(true)
        else {
            let loginTrim = login.trim()
            let senhaTrim = senha.trim()
            axios.get(`${API_BASE_URL}/user/${loginTrim}/${senhaTrim}`)
                .then(response => {
                    if (response.status == 200) {
                        setErro(false)
                        setConcluirModal(!concluirModal)
                        setMsgLogin('Login efetuado com sucesso!')
                        setUsuario(response.data)
                    }
                    else
                        setErro(true)

                })
                .catch(error => {
                    setErro(true)
                    setUsuario([])
                });
        }
    }

    function loginTest(){
        axios.get(`${API_BASE_URL}/user/123/123`)
                .then(response => {
                    if (response.status == 200) {
                        setErro(false)
                        setConcluirModal(!concluirModal)
                        setMsgLogin('Login efetuado com sucesso!')
                        setUsuario(response.data)
                    }
                    else
                        setErro(true)

                })
                .catch(error => {
                    setErro(true)
                    setUsuario([])
                });
    }

    function AvatarUsuario() {
        if (usuario.avatar != null)
            return (
                <View>
                    <Image
                        style={styles.userImage}
                        source={{ uri: 'data:image/jpeg;base64,' + usuario.avatar }}>
                    </Image>
                </View>
            )
        return (
            <View  >
                <AntDesign name="user" size={95} color="#FFFFFF" style={styles.userImage} />
            </View>
        )
    }


    React.useEffect(() => {
        if (route.params?.login) {
            setLogin(String(route.params?.login))
        }
    }, [route.params?.login]);

    useFocusEffect(() => {
        if (redirecionar == true)
            navigation.push('Lista de Usuários', { login: usuario.telefone })
        setRedirecionar(false)
    }
    ), [redirecionar]

    return (
        <View style={[styles.background, { justifyContent: 'center', }]}>
            <LinearGradient
                colors={erro ? ['#75BAD3', '#CC6666'] : ['#75BAD3', '#999999']}
                style={styles.background}
            />
            <View style={styles.containerLogin}>
                {concluirModal && <ModalMsg
                    visivel={concluirModal}
                    setVisivel={setConcluirModal}
                    mensagem={msgLogin}
                    rotinaConfirma={() => { setRedirecionar(true) }}
                />}
                <KeyboardAwareScrollView>
                    <View style={[styles.containerVertical, { height: '100%' }]}>

                        <AvatarUsuario />
                        <View style={[styles.containerVertical, { paddingHorizontal: 15, width: '100%' }]}>

                            <View style={[styles.containerVertical, { width: '100%', marginBottom: 30 }]}>
                                <Text style={styles.loginText}>Login/Telefone: </Text>
                                <LinearGradient
                                    colors={['#75DDDD', '#9BD1E8']}
                                    style={styles.gradientBox}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <TextInput
                                        style={[styles.input, erro ? { color: '#b71919' } : { color: 'black' }]}
                                        value={login}
                                        placeholder='LOGIN/TELEFONE'
                                        onChangeText={loginChanged}
                                    />
                                </LinearGradient>
                            </View>

                            <View style={[styles.containerVertical, { width: '100%', marginBottom: 8 }]}>
                                <Text style={styles.loginText}>Senha: </Text>
                                <LinearGradient
                                    colors={['#75DDDD', '#9BD1E8']}
                                    style={styles.gradientBox}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <TextInput
                                        style={[styles.input, erro ? { color: '#b71919' } : { color: 'black' }]}
                                        secureTextEntry={!mostrarSenha}
                                        value={senha}
                                        placeholder='SENHA'
                                        onChangeText={senhaChanged}
                                    />
                                </LinearGradient>
                            </View>

                            <View style={[styles.containerHorizontal, { marginLeft: 15, marginBottom: 20 }]}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    style={[styles.containerHorizontal, { width: '50%' }]}
                                    onPress={() => setMostrarSenha(!mostrarSenha)}>
                                    <BotaoMostrarSenha />
                                    <Text style={[styles.loginText, { fontWeight: 'normal', marginLeft: 5 }]}>Mostrar senha</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <MensagemErro />

                    </View>
                </KeyboardAwareScrollView>
                <View style={[styles.containerHorizontal, { height: '15%', width: '100%', paddingHorizontal: '3%' }]}>
                    <View style={[styles.containerHorizontal, { width: '100%', justifyContent: 'center' }]}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={[styles.containerHorizontal, { width: '50%' }]}
                            onPress={
                                () => {
                                    navigation.push(
                                        'Cadastro de Usuário', { login: login ? login : null })
                                }}
                        >
                            <Text
                                style={[styles.loginText,
                                {
                                    fontWeight: 'normal',
                                    color: '#211EB9',
                                    textAlign: 'center',
                                    height: '100%'
                                }]}>Não possui login?{"\n"}Cadastre-se aqui!</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity activeOpacity={0.9} style={styles.botaoLogin}
                        onPress={loginTest}/* {validarLogin} */>
                        <AntDesign name="arrowright" size={34} color="black" />
                    </TouchableOpacity>


                </View>
            </View>
        </View>
    );
}

