import React, { memo, useEffect, useState } from "react"
import { useHeaderHeight } from '@react-navigation/elements';
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { LinearGradient } from 'expo-linear-gradient'
import ModalMsg from "../ModalMsg"
import CaixaPesquisa from "../CaixaPesquisa"
import ContatoListView from "../ContatoListView";
import * as Storage from "../../Async/StorageFunctions"
import * as api from "../../Async/ApiFunctions";
import ModalNovaConversa from "../ModalNovaConversa";
import { Entypo } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";

export default
    function ListaUsuarios({ route }) {
    const [pesquisa, setPesquisa] = useState('')
    const [pesquisaAnterior, setPesquisaAnterior] = useState('')
    const [listaUsuarios, setListaUsuarios] = useState([])
    const [listaExibicao, setListaExibicao] = useState([])
    const [erroBuscaUsers, setErroBuscaUsers] = useState(false)
    const [iniciarNovaConversa, setIniciarNovaConversa] = useState(false)
    const [contatoSelecionado, setContatoSelecionado] = useState('')
    const [redirecionar, setRedirecionar] = useState(false)
        const [usuariosCadastrados, setUsuariosCadastrados] = useState([])
    const usuario = route.params.usuario;

    /* console.log(route);

    console.log(usuario); */


    async function getConversasComUsuario() {
        try {
            const response = await api.getConversas(usuario.id);

            if (response != null) {
                /* console.log(response); */
                return response;
            } else {
                setErroBuscaUsers(true);
                return [];
            }
        } catch (error) {

            console.log(error);
            setErroBuscaUsers(true);
            return [];
        }
    }

    async function updateList() {
        //debugger
        //console.log(listaUsuarios);
        try {
            const contatosSalvos = await Storage.getConversasSalvas(route.params.usuario.hash)
            //console.log(contatosSalvos);

            /* console.log(new Date().toISOString())
            console.log(new Date(contatosSalvos.ultimaBusca).toISOString())*/
            if (contatosSalvos == null ||
                contatosSalvos.contatos == null
                || ((new Date().getTime() - Date.parse(contatosSalvos.ultimaBusca)) / 1000) >= 5) {
                //console.log(listaUsuarios);
                const response = await getConversasComUsuario();
                //console.log(response);
                if (response != null) {
                    //.log(response);
                    /* console.log(listaUsuarios);
                    console.log(listaExibicao); */
                    sortUserList(response);
                    Storage.saveListaContatos(response, route.params.usuario.hash)
                }
                else {
                    console.log('Sem conversas');//TODO Aviso sem conversas/iniciar conversa
                }

            }
            else console.log('não ha conversas novas');
        } catch (error) {
            console.log(error);
        }
    }


    async function getUsuariosCadastrados() {
        try {
          const response = await api.getUsuariosCadastrados(route.params.usuario.telefone);
          if (response != null) {
            setUsuariosCadastrados(response);
          } else {
            setUsuariosCadastrados([]);
          }
        } catch (error) {
          console.log(error);
          setUsuariosCadastrados([]);
        }
      }
    
      useEffect(() => {
        getUsuariosCadastrados();
      }, []);

    function sortUserList(lista) {
        const listaAlfabetica = lista.slice().sort((a, b) => {
            const nomeA = a.nome.toLowerCase();
            const nomeB = b.nome.toLowerCase();
            if (nomeA < nomeB) {
                return -1;
            }
            if (nomeA > nomeB) {
                return 1;
            }
            return 0;
        });
        setListaUsuarios(listaAlfabetica)
        setListaExibicao(listaAlfabetica)/* 
        console.log(listaAlfabetica); */
    }



    function pesquisar() {
        if (pesquisa != pesquisaAnterior) {
            const listaFiltrada = listaUsuarios.filter((usuarioLista) => {
                return (String(usuarioLista.nome).toLowerCase().includes(pesquisa))
            })

            setListaExibicao(listaFiltrada)
            setPesquisaAnterior(pesquisa)
        }
    }

    function pesquisaChanged(pesquisa) {
        setPesquisa(pesquisa.toLowerCase())
    }

    function rotinaRedirecionar(contatoSelecionado) {
        /* console.log('rotina');
        console.log(contatoSelecionado); */
        setIniciarNovaConversa(false)
        setContatoSelecionado(contatoSelecionado)
        
    }

    useEffect(() =>
        pesquisar()
    ), [pesquisa];

    useEffect(() => {
        updateList()
        const interval = setInterval(updateList, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useFocusEffect(() => {
        if (redirecionar == true){ 
            setRedirecionar(false)
            navigation.push('Conversa', { contato:contatoSelecionado, usuario: usuario })
       }
    }
    ), [redirecionar]


    return (
        <View style={styles.containerBackground}>
            {erroBuscaUsers && <ModalMsg
                visivel={erroBuscaUsers}
                setVisivel={setErroBuscaUsers}
                mensagem={"Houve um erro ao procurar os usuários."}
                rotinaCancela={() => { console.log("cancelado") }}
            />}
            <LinearGradient
                colors={['#59d9ebad', '#64A066']}
                style={styles.background}
            />
            <CaixaPesquisa
                pesquisa={pesquisa}
                pesquisaChanged={pesquisaChanged}
                headerHeight={useHeaderHeight()}
            />

            < View style={styles.containerUsuario} >
                <FlatList
                    data={listaExibicao ? listaExibicao : {}}
                    keyExtractor={(item) => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (<ContatoListView contato={item} usuario={route.params.usuario} />)}
                />
                <View>
                    {iniciarNovaConversa && <ModalNovaConversa
                        visivel={iniciarNovaConversa}
                        setVisivel={setIniciarNovaConversa}
                        mensagem={"Deseja iniciar uma conversa com qual usuário?"}
                        rotinaCancela={() => { console.log("cancelado") }}
                        rotinaRedirecionar={(contato) =>  {
                            rotinaRedirecionar(contato)}}
                        usuario = {usuario}
                        usuariosCadastrados = {usuariosCadastrados}
                    />}

                    <TouchableOpacity activeOpacity={0.9} style={styles.botaoNovaConversa}
                        onPress={() => { setIniciarNovaConversa(true) }}>
                        <Entypo name="new-message" size={34} color="black" />
                    </TouchableOpacity>
                </View>
            </View >
        </View>
    )


}

