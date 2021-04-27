import axios from 'axios'
import {showError} from '../global'
const success = res => res
const err = err => {
    if (401 === err.response.status) {
        showError('Sessão expirada!')
        setTimeout(() => {
            window.location = '/'
        }, 1000);
    } else {
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, err)