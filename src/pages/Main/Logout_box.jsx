import React from "react"
import { withRouter } from "react-router-dom"
import Storage_utils from "../../utils/Storage_utils"
import Memory_utils from "../../utils/Memory_utils"
class Alert_box extends React.Component{
    log_out = ()=>{
        Storage_utils.removeUser()
        Memory_utils.user={}
        this.props.history.push("/login")
    }
    render(){
        const {current_location} = this.props
        return(
            <div>
                <a href="#" style={{"float":"right","margin":"10px"}} data-toggle="modal" data-target=".bs-example-modal-lg">Log out</a>
                <div className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" style={{"display":"none"}}>
                    <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content" style={{"margin":"auto","width":"60%"}}>
                        <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true"><font style={{"verticalAlign": "inherit"}}><font style={{"verticalAlign": "inherit"}}>×</font></font></span></button>
                        <h4 className="modal-title" id="myLargeModalLabel"><font style={{"verticalAlign":"inherit"}}>Do you want to log out？</font></h4>
                        </div>
                        <div className="modal-body">
                            <div style={{"marginLeft":"70%"}}>
                                <button className="btn btn-primary" type="button"><a onClick={this.log_out} style={{"color":"white"}} href="/login">Confirm</a></button>
                                &nbsp;&nbsp;
                                <a href={current_location}>Cancel</a>
                            </div>

                        </div>
                    </div>
                    </div>
                </div>
            </div>
            
        )
    }
}
export default withRouter(Alert_box)