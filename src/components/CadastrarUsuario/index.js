import { Text, TextInput, TouchableOpacity, View, Modal } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaskedTextInput } from "react-native-mask-text";
import axios from 'axios'

export default function CadastrarUsuario({ route, navigation }) {

    const [nome, setNome] = useState('')
    const [apelido, setApelido] = useState('')
    const [avatar, setAvatar] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    //const [maskTelefone, setMaskTelefone] = useState('')
    const [senha, setSenha] = useState('')
    const [confSenha, setConfSenha] = useState('')
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [mostrarConfSenha, setMostrarConfSenha] = useState(false)
    const [senhaDiff, setSenhaDiff] = useState(false)
    const [cancelarModal, setCancModal] = useState(false)
    const [concluirModal, setConcluirModal] = useState(false)
    const [nomeVazio, setNomeVazio] = useState(false)
    const [emailVazio, setEmailVazio] = useState(false);
    const [telefoneVazio, setTelefoneVazio] = useState(false);
    const [senhaVazia, setSenhaVazia] = useState(false);
    const [confSenhaVazia, setConfSenhaVazia] = useState(false);
    const [msgCadastro, setMsgCadastro] = useState('')
    const baseUrl = 'http://192.168.0.2:8080';
    function nomeChanged(nome) {
        setNome(nome)
    }

    function apelidoChanged(apelido) {
        setApelido(apelido)
    }

    function senhaChanged(senha) {
        setSenha(senha)
    }

    function confSenhaChanged(confSenha) {
        setConfSenha(confSenha)
    }

    function emailChanged(email) {
        setEmail(email)
    }
    function telefoneChanged(telefone) {
        setTelefone(telefone)
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

    function BotaoMostrarConfSenha() {
        if (mostrarConfSenha == true)
            return (
                <Feather name="x-circle" size={24} color="black" />
            )
        else return (
            <Feather name="circle" size={24} color="black" />
        )
    }

    function Erro({ erroMsg }) {
        return (
            <View style={[styles.containerHorizontal, { marginLeft: 15, marginBottom: 5 }]}>
                <AntDesign name="exclamationcircle" size={24} color="#FF0000" />
                <Text style={[styles.loginText, { fontWeight: 'bold', color: '#FF0000', marginLeft: 5 }]}>{erroMsg}</Text>
            </View>
        )
    }
    function senhasIguais() {
        if (senha === confSenha)
            return true

        else return false
    }

    function checarVazio(param, setParam) {
        if (param == '') {
            setParam(true)
            return true
        }
        else
            setParam(false)
        return false
    }
    async function checarForms() {

        let conformidadeForm = true;
        if (checarVazio(nome, setNomeVazio))
            conformidadeForm = false
        if (checarVazio(email, setEmailVazio))
            conformidadeForm = false
        if (checarVazio(telefone, setTelefoneVazio))
            conformidadeForm = false
        if (checarVazio(senha, setSenhaVazia))
            conformidadeForm = false
        if (checarVazio(confSenha, setConfSenhaVazia))
            conformidadeForm = false
        if (!senhaVazia || !confSenhaVazia) {
            setSenhaDiff(!senhasIguais())
            if (senhaDiff) {
                conformidadeForm = false;
            }
        }
        return conformidadeForm;
    }


    async function validarCadastro() {
        const valido = await checarForms()

        if (valido) {
            axios.post(`${baseUrl}/user/`,
                {
                    "nome": nome,
                    "apelido": apelido ? apelido : null,
                    "avatar": "teste",
                    "senha": senha,
                    "email": email,
                    "telefone": telefone
                }
            )
                .then(response => {
                    if (response.status == 200) {
                        setConcluirModal(!concluirModal)
                        setMsgCadastro('Cadastro efetuado com sucesso!')
                    }
                    else 
                        console.log(response)
                })
                .catch(error => {
                    console.log(error);
                });

        }
    }
    function ModalCancelarCadastro() {
        return (
            <Modal
                visible={cancelarModal}
                transparent={true}
                onRequestClose={() => {
                    setCancModal(!cancelarModal)
                }}>
                <View style={[styles.viewCentralizada]}>
                    <View style={[styles.janelaModal]}>

                        <Text style={[styles.loginText, { textAlign: 'center' }]}>
                            Deseja cancelar o cadastro?
                        </Text>

                        <View style={[styles.containerHorizontal, { justifyContent: 'space-evenly' }]}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={[styles.botaoCancelarModal]}
                                onPress={
                                    () => {
                                        setCancModal(!cancelarModal)
                                    }}
                            >
                                <AntDesign name="close" size={40} color="black" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={[styles.botaoConfirmarModal]}
                                onPress={
                                    () => {
                                        setCancModal(!cancelarModal)
                                        navigation.setParams({})
                                        navigation.goBack()
                                    }
                                }>
                                <AntDesign name="check" size={40} color="black" />
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </Modal>
        )
    }
    function ModalResultadoCadastro({ resultadoCadastro }) {
        return (
            <Modal
                visible={concluirModal}
                transparent={true}
                onRequestClose={() => {
                    setConcluirModal(!concluirModal)
                }}>
                <View style={[styles.viewCentralizada]}>
                    <View style={[styles.janelaModal]}>

                        <Text style={[styles.loginText, { textAlign: 'center' }]}>
                            {resultadoCadastro}
                        </Text>

                        <View style={[styles.containerHorizontal, { justifyContent: 'space-evenly' }]}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={[styles.botaoConfirmarModal]}
                                onPress={
                                    () => {
                                        setConcluirModal(!concluirModal)
                                        navigation.setParams({})
                                        navigation.goBack()
                                    }
                                }>
                                <AntDesign name="check" size={40} color="black" />
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </Modal>
        )
    }

    React.useEffect(() => {
        if (route.params?.login != null) {
            setTelefone(route.params.login)
        }

    }, [route.params?.login]);
    React.useEffect(() => {
        if (route.params?.usuario != null) {
            setTelefone(route.params.usuario.telefone)
            setEmail(route.params.usuario.email)
            setNome(route.params.usuario.nome)
            setSenha(route.params.usuario.senha)
        }

    }, [route.params?.usuario]);
    
    return (
        <View style={[styles.background, { justifyContent: 'center', }]}>
            <LinearGradient
                colors={['#75BAD3', '#64A066']}
                style={styles.background}
            />
            <View style={styles.containerCadastro}>
                <KeyboardAwareScrollView>
                    <ModalCancelarCadastro />
                    <ModalResultadoCadastro resultadoCadastro={msgCadastro} />
                    <View style={[styles.containerVertical, { height: '100%' }]}>

                        <View style={{ marginBottom: 15 }} >
                            <AntDesign name="user" size={95} color="#FFFFFF" style={styles.userImage} />
                        </View>

                        <View style={[styles.containerVertical, { paddingHorizontal: 15, width: '100%' }]}>

                            <View style={[styles.containerVertical, { width: '100%', marginBottom: 15 }]}>
                                <Text style={styles.loginText}>
                                    <Text style={{ color: '#FF0000' }}>*</Text> Nome:
                                    <Text style={{ fontStyle: 'italic', color: '#FF0000' }}> Obrigatório</Text>
                                </Text>
                                <LinearGradient
                                    colors={nomeVazio ? ['#9BD1E8', '#CC6666'] : ['#75DDDD', '#9BD1E8']}
                                    style={styles.gradientBox}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <TextInput
                                        style={[styles.input]}
                                        value={nome}
                                        placeholder='NOME'
                                        onChangeText={nomeChanged}
                                    />
                                </LinearGradient>
                            </View>
                            {nomeVazio ? <Erro erroMsg="Campo obrigatório." /> : null}

                            <View style={[styles.containerVertical, { width: '100%', marginBottom: 15 }]}>
                                <Text style={styles.loginText}>
                                    Apelido:
                                    <Text style={{ fontStyle: 'italic' }}> Opcional</Text>
                                </Text>
                                <LinearGradient
                                    colors={['#75DDDD', '#9BD1E8']}
                                    style={styles.gradientBox}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <TextInput
                                        style={[styles.input]}
                                        value={apelido}
                                        placeholder='APELIDO'
                                        onChangeText={apelidoChanged}
                                    />
                                </LinearGradient>
                            </View>

                            <View style={[styles.containerVertical, { width: '100%', marginBottom: 8 }]}>
                                <Text style={styles.loginText}>
                                    <Text style={{ color: '#FF0000' }}>*</Text> Senha:
                                    <Text style={{ fontStyle: 'italic', color: '#FF0000' }}> Obrigatório</Text>
                                </Text>
                                <LinearGradient
                                    colors={senhaDiff || senhaVazia ? ['#9BD1E8', '#CC6666'] : ['#75DDDD', '#9BD1E8']}
                                    style={styles.gradientBox}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0.9 }}
                                >
                                    <TextInput
                                        style={[styles.input, { color: 'black' }]}
                                        secureTextEntry={!mostrarSenha}
                                        value={senha}
                                        placeholder='SENHA'
                                        onChangeText={senhaChanged}
                                    />
                                </LinearGradient>
                            </View>

                            <View style={[styles.containerHorizontal, { marginLeft: 15, marginBottom: 2 }]}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    style={[styles.containerHorizontal, { width: '50%' }]}
                                    onPress={() => setMostrarSenha(!mostrarSenha)}>
                                    <BotaoMostrarSenha />
                                    <Text style={[styles.loginText, { fontWeight: 'normal', marginLeft: 5 }]}>Mostrar senha</Text>
                                </TouchableOpacity>
                            </View>
                            {senhaVazia ? <Erro erroMsg="Campo obrigatório." /> : null}

                            <View style={[styles.containerVertical, { width: '100%', marginBottom: 8 }]}>
                                <Text style={styles.loginText}>
                                    <Text style={{ color: '#FF0000' }}>*</Text> Confirmar senha:
                                    <Text style={{ fontStyle: 'italic', color: '#FF0000' }}> Obrigatório</Text>
                                </Text>
                                <LinearGradient
                                    colors={senhaDiff || confSenhaVazia ? ['#9BD1E8', '#CC6666'] : ['#75DDDD', '#9BD1E8']}
                                    style={styles.gradientBox}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <TextInput
                                        style={[styles.input, { color: 'black' }]}
                                        secureTextEntry={!mostrarConfSenha}
                                        value={confSenha}
                                        placeholder='CONFIRMAR SENHA'
                                        onChangeText={confSenhaChanged}
                                    />
                                </LinearGradient>
                            </View>

                            <View style={[styles.containerHorizontal, { marginLeft: 15, marginBottom: 2 }]}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    style={[styles.containerHorizontal, { width: '50%' }]}
                                    onPress={() => setMostrarConfSenha(!mostrarConfSenha)}>
                                    <BotaoMostrarConfSenha />
                                    <Text style={[styles.loginText, { fontWeight: 'normal', marginLeft: 5 }]}>Mostrar senha</Text>
                                </TouchableOpacity>
                            </View>
                            {confSenhaVazia ? <Erro erroMsg="Campo obrigatório." /> : null}
                            {senhaDiff ? <Erro erroMsg="As senhas não coincidem." /> : null}

                            <View style={[styles.containerVertical, { width: '100%', marginBottom: 8 }]}>
                                <Text style={styles.loginText}>
                                    <Text style={{ color: '#FF0000' }}>*</Text> Email:
                                    <Text style={{ fontStyle: 'italic', color: '#FF0000' }}> Obrigatório</Text>
                                </Text>
                                <LinearGradient
                                    colors={emailVazio ? ['#9BD1E8', '#CC6666'] : ['#75DDDD', '#9BD1E8']}
                                    style={styles.gradientBox}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <TextInput
                                        style={[styles.input]}
                                        value={email}
                                        placeholder='EMAIL@EMAIL.COM'
                                        onChangeText={emailChanged}
                                    />
                                </LinearGradient>
                            </View>
                            {emailVazio ? <Erro erroMsg="Campo obrigatório." /> : null}

                            <View style={[styles.containerVertical, { width: '100%', marginBottom: 8 }]}>
                                <Text style={styles.loginText}>
                                    <Text style={{ color: '#FF0000' }}>*</Text> Telefone:
                                    <Text style={{ fontStyle: 'italic', color: '#FF0000' }}> Obrigatório</Text>
                                </Text>
                                <LinearGradient
                                    colors={telefoneVazio ? ['#9BD1E8', '#CC6666'] : ['#75DDDD', '#9BD1E8']}
                                    style={styles.gradientBox}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <MaskedTextInput
                                        style={[styles.input]}
                                        value={telefone}
                                        maxLength={17}
                                        keyboardType='numeric'
                                        placeholder='(XX) XXXXX - XXXX'
                                        mask="(99) 99999 - 9999"
                                        onChangeText={(maskTelefone, telefone) => {
                                            telefoneChanged(telefone)
                                        }
                                        }

                                    />
                                </LinearGradient>
                            </View>
                            {telefoneVazio ? <Erro erroMsg="Campo obrigatório." /> : null}

                        </View>

                    </View>
                </KeyboardAwareScrollView>

                <View style={[styles.containerHorizontal, { height: '10%', width: '100%', paddingTop: '2%' }]}>

                    <View style={[styles.botoesInf]}>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={[styles.botaoInferiorEsq]}
                            onPress={
                                () => {
                                    setCancModal(!cancelarModal)
                                }}
                        >
                            <AntDesign name="close" size={40} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={[styles.botaoInferiorDir]}
                            onPress={validarCadastro}>
                            <AntDesign name="check" size={40} color="black" />
                        </TouchableOpacity>

                    </View>




                </View>
            </View>
        </View>
    );
}

