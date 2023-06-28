import { memo } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { AntDesign, Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from "@react-navigation/native"
import { styles } from "./styles"

export default function ContatoListView({ contato, usuario }) {
    //console.log(usuario)
    const navigation = useNavigation()
   
    function ImagemUsuario() {
        if (contato.avatar != null)
            return (
                <Image
                    style={styles.userImage}
                    source={{ uri: 'data:image/jpeg;base64,' + contato.avatar }}>
                </Image>
            )
        else return (
            <View style={[styles.userImage]} >
                <AntDesign style={{ textAlign: 'center', textAlignVertical: 'center' }} name="user" size={40} color="#FFFFFF" />
            </View>
        )
    }

    return (
        <TouchableOpacity style={[styles.containerHorizontal, { marginBottom: 5, paddingHorizontal: '3%' }]}
            onPress={() => {
                navigation.push("Conversa", { contato: contato, usuario: usuario })
            }}
        >
            <TouchableOpacity activeOpacity={0.9} style={[styles.userImage, { borderWidth: 0, marginRight: '2%' }]}
            >
                <ImagemUsuario />
            </TouchableOpacity>
            <LinearGradient
                colors={contato.newMessage ? [] : ['#45B9B9', '#9BD1E8']}
                style={styles.gradientBox}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Text style={styles.nomeUsuario}>
                    {contato.nome}
                </Text>
            </LinearGradient>
            <TouchableOpacity activeOpacity={0.9} style={[styles.botao, { borderWidth: 1 }]}
            >
                <AntDesign style={{ textAlign: 'center', textAlignVertical: 'center' }} name="message1" size={30} color="#FFFFFF" />
            </TouchableOpacity>
        </TouchableOpacity>

    )
}

