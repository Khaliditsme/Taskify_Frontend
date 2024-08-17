import {toast} from 'react-toastify'

 const Notify = (message,type)=>{
    toast[type](message)
}

const API_url = "http://localhost:8080";
export {API_url, Notify} 