import React from "react"
import {withRouter,Link} from 'react-router-dom'
import Memory_utils from "../../../../utils/Memory_utils"
import {req_commodity} from "../../../../api/index"
class Item extends React.Component{
    change_state = async (event)=>{
        event.preventDefault()
        const name = this.props.item_detail.name
        const user = (Memory_utils.user.username).replace(/\"/g, "")
        // if(event.target.parentNode.innerText === "on saleChange"){
        var params = {
            current_state:event.target.parentNode.innerText,
            name:name
        }
        const response = await req_commodity(user,params,"change_state")
        // if (response.data.resCode === 0){
        //     const load_data = this.props.load_data
        //     load_data()
        // }   
        // }
    }
    delete_commodity = async() =>{
        const name = this.props.item_detail.name
        const user = (Memory_utils.user.username).replace(/\"/g, "")
        var params = name
        const response = await req_commodity(user,params,"delete")
        if (response.data.resCode === 0){
            console.log(response.data.resCode)
        }
    }
    render(){
        const {name,description,price,state} = this.props.item_detail
        return(
            <tbody>
                <tr>
                <th scope="row">{name}</th>
                <td>{description}</td>
                <td>{price}</td>
                <td>{state}<button onClickCapture={this.change_state}>Change</button></td>
                <td><Link to={{pathname:"/product/commodity/detail",state:{commodity_name:name}}}>Detail</Link></td>
                <td onClick={this.delete_commodity}><a href="#">Delete</a></td>
                </tr>
            </tbody>
        )
    }
}
export default withRouter(Item);