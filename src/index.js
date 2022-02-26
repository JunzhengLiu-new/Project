//entrance js
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import Memory_utils from "./utils/Memory_utils"   
import Storage_utils from "./utils/Storage_utils"
const user = Storage_utils.getUser()//Open the page and sandwich the local data in the middle
Memory_utils.user = {username:user}
ReactDOM.render(<App/>,document.getElementById("root"))