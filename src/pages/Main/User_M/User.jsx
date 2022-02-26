import React from "react"
import Memory_utils from "../../../utils/Memory_utils"
import {req_role_show} from "../../../api/index"
export default class User extends React.Component{
    state = {
        user_management:false
    }
    get_role = async() => {
        const user = (Memory_utils.user.username).replace(/\"/g, "")
        const response = await req_role_show(user,"","user_role")
        if (response.data.resCode === 0){
            var user_role = response.data.responseDatas
            this.setState({
                user_management:user_role[0].user_management
            })
        }
    }
    UNSAFE_componentWillMount(){
        this.get_role()
    }
    render(){
        if(this.state.user_management === true){
            return(
            <div style={{"fontSize":"20px"}}>
                In development. . . .
                Managers can monitor the information and activity of all APP users
            </div>
            )
        }
        else{
            return(
                <div style={{"fontSize":"20px"}}>
                Please log in with an administrator account, otherwise you will not be able to obtain this permission
                </div>
                )
        }

    }
}