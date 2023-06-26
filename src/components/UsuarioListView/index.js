import { memo } from "react"
import { Text, TouchableOpacity } from "react-native"
import { AntDesign, Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from "@react-navigation/native"
import { styles } from "./styles"

export default memo(UsuarioListView)
function UsuarioListView({ usuario }) {
    const navigation = useNavigation()

    function ImagemUsuario() {
        if (usuario.avatar != null)
            return (
                <Image
                    style={styles.userImage}
                    source={{ uri: 'data:image/jpeg;base64,' + usuario.avatar }}>
                </Image>
            )
        return (
            <View style={[styles.userImageTemplate, { alignContent: 'center', justifyContent: 'center' }]} >
                <AntDesign name="user" size={20} color="#FFFFFF" />
            </View>
        )
    }
    
    return (
        <TouchableOpacity style={[styles.containerHorizontal, { marginBottom: 5 }]}
            onPress={() => {
                navigation.navigate({
                    name: 'Adicionar usuario',
                    params: { usuario: usuario }
                })
            }}
        >
            <TouchableOpacity activeOpacity={0.9} style={styles.botao}
            >
                <ImagemUsuario />
            </TouchableOpacity>
            <LinearGradient
                colors={['#45B9B9', '#9BD1E8']}
                style={styles.gradientBox}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Text style={styles.nomeusuario}>
                    {usuario.nome}
                </Text>
            </LinearGradient>
            <TouchableOpacity activeOpacity={0.9} style={styles.botao}
            >
                <AntDesign name="message1" size={20} color="#FFFFFF" />
            </TouchableOpacity>
        </TouchableOpacity>

    )
}

