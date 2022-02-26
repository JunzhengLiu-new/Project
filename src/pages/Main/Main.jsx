import React from "react"
import Memory_utils from "../../utils/Memory_utils"
import { Redirect,BrowserRouter,Route,Switch,withRouter } from "react-router-dom"
import Home from "./Home/Home"
import Bar from "./Chart_M/Bar"
import Line from "./Chart_M/Line"
import Pie from "./Chart_M/Pie"
import Role from "./Role_M/Role"
import User from "./User_M/User"
import Alert_box from "./Logout_box"
import Current_time from "./Current_time"
import Category from "./Product_M/Category/Category"
import Commodity from "./Product_M/Commodity/Commodity"
import Add_update from "./Product_M/Commodity/Add_update"
import Detail from "./Product_M/Commodity/Detail"
import {req_role_show} from "../../api/index"
// login Main component
class Main extends React.Component{
    submenu_commodity = React.createRef()
    submenu_chart = React.createRef()
	state={
        page_title:""
    } 

    UNSAFE_componentWillMount(){
        this.push_router()
    }
    push_router = (event)=>{
        if (!event){
            var u = this.props.location.pathname
            var urlSlashCount=u.split('/').length
            var t = u.split('/')[urlSlashCount-1].toLowerCase()
            t = t.charAt(0).toUpperCase() + t.slice(1)
            if (t === "Addupdate"){
                this.setState({page_title:"Commodity"})
                return
            }
            else{
                this.setState({page_title:t})
                return
            }

        }
        let url = event.target.innerText
        let title = url
        url = url.charAt(0).toLowerCase() + url.slice(1)
        if(url === "category" || url === "commodity"){
            url = `/product/${url}`
            this.setState({
                page_title:title
            })
        }
        else if(url === "home" || url === "user" || url === "role"){
            url = `/${url}`
            this.setState({
                page_title:title
            })
        }
        else if(url === "bar" || url === "line" || url === "pie"){
            url = `/charts/${url}`
            this.setState({
                page_title:`${title} Chart`
            })
        }
        else{
            url = ""
        }
        if(url != ""){
            this.props.history.push(url)
        }
    }

    show_submenu_commodity = ()=>{
        if(this.submenu_commodity.current.style.display==="none"){
            this.submenu_commodity.current.style.display="block"
        }
        else{
            this.submenu_commodity.current.style.display="none"
            }


    }
    show_submenu_chart = ()=>{
        if(this.submenu_chart.current.style.display==="none"){
            this.submenu_chart.current.style.display="block"
        }
        else{
            this.submenu_chart.current.style.display="none"
            }


    }
    render() {
        const user = Memory_utils.user.username
        if(Object.keys(user).length === 0){
            return <Redirect to="/login"/>
        }
        return (
            <div style={{height:"100%"}}>
                <div onClick={this.push_router} className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    <ul style={{"textAlign":"center"}} className="nav nav-pills nav-stacked">
                        <li role="presentation" style={{"borderRadius":"4px","backgroundColor":"#AAAAAA","color":"white","height":"70px","lineHeight":"70px","fontSize":"20px"}}>Management System</li>
                        <li role="presentation"><a href="#">Home</a></li>
                        <li onClick={this.show_submenu_commodity} role="presentation"><a href="#">Product&nbsp;&nbsp;&gt;</a></li>
                        <div ref={this.submenu_commodity} style={{"display":"none","paddingLeft":"50px"}} role="presentation">
                            <ul style={{"textAlign":"center"}} className="nav nav-pills nav-stacked">
                                <li role="presentation"><a href="#">Category</a></li>
                                <li role="presentation"><a href="#">Commodity</a></li>
                            </ul>
                        </div>
                        <li onClick={this.show_submenu_chart} role="presentation"><a href="#">Chart&nbsp;&nbsp;&gt;</a></li>
                        <div ref={this.submenu_chart} style={{"display":"none","paddingLeft":"50px"}} role="presentation">
                            <ul style={{"textAlign":"center"}} className="nav nav-pills nav-stacked">
                                <li role="presentation"><a href="#">Bar</a></li>
                                <li role="presentation"><a href="#">Line</a></li>
                                <li role="presentation"><a href="#">Pie</a></li>
                            </ul>
                        </div>
                        <li role="presentation"><a href="#">Role</a></li>
                        <li role="presentation"><a href="#">User</a></li>
                    </ul>
                </div>
                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                    <div style={{"width":"100%","float":"right"}}>
                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                            <img style={{width:"40px",marginTop:"5px"}} src={require("../Login/images/react_img.png")} alt="react"/>
                        </div>
                        <Alert_box current_location={this.props.location.pathname}/>
                        <p style={{"float":"right","height":"40px","lineHeight":"40px"}}>Welcome,{user} </p>
                        
                    </div>
                    <div style={{"height":"100px"}}>
                        <div style={{"fontWeight":"bold","paddingLeft":"140px","fontSize":"24px","lineHeight":"30px"    }}>{this.state.page_title}<Current_time/></div>
                    </div>
                    <div style={{"paddingTop":"14px","backgroundColor":"#F5F5F5","width":"100%"}}>
                        <BrowserRouter>
                        <Switch>
                            <Route path="/home" component={Home}/>
                            <Route path="/user" component={User}/>
                            <Route path="/role" component={Role}/>
                            <Route path="/charts/bar" component={Bar}/>
                            <Route path="/charts/line" component={Line}/>
                            <Route path="/charts/pie" component={Pie}/>
                            <Route path="/product/commodity/addupdate" component={Add_update}/>
                            <Route path="/product/commodity/detail" component={Detail}/>
                            <Route path="/product/category" component={Category}/>
                            <Route path="/product/commodity" component={Commodity}/>
                            <Redirect to="/home"/>
                        </Switch>
                        </BrowserRouter> 
                    </div>  
                </div>
                <div>
            </div>
            </div>
            )
    }
}
export default withRouter(Main);