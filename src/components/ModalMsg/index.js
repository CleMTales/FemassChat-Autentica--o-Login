import { Text, Modal, TouchableOpacity, View, } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import styles from './styles'
export default function ModalMsg({ visivel, setVisivel, mensagem, rotinaConfirma, rotinaCancela }) {
   
    return (
        <Modal
            visible={visivel}
            transparent={true}
            onRequestClose={() => {
                setVisivel(!visivel)
            }}>
            <View style={[styles.viewCentralizada]}>
                <View style={[styles.janelaModal]}>

                    <Text style={[styles.loginText, { textAlign: 'center' }]}>
                        {mensagem}
                    </Text>


                    <View style={[styles.containerHorizontal, { justifyContent: 'space-evenly' }]}>
                        {rotinaCancela &&
                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={[styles.botaoCancelarModal]}
                                onPress={
                                    () => {
                                        setVisivel(!visivel)
                                        if (rotinaCancela)
                                            rotinaCancela()
                                    }}
                            >
                                <AntDesign name="close" size={40} color="black" />
                            </TouchableOpacity>}

                        {rotinaConfirma && <TouchableOpacity
                            activeOpacity={0.9}
                            style={[styles.botaoConfirmarModal]}
                            onPress={
                                () => {
                                    setVisivel(!visivel)
                                    if (rotinaConfirma)
                                        rotinaConfirma()
                                }
                            }>
                            <AntDesign name="check" size={40} color="black" />
                        </TouchableOpacity>
                        }
                    </View>

                </View>
            </View>
        </Modal>
    )

}
