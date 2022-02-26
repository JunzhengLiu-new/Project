import React from "react"
import Item from "./Item"
import Memory_utils from "../../../../utils/Memory_utils"
import {req_commodity,req_role_show} from "../../../../api/index"
import {Link, withRouter} from 'react-router-dom'
class Commodity extends React.Component{
    search_ref = React.createRef()
    state = {
        commodity:[],
        commodity_stable:[],
        product_management:false
    }
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
    load_data = async () => {
        const user = (Memory_utils.user.username).replace(/\"/g, "")
        const response = await req_commodity(user,"","")
        if (response.data.resCode === 0){
            var datas = response.data.responseData.commodity
            this.setState({
                commodity:datas,
                commodity_stable:datas})
        }
    }
    commodity_item = () => {
        var commodity_list = []
        for(let index in this.state.commodity){
            commodity_list.push(<Item item_detail={this.state.commodity[index]} load_data={this.load_data} key={index}/>)
        }
        return commodity_list
    }
    search_item = () => {
        this.setState({
            commodity:this.state.commodity_stable
        },function(){
            var commodity = []
            for(let index in this.state.commodity){
                if(this.state.commodity[index].name.indexOf(this.search_ref.current.value) != -1){
                    commodity.push(this.state.commodity[index])
                }
            }
            console.log(commodity)
            this.setState({
                commodity:commodity
            })
        })
    }
    UNSAFE_componentWillMount(){
        this.get_role()
        this.load_data()
    }
    render(){
        if(this.state.product_management === true){
            return(
                <div style={{"margin":"auto","height":"560px","width":"96%"}}>
                    <div style={{"margin":"auto","height":"100%","width":"96%"}}>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <div className="input-group">
                                <div className="input-group-btn">
                                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Search by name <span className="caret"></span></button>
                                    {/* <ul className="dropdown-menu">
                                    <li><a href="#">Search by price</a></li>
                                    </ul>                  */}
                                </div>
                                <input onChange={this.search_item} ref={this.search_ref} type="text" className="form-control" aria-label="Text input with dropdown button"/>
                                
                            </div>
                        </div>
    
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <Link to={`/product/commodity/addupdate`}>
                                <button style={{"float":"right"}} type="button" className="btn btn-primary"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add</button>
                            </Link>
                        </div>
                        &nbsp;
                        <div style={{"margin":"0px auto","width":"98%"}} className="row pre-scrollable">
                            <table style={{"margin":"auto","textAlign":"center"}} id="item_list" className="table">
                                <thead>
                                    <tr>
                                        <th className="col-lg-2 col-md-2 col-sm-2 col-xs-2">Name</th>
                                        <th className="col-lg-5 col-md-5 col-sm-5 col-xs-5">Description</th>
                                        <th className="col-lg-1 col-md-1 col-sm-1 col-xs-1">Price</th>
                                        <th className="col-lg-2 col-md-2 col-sm-2 col-xs-2">State</th>
                                        <th className="col-lg-1 col-md-1 col-sm-1 col-xs-1">Operation</th>
                                        <th className="col-lg-1 col-md-1 col-sm-1 col-xs-1"></th>
                                    </tr>   
                                </thead>
                            </table>
                        </div>
                        <div style={{"margin":"0px auto","width":"98%"}} className="row pre-scrollable">
                            <table style={{"margin":"auto"}} id="item_list" className="table">
                                <thead>
                                    <tr>
                                        <th className="col-lg-2 col-md-2 col-sm-2 col-xs-2"></th>
                                        <th className="col-lg-5 col-md-5 col-sm-5 col-xs-5"></th>
                                        <th className="col-lg-1 col-md-1 col-sm-1 col-xs-1"></th>
                                        <th className="col-lg-2 col-md-2 col-sm-2 col-xs-2"></th>
                                        <th className="col-lg-1 col-md-1 col-sm-1 col-xs-1"></th>
                                        <th className="col-lg-1 col-md-1 col-sm-1 col-xs-1"></th>
                                    </tr>
                                </thead>   
                               {this.commodity_item()}
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
export default withRouter(Commodity);