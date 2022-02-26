import React from "react"
import {withRouter} from 'react-router-dom'
import Memory_utils from "../../../utils/Memory_utils"
import {req_role_show} from "../../../api/index"
class Item extends React.Component{
    product_ref = React.createRef()
    chart_ref = React.createRef()
    username_ref = React.createRef()
    change_user_role = async () => {
        const user = this.username_ref.current.innerText
        const params = {
            product_value:this.product_ref.current.checked,
            chart_value:this.chart_ref.current.checked
        }
        console.log(user)
        const response = await req_role_show(user,params,"change")
        if (response.data.resCode === 0){
            console.log("Change successfully!")
        }
    }
    render(){
        const {username,role} = this.props.item
        const {product,chart} = role[0]
        return(
            <tbody>
                <tr>
                <th ref={this.username_ref} scope="row">{username}</th>
                <td>
                    <input ref={this.product_ref} type="checkbox" id="checkboxSuccess" defaultChecked={product}/>
                </td>
                <td>
                    <input ref={this.chart_ref} type="checkbox" id="checkboxSuccess" defaultChecked={chart}/>
                </td>
                <td><button onClick={this.change_user_role} type="button">Confirm Changes</button></td>
                </tr>
            </tbody>
        )
    }
}
export default withRouter(Item);