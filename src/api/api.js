import axios from 'axios';
export const rootServer = 'http://localhost:8888'
export default {
    getCaptchaKey: () => {
        return axios.get(`${rootServer}/key`)
            .then(res => {
                return res
            })
            .catch(error => {
                return error
            });
    },
    captchaVerify: (key, digits) => {
        return axios.post(`${rootServer}/verify?key=${key}&digits=${digits}`)
            .then(res => {
                return res
            })
            .catch(error => {
                return error
            });
    },
}