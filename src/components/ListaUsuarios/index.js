import React, { memo,  useState } from "react"
import { FlatList,  View } from "react-native"
import UsuarioListView from "../UsuarioListView"
import { styles } from "./styles"
import { LinearGradient } from 'expo-linear-gradient'
import axios  from "axios"
//import AsyncStorage from '@react-native-async-storage/async-storage'
import {API_BASE_URL} from '@env'
import ModalMsg from "../ModalMsg"
import CaixaPesquisa from "../CaixaPesquisa"

export default memo(ListaUsuarios)
function ListaUsuarios(props) {
    const [pesquisa, setPesquisa] = useState('')
    const [pesquisaAnterior, setPesquisaAnterior] = useState('')
    const [listaUsuarios, setListaUsuarios] = useState([])
    const [listaExibicao, setListaExibicao] = useState([])
    const [erroPesquisa, setErroPesquisa] = useState(false)
    function pesquisaChanged(pesquisa) {
        setPesquisa(pesquisa.toLowerCase())
    }
    
    async function getListaUsuarios() {
        axios.get(`${API_BASE_URL}/message/buscarUsuarios/1234`)
            .then(response => {
                if (response.status == 200) {
                    /* setErro(false)
                    setConcluirModal(!concluirModal)
                    setMsgLogin('Login efetuado com sucesso!')
                    setUsuario(response.data) */
                    console.log(API_BASE_URL)
                    console.log(response)
                    return (response.data)
                }

            })
            .catch(error => {
                console.log(error)
                setErroPesquisa(true)
                /* setErro(true) */
            });
        return ({})
    }


    async function updateList() {
        
        getListaUsuarios().then((listaItems) => {
            const listaAlfabetica = (items)=> {items.sort((a, b) => {
                const nomeA = a.nome.toLowerCase()
                const nomeB = b.nome.toLowerCase()
                if (nomeA < nomeB) {
                    return -1
                }
                if (nomeA > nomeB) {
                    return 1
                }
                return 0
            })}
            if (listaAlfabetica !== listaUsuarios) {
                setListaUsuarios(listaAlfabetica)
                setListaExibicao(listaAlfabetica)
            }
        })
    }

    function pesquisar() {
        if (pesquisa != pesquisaAnterior) {
            const listaFiltrada = listaUsuarios.filter((contatoLista) => {
                return (String(contatoLista.nome).toLowerCase().includes(pesquisa) || String(contatoLista.apelido).includes(pesquisa))
            })
            setListaExibicao(listaFiltrada)
            setPesquisaAnterior(pesquisa)
        }
    }

    /* useEffect(() => {
        if (props.route.params?.shouldUpdate == true) {
            updateList().then(
                props.navigation.setParams({
                    shouldUpdate: false
                }),
            )
        }
    }, [props.route.params?.shouldUpdate]) */


    return (
        <View style={styles.containerBackground}>
            {getListaUsuarios}
            {erroPesquisa && <ModalMsg
            visivel={erroPesquisa}
            setVisivel={setErroPesquisa}
            mensagem={"Houve um erro ao procurar os usuários."}
            rotinaCancela={() => { console.log("cancelado")}}
            />}
            <LinearGradient
                colors={['#59d9ebad', '#64A066']}
                style={styles.background}
            />
            <CaixaPesquisa
            pesquisa = {pesquisa}
            pesquisaChanged = {pesquisaChanged}
            pesquisar = {pesquisar}
            />
            < View style={styles.containerContato} >
                <FlatList
                    data={listaExibicao}
                    keyExtractor={(item) => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <UsuarioListView contato={item} />}
                />
            </View >
        </View>
    )


}

