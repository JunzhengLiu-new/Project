//root component
import React,{Component} from "react"
import {BrowserRouter,Route,Switch} from "react-router-dom"
import Login from "./pages/Login/Login"
import Main from "./pages/Main//Main"
import Register from "./pages/Register/Register"
class App extends Component{
    render(){
        return(
                <BrowserRouter>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/" component={Main}/>
                    </Switch>
                </BrowserRouter>
        )
    }
}
export default App