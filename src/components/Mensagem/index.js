
import { Image, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"

export default function Mensagem({ mensagem, contato, usuario }) {
    //console.log(mensagem)
    
    function ImagemUsuario() {
        if (mensagem.from.id == usuario.id)
            return (
                <Image
                    style={styles.userImage}
                    source={{ uri: 'data:image/jpeg;base64,' + usuario.avatar }}>
                </Image>
            )
        else return (
            <Image
                style={styles.userImage}
                source={{ uri: 'data:image/jpeg;base64,' + contato.avatar }}>
            </Image>
        )
    }

    function MensagemUsuario() {
        return (
            <>
                <View style={[styles.mensagemContainer, {alignItems: 'flex-end'}]}>
                    
                    <Text numberOfLines={0} style={[styles.textoMensagem, {flexWrap:'wrap'}]}>
                        {mensagem.mensagem}
                    </Text>
                    
                    <HoraMensagem textAlign = {'right'}/>
                </View>
                <TouchableOpacity activeOpacity={0.9} style={[styles.userImage, { borderWidth: 0, marginRight: '2%' }]}>
                    <ImagemUsuario avatar={usuario.avatar} />
                </TouchableOpacity>
            </>
        )
    }

    function MensagemContato() {
        return (
            <>
            
            <TouchableOpacity activeOpacity={0.9} style={[styles.userImage, { borderWidth: 0, marginRight: '2%' }]}>
                <ImagemUsuario avatar={contato.avatar} />
            </TouchableOpacity>
            <View style={[styles.mensagemContainer]}>
                    <Text style={[styles.textoMensagem, {flexWrap:'wrap'}]}>
                        {mensagem.mensagem}
                    </Text>
                    <HoraMensagem textAlign = {'left'}  />
                </View></>
        )
    }
    function HoraMensagem(textAlign ) {
        return (
            <Text style={[styles.horaMsg, textAlign, {marginTop: 7}]}>
                {new Date(mensagem.dataHora).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })}
            </Text>
        )
    }

    return (

        <TouchableOpacity style={[styles.containerHorizontal,
        { justifyContent: mensagem.from.id == usuario.id ? "flex-end" : "flex-start" }]}
        >
            {mensagem.from.id == usuario.id ? <MensagemUsuario /> : <MensagemContato />}
        </TouchableOpacity>

    )
}

