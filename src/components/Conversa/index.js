import React, { useEffect, useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Storage from "../../Async/StorageFunctions";
import Mensagem from "../Mensagem";
import * as api from "../../Async/ApiFunctions";
import { Feather, AntDesign } from "@expo/vector-icons";
import { styles } from "./styles"
export default function Conversa({ route }) {
    const [erroBuscaMsg, setErroBuscaMsg] = useState(false);
    const [userHash, setUserHash] = useState("");
    const [contatoHash, setContatoHash] = useState("");
    const [messageListVersion, setMessageListVersion] = useState(0); // Track the version of the message list

    useEffect(() => {
        try {
            api.getUserHash(route.params.usuario.id).then(async (userHash) => {
                setUserHash(userHash);
            });
        } catch (e) {
            console.log(e);
        }
        try {
            api.getUserHash(route.params.usuario.id).then(async (contatoHash) => {
                setContatoHash(contatoHash);
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    function DetalhesContato() {
        return (
            <View style={styles.detalhesContatoContainer}>
                <Text style={styles.contatoNome}>{route.params.contato.nome}</Text>
                <ImagemUsuario />
            </View>
        );
    }

    function ImagemUsuario() {
        const [altura, setAltura] = useState(12);

        if (route.params.contato.avatar != null) {
            return (
                <Image
                    style={styles.userImage}
                    source={{ uri: "data:image/jpeg;base64," + route.params.contato.avatar }}
                />
            );
        } else {
            return (
                <View
                    onLayout={(event) => {
                        setAltura(Math.floor(event.nativeEvent.layout.height * 0.8));
                    }}
                    style={[styles.userImage]}
                >
                    <AntDesign
                        style={{ textAlign: "center", textAlignVertical: "center" }}
                        name="user"
                        size={altura}
                        color="#FFFFFF"
                    />
                </View>
            );
        }
    }

    function CaixaMensagem() {
        const [textMessage, setTextMessage] = useState("");

        async function sendMessage(message) {
            api.enviarMensagem(message, route.params.usuario, route.params.contato);
        }

        function textChanged(textMessage) {
            console.log(textMessage);
            setTextMessage(textMessage);
        }

        return (
            <View style={styles.caixaMensagemContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.caixaInputMensagem]}
                        multiline={true}
                        value={textMessage}
                        onChangeText={textChanged}
                        placeholder="Digitar mensagem"
                        onSubmitEditing={() => {
                            sendMessage(textMessage);
                            setTextMessage("");
                        }}
                    />
                </View>

                <TouchableOpacity
                    activeOpacity={0.9}
                    style={[styles.botaoEnviar]}
                    onPress={() => {
                        sendMessage(textMessage);
                        setTextMessage("");
                    }}
                >
                    <Feather
                        style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                        }}
                        name="send"
                        size={20}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
        );
    }

    function ListaMensagens() {
        const [listaMensagens, setListaMensagens] = useState([]);

        useEffect(() => {
            updateList();
            const interval = setInterval(updateList, 500);
            return () => {
                clearInterval(interval);
            };
        }, []);

        async function saveMessages() {
            try {
                await Storage.saveMessages(listaMensagens, userHash, contatoHash);
            } catch (e) {
                console.log(e);
            }
        }

        async function getUltimaBusca() {
            const response = await api.getConversas(usuario.id, contato);
            if (response != null) {
                setListaMensagens(response);
            }
        }

        async function getListaMensagens() {
            try {
                const response = await api.getMensagemEntreUsuarios(
                    route.params.usuario,
                    route.params.contato
                );
                if (response) {
                    /* console.log(response); */
                    sortByDate(response);
                }
            } catch (error) {
                console.log(error);
                setErroBuscaMsg(true);
                return [];
            }
        }

        async function updateList() {
            try {
                getListaMensagens();
            } catch (error) {
                console.log(error);
            }
        }

        function sortByDate(lista) {
            const listaOrdenada = lista.slice().sort((a, b) => {
                if (Date.parse(a.dataHora) < Date.parse(b.dataHora)) {
                    return 1;
                }
                if (Date.parse(a.dataHora) > Date.parse(b.dataHora)) {
                    return -1;
                }
                return 0;
            });
            setListaMensagens(listaOrdenada);
        }

        return (
            <View style={[styles.containerMensagens]}>
                {listaMensagens.length > 0 ? (
                    <FlatList
                        data={listaMensagens}
                        keyExtractor={(item) => String(item.id)}
                        inverted={true}
                        renderItem={({ item }) => (
                            <Mensagem mensagem={item} contato={route.params.contato} usuario={route.params.usuario} />
                        )}
                    />
                ) : null}
            </View>
        );
    }

    return (
        <View style={styles.containerBackground}>
            <LinearGradient colors={["#59d9ebad", "#94A064"]} style={styles.background} />

            <View style={[styles.containerJanelaMensagens, { marginTop: useHeaderHeight() }]}>
                <DetalhesContato />
                <ListaMensagens />
                <CaixaMensagem />
            </View>
        </View>
    );
}
