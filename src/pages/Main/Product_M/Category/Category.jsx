import React from "react"
import Item from "./Item"
import Memory_utils from "../../../../utils/Memory_utils"
import { req_category_show,req_role_show} from "../../../../api/index"
import {withRouter} from 'react-router-dom';
import PubSub from "pubsub-js"
class Category extends React.Component{
    state = {
        category:[],
        category_path:"Primary classification",
        product_management:false
    }
    thead_ref = React.createRef()
    get_role = async() => {
        const user = (Memory_utils.user.username).replace(/\"/g, "")
        const response = await req_role_show(user,"","user_role")
        if (response.data.resCode === 0){
            var user_role = response.data.responseDatas
            this.setState({
                product_management:user_role[0].product
            })
        }
    }
    UNSAFE_componentWillMount(){
        this.get_role()
        this.load_data()
    }
    componentDidMount(){
        PubSub.subscribe("delete_item_name",(msg,data) => {
            var category = this.state.category 
            category.splice(category.length - 1)
            this.setState({category:category})
            return
            })
    }
    reSetData = (dataList,num) => {
        let arr = []
        let len = dataList.length;
        for (let i = 0; i < len; i += num) {
            arr.push(dataList.slice(i, i + num));
        }
        return arr
    }
    load_data = async ()=>{
        const user = (Memory_utils.user.username).replace(/\"/g, "")
        const response = await req_category_show(user,"","")
        if (response.data.resCode === 0){
            var datas = response.data.responseData[0]
            this.setState({
                category:datas.category})
        }
    }
    add_item = () => {
        this.setState({
            category:this.state.category.concat("default")
        })
    }
    find_subitem = async (event) => {
        const sub_category = event.target.parentNode.parentNode.firstElementChild.innerText
        console.log(sub_category)
        const user = (Memory_utils.user.username).replace(/\"/g, "")
        const response = await req_category_show(user,"","")
        if (response.data.resCode === 0){
            var datas = response.data.responseData[0]
            const category_path = `Primary classification -> ${sub_category}` 
                this.setState({
                    category:datas[sub_category],
                    category_path:category_path
                })
        }
        return sub_category

    }
    render(){
        if(this.state.product_management === true){
            return(
                <div style={{"margin":"auto","height":"560px","width":"96%"}}>
                    <div style={{"margin":"auto","height":"100%","width":"96%"}}>
                        <div>
                            <div className="panel-heading" className="col-lg-8 col-md-8 col-sm-8 col-xs-8" style={{"fontSize":"20px","fontWeight":"bold"}}><a href="/product/category">{this.state.category_path}</a></div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 "><button onClick={this.add_item} style={{"float":"right"}} type="button" className="btn btn-primary"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add</button></div>
                        </div>
                        <div style={{"paddingTop":"80px","paddingLeft":"20px"}}>
                            <div style={{"fontSize":"18px","fontWeight":"bold"}} className="col-lg-7 col-md-7 col-sm-7 col-xs-7">Category</div>
                            <div style={{"fontSize":"18px","fontWeight":"bold"}} className="col-lg-5 col-md-5 col-sm-5 col-xs-5">Operation</div>
                        </div>
                        <div style={{"margin":"20px auto","width":"98%"}} className="row pre-scrollable">
                            <table style={{"margin":"auto","height":"100px","width":"96%"}} id="item_list" className="table">
                                <thead ref={this.thead_ref}>
                                <tr>
                                    <th className="col-lg-6 col-md-6 col-sm-6 col-xs-6"></th>
                                    <th className="col-lg-2 col-md-2 col-sm-2 col-xs-2"></th>
                                    <th className="col-lg-2 col-md-2 col-sm-2 col-xs-2"></th>
                                    <th className="col-lg-2 col-md-2 col-sm-2 col-xs-2"></th>
                                </tr>   
                                </thead>
                                {this.state.category.map((item,index) => <Item content_page={this.state.category_path} find_subitem={this.find_subitem} load_data={this.load_data} item={item} key={index}/>)}
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>
                    Admin authorization is required to enable product-related functions
                </div>
            )
        }

    }
}
export default withRouter(Category);