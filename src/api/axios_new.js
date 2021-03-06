import axios from "axios"
export default function axios_new(url,data={},method="GET"){
    return new Promise((resolve,reject) => {
        let promise
        if(method === "GET"){
            promise = axios.get(url,{params:data})
        }else{
            promise = axios.post(url,data)
        }
        promise.then(response => {
            resolve(response)   
        }).catch(error => {
            alert("404 error")
        })
    })
}