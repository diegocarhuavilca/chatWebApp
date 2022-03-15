import axios from 'axios'
import { UserRequest,UserLoginResponse,ErrorApi } from './APITypes'

const api = axios.create({
    baseURL:'http://localhost:3000',
    timeout:1000
})


export const APIEndpoints = {
    api:{
        user:{
            async login(body:UserRequest):Promise<UserLoginResponse | ErrorApi> {
                return await api.post('/login',body)
            },
            async register(body:UserRequest):Promise<ErrorApi>{
                return await api.post('/register',body)
            }
        }
    }
}