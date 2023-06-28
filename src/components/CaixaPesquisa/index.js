import React from "react"
import { TextInput, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { AntDesign } from '@expo/vector-icons'

export default function CaixaPesquisa({pesquisa, pesquisaChanged, headerHeight}) {
    return (
        <View style={[styles.container, {marginTop: headerHeight}]}>
            <View style={styles.containerPesquisa}>
                <TextInput
                    style={[styles.input, { width: '75%' }]}
                    placeholder="PESQUISA"
                    clearButtomMode="always"
                    onChangeText={(newText)=>{
                        console.log(newText)
                        pesquisaChanged(newText)}}
                />
                <TouchableOpacity activeOpacity={0.9} style={styles.botaoPesquisa}
                    onPress={()=>console.log(pesquisa)}
                >
                    <AntDesign name="search1" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>)
}

