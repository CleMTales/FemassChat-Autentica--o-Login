import axios from 'axios'
import { API_BASE_URL } from '@env'

export function getUserHash(userId) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${API_BASE_URL}/user/${userId}`)
            .then(response => {
                if (response.status === 200) {
                    const hash = response.data;
                    //console.log(hash);
                    resolve(hash);
                } else {
                    reject(new Error('Erro ao obter dados do servidor'));
                }
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
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
                return(error);
            })
    )
}

export function getConversas(login) {
    return (
      axios.get(`${API_BASE_URL}/message/buscarUsuariosComConversa/${login}`)
        .then(response => {
          if (response.status === 200) {
            /* console.log(response); */
            return(response.data);
          } else {
            return ([])
          }
        })
        .catch(error => {
          console.log(error);
          return ([])
        })
    )
  }
  
  export function getUsuariosCadastrados(login){
    return (
        axios.get(`${API_BASE_URL}/message/buscarUsuarios/${login}`)
          .then(response => {
            if (response.status === 200) {
              /* console.log(response); */
              return(response.data);
            } else {
              return ([])
            }
          })
          .catch(error => {
            console.log(error);
            return ([])
          })
      )
  }
  export async function getMensagemEntreUsuarios(usuario, contato){
    return (
        axios.get(`${API_BASE_URL}/message/buscarMensagensComUmUsuario/${contato.id}/${usuario.id}`)
          .then(response => {
            if (response.status === 200) {
              /* console.log(response); */
              return(response.data);
            } else {
              return ([])
            }
          })
          .catch(error => {
            console.log(error);
            return ([])
          })
      )
    
  }

  export async function enviarMensagem(mensagem, usuario, contato){
    if (mensagem) {
        axios.post(`${API_BASE_URL}/message/enviarMensagem`,
            {
                "idFrom": usuario.id,
                "idTo": contato.id,
                "mensagem": mensagem,
            }
        ).catch(error => {
            console.log(error);
        });
    }

  }