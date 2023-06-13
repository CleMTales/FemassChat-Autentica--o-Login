import { Text, TextInput, TouchableOpacity, View, Modal } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaskedTextInput } from "react-native-mask-text";
import axios from 'axios'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
export default function CadastrarUsuario({ route, navigation }) {

    const [nome, setNome] = useState('')
    const [apelido, setApelido] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [senha, setSenha] = useState('')
    const [confSenha, setConfSenha] = useState('')
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [mostrarConfSenha, setMostrarConfSenha] = useState(false)
    const [senhaDiff, setSenhaDiff] = useState(false)
    const [cancelarModal, setCancModal] = useState(false)
    const [concluirModal, setConcluirModal] = useState(false)
    const [nomeVazio, setNomeVazio] = useState(true)
    const [emailVazio, setEmailVazio] = useState(true);
    const [telefoneVazio, setTelefoneVazio] = useState(true);
    const [senhaVazia, setSenhaVazia] = useState(true);
    const [confSenhaVazia, setConfSenhaVazia] = useState(true);
    const [msgCadastro, setMsgCadastro] = useState('')
    //const [permissao, requisitarPermissao] = ImagePicker.useCameraPermissions();
    const [confirmarImagem, setConfirmarImagem] = useState(false)
    const baseUrl = 'http://192.168.0.2:8080';


    function nomeChanged(nome) {
        setNome(nome)
        setNomeVazio(!nome)
    }

    function apelidoChanged(apelido) {
        setApelido(apelido)
    }

    function senhaChanged(senha) {
        setSenha(senha)
        setSenhaVazia(!senha)
    }

    function confSenhaChanged(confSenha) {
        setConfSenha(confSenha)
        setConfSenhaVazia(!confSenha)
    }

    function emailChanged(email) {
        setEmail(email)
        setEmailVazio(!email)
    }
    function telefoneChanged(telefone) {
        setTelefone(telefone)
        setTelefoneVazio(!telefone)
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

    function checarVazio() {
        if (nomeVazio || emailVazio || telefoneVazio || senhaVazia || confSenhaVazia) {
            return false;
        }
        return true;
    }

    function checarSenhasIguais() {
        if (!senhaVazia || !confSenhaVazia) {
            if (senha !== confSenha) {
                setSenhaDiff(true)
                return true
            }
            else
                setSenhaDiff(false)
        }
        return false
    }
    function checarForms() {

        let conformidadeForm = true
        if (checarVazio() == false) {
            conformidadeForm = false
        }
        if (checarSenhasIguais() == true) {
            conformidadeForm = false
        }
        return conformidadeForm;
    }


    async function validarCadastro() {
        const valido = checarForms()
        console.log(valido)
        if (valido) {
            axios.post(`${baseUrl}/user/`,
                {
                    "nome": nome,
                    "apelido": apelido ? apelido : null,
                    "avatar": avatar,
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

    function UserImage() {
        if (avatar != null)
            return (
                <Image
                    style={styles.userImage}
                    source={{ uri: 'data:image/jpeg;base64,' + avatar }}>
                </Image>
            )
        return (
            <View style={[styles.userImageTemplate, { alignContent: 'center', justifyContent: 'center' }]} >
                <AntDesign name="user" size={90} color="#FFFFFF" style={[{ paddingLeft: '1%', paddingTop: '3%' }]} />
            </View>
        )
    }

    async function selecionarAvatar() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].base64)
            setConfirmarImagem(true)
        }

    }

    function ModalConfirmarImagem() {
        return (
            <Modal
                visible={confirmarImagem}
                transparent={true}
                onRequestClose={() => {
                    setConfirmarImagem(!confirmarImagem)
                }}>
                <View style={[styles.viewCentralizada]}>
                    <View style={[styles.janelaModal, { paddingTop: 5 }]}>

                        <Image
                            style={[styles.userImage, { alignSelf: 'center', backgroundColor: 'black' }]}
                            source={{ uri: 'data:image/jpeg;base64,' + avatar }}>
                        </Image>

                        <Text style={[styles.loginText, { textAlign: 'center', height: 66 }]}>
                            Deseja utilizar essa imagem como avatar?
                        </Text>

                        <View style={[styles.containerHorizontal, { justifyContent: 'space-evenly' }]}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={[styles.botaoCancelarModal]}
                                onPress={
                                    () => {
                                        setConfirmarImagem(!confirmarImagem)
                                        setAvatar(null)
                                    }}
                            >
                                <AntDesign name="close" size={40} color="black" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={[styles.botaoConfirmarModal]}
                                onPress={
                                    () => {
                                        setConfirmarImagem(!confirmarImagem)
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
            setAvatar(route.params.usuario.avatar)
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

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => selecionarAvatar()}
                        >
                            <UserImage />

                        </TouchableOpacity>
                        <ModalConfirmarImagem />

                        <View style={[styles.containerVertical, { paddingHorizontal: 15, width: '100%' }]}>

                            <View style={[styles.containerVertical, { width: '100%', marginBottom: 15 }]}>
                                <Text style={styles.loginText}>
                                    <Text style={{ color: '#FF0000' }}>*</Text> Nome:

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
                                    <Text style={{ fontStyle: 'italic' }}> (Opcional)</Text>
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

