import AsyncStorage from '@react-native-async-storage/async-storage'


export async function saveListaContatos(listaContatos, userHash) {
    try {
        await AsyncStorage.setItem("user:" + userHash, JSON.stringify({ ultimaBusca: new Date(), contatos: listaContatos }))
        /* console.log(new Date()); */
    }
    catch (error) {
        console.log(error)
    }
}

export async function getConversasSalvas(userHash) {
    try {
        const data = await AsyncStorage.getItem("user:" + userHash);

        return (data != null ? JSON.parse(data) : null)
    } catch (e) {
        console.log(e)
    }
}

export async function validateLogin(login, senha) {
    let loginTrim = login.trim()
    let senhaTrim = senha.trim()
    let hash;
    let usuario;
    return (
        axios.get(`${API_BASE_URL}/user/${loginTrim}/${senhaTrim}`)
            .then(async response => {
                if (response.status === 200) {
                    hash = await getUserHash(response.data.id)
                    usuario = response.data
                    usuario.hash = hash
                    return usuario
                    /* console.log(usuario);
                    console.log({usuario : usuario, hashcode: hash }) */
                }
            })
            .catch(error => {
                console.log(error)
                return (error);
            })
    )
}

export async function saveMessages(listaMensagens, userHash, contatoHash) {
    try {
        AsyncStorage.setItem('msgusers' + userHash + contatoHash, JSON.stringify(listaMensagens))
    }
    catch (e) { console.log(e); }
}

export async function getMessageList(userHash, contatoHash) {
    try {
        const data = await AsyncStorage.getItem('msgusers' + userHash + contatoHash);
        return (data != null ? JSON.parse(data) : null)
    } catch (e) {
        console.log(e)
    }
}
