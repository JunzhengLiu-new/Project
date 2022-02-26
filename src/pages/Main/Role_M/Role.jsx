import React from "react"
import Item from "./Item"
import {withRouter} from 'react-router-dom'
import Memory_utils from "../../../utils/Memory_utils"
import {req_role_show} from "../../../api/index"
class Role extends React.Component{
    state = {
        role_datas:[],
        role_management:false
    }
    get_role = async() => {
        const user = (Memory_utils.user.username).replace(/\"/g, "")
        const response = await req_role_show(user,"","user_role")
        if (response.data.resCode === 0){
            var user_role = response.data.responseDatas
            this.setState({
                role_management:user_role[0].role_management
            })
        }
    }
    UNSAFE_componentWillMount(){
        this.get_role()
        this.load_role_data()
    }
    load_role_data = async () => {
        const user = (Memory_utils.user.username).replace(/\"/g, "")
        const response = await req_role_show(user,"","")
        if (response.data.resCode === 0){
            var role_datas = response.data.responseDatas
            this.setState({
                role_datas:role_datas.role_data})
        }

    }
    render(){
        if(this.state.role_management === true){
            return(
                <div style={{"margin":"auto","height":"560px","width":"96%"}}>
                <div style={{"margin":"auto","height":"100%","width":"96%"}}>
                    <div style={{"margin":"0px auto","width":"98%"}} className="row pre-scrollable">
                        <table style={{"margin":"auto"}} id="item_list" className="table">
                            <thead>
                                <tr>
                                    <th className="col-lg-3 col-md-3 col-sm-3 col-xs-3">User Name</th>
                                    <th className="col-lg-3 col-md-3 col-sm-3 col-xs-3">Product</th>
                                    <th className="col-lg-3 col-md-3 col-sm-3 col-xs-3">Chart</th>
                                    <th className="col-lg-3 col-md-3 col-sm-3 col-xs-3">Operation</th>
                                </tr>   
                            </thead>
                            {this.state.role_datas.map((item,index) => <Item load_role_data={this.load_role_data} item={item} key={index}/>)}
                        </table>
                    </div> 
                </div>
            </div>)
        }
        else{
            return(
                <div>
                Please log in with an administrator account, otherwise you will not be able to obtain this permission
                </div>
                )
        }
    }
}
export default withRouter(Role);