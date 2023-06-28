import { Text, Modal, TouchableOpacity, View, FlatList, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import styles from './styles'
import * as api from "../../Async/ApiFunctions";
import ContatoListView from '../ContatoListView';

export default function ModalNovaConversa(props) {
    const [listaUsuarios, setListaUsuarios] = useState(props.usuariosCadastrados)
    const [mensagemExibicao, setMensagemExibicao] = useState(props.mensagem)
    

    
    

    return (
      
        <Modal
            visible={props.visivel}
            transparent={true}
            onRequestClose={() => {
                props.setVisivel(!props.visivel)
            }}>
            <View style={[styles.viewCentralizada]}>
                <View style={[styles.janelaModal, { height: '85%' }]}>

                    <Text style={[styles.messageText, { textAlign: 'center' }]}>
                        {mensagemExibicao}
                    </Text>
                    <View style={[styles.containerVertical, { justifyContent: 'space-evenly',
                height: '90%' }]}>
                        {listaUsuarios.length > 0 ?(
                        <FlatList
                            data={listaUsuarios}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={({ item }) => 
                            (<TouchableOpacity
                                onPress={() => {
                                  props.setVisivel(false)
                                  props.rotinaRedirecionar(item)
                                }}
                              >
                                <ContatoListView contato={item} usuario={props.usuario} />
                              </TouchableOpacity>
                        )}

                        /> ): (
                            null
                          )}
                        {props.rotinaCancela &&
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={[styles.botaoCancelarModal]}
                                onPress={
                                    () => {
                                        props.setVisivel(!props.visivel)
                                        if (props.rotinaCancela)
                                            props.rotinaCancela()
                                    }}
                            >
                                <AntDesign name="close" size={40} color="black" />
                            </TouchableOpacity>}
                    </View>

                </View>
            </View>
        </Modal>
    )

}
