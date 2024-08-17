import {toast} from 'react-toastify'

 const Notify = (message,type)=>{
    toast[type](message)
}

const API_url = "https://taskify-75hz.onrender.com";
export {API_url, Notify} 