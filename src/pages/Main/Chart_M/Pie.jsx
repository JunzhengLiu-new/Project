import React from "react"
import Memory_utils from "../../../utils/Memory_utils"
import {req_role_show} from "../../../api/index"
export default class Pie extends React.Component{
    state = {
        chart_management:false
    }
    get_role = async() => {
        const user = (Memory_utils.user.username).replace(/\"/g, "")
        const response = await req_role_show(user,"","user_role")
        if (response.data.resCode === 0){
            var user_role = response.data.responseDatas
            this.setState({
                chart_management:user_role[0].chart
            })
        }
    }
    UNSAFE_componentWillMount(){
        this.get_role()
    }
    render(){
        if(this.state.chart_management === true){
            return(
                <div style={{"fontSize":"20px"}}>
                    In development. . . .
                    Detailed statistics on the user's product inventory and sales are displayed here.
                </div>
            )
        }
        else{
            return(            
                <div style={{"fontSize":"20px"}}>
                Admin authorization is required to enable product-related functions
                </div>
                )
        }

    }
}