import React from "react"
import {withRouter} from 'react-router-dom'
import PubSub from "pubsub-js"
import Memory_utils from "../../../../utils/Memory_utils"
import { req_category } from "../../../../api/index"

class Item extends React.Component{
    modify_box = React.createRef()
    modify = async (event) => {
        if (event.target.innerText === "Modify"){
            if(this.modify_box.current.style.display==="none"){
                this.modify_box.current.style={}
            }
            else{
                this.modify_box.current.style.display = "none"
            }
        }
        else{
            const category_value = event.target.parentNode.parentNode.firstElementChild.firstElementChild.value
            const category_name = event.target.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.innerText
            if(category_value.length != (category_value.replace(/\s+/g,"")).length){
                alert("Category cannot contain empty string")
                this.modify_box.current.style.display="none"
                return
            }
            if(!category_value || category_value.replace(/\s+/g,"")==""){
                alert("Please input value")
                this.modify_box.current.style.display="none"
                return
            }
            const {content_page} = this.props
            var sub_category_name = content_page.split(" -> ")
            const params = {
                sub_category_name:sub_category_name,
                category_name:category_name,
                category_value:category_value

            }
            const user = (Memory_utils.user.username).replace(/\"/g, "")
            const response = await req_category(user,params,"modify")
            if (response.data.resCode === 0){
                const {load_data} = this.props
                load_data()
            }
            this.modify_box.current.style.display="none"

            }
    }
    delete_data = async (category_name)=> {
        const user = (Memory_utils.user.username).replace(/\"/g, "")
        const response = await req_category(user,category_name,"delete")
        if (response.data.resCode === 0){
            console.log(typeof response)
            const {load_data} = this.props
            load_data()
        }
    }
    delete_item = (event) => {
        const {content_page} = this.props
        if (content_page == "Primary classification"){
            const category_name = event.target.parentNode.parentNode.firstElementChild.innerText
            if (category_name === "default"){
                PubSub.publish("delete_item_name",category_name)
            }
            else{
                this.delete_data(category_name)
            }
        }
        else{
            var sub_category_name = content_page.split(" -> ")
            const category_name = event.target.parentNode.parentNode.firstElementChild.innerText
            if (category_name === "default"){
                PubSub.publish("delete_item_name",category_name)
            }
            else{
                const category = {
                    category_name:category_name,
                    sub_category_name:sub_category_name
                }
                this.delete_data(category)
            }
        }

    }

    content_page = () => {
        const {content_page,find_subitem,item} = this.props
        if (content_page == "Primary classification" && item != "default"){
            return <td><a href="#" onClick={find_subitem}>View subcategory</a></td>
        }
        else{
            return <td></td>
        }
    }
    render(){
        const {item} = this.props
        return(
            <tbody>
                <tr>
                <th scope="row">{item}</th>
                <td><a href="#" onClick={this.modify}>Modify</a></td>
                {this.content_page()}
                <td><a onClick={this.delete_item} href="/product/category">Delete</a></td>
                </tr>
                <tr style={{"display":"none"}} ref={this.modify_box}>
                <th style={{"color":"red"}} scope="row"><input placeholder="Please enter a category name" style={{"width":"100%"}}/></th>
                <td></td>
                <td></td>
                <td><a onClick={this.modify} style={{"color":"red"}} href="/product/category">Confirm</a></td>
                </tr>
            </tbody>
        )
    }
}
export default withRouter(Item);