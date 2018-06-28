import Axios from 'axios'

export default {
   createToken(id, password) {
    return Axios.post('/admins/login', {id, password})
   }
}