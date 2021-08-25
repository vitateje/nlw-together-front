import { http } from './config'

export default {

    listar:() => {
        return http.get('users')
    },

    salvar:(user) => {
        return http.post('users', user)
    },

    atualizar:(user) => {
        return http.put(`users/${user.id}`, user)
    },

    apagar:(user) => {
        return http.delete(`users/${user.id}`, {data: user})
    }
}
