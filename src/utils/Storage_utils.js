//Tool module for local data storage management
import store from 'store'
const USER_KEY = "user_key"
export default{
    saveUser(user){
        store.set(USER_KEY,JSON.stringify(user))
    },
    getUser(){
        return store.get(USER_KEY) || {}
    },
    removeUser(){
        store.remove(USER_KEY)
    }
}