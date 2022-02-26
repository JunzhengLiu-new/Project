import React from "react"
import { req_login } from "../../api"
import Memory_untils from "../../utils/Memory_utils"
import {withRouter,Redirect} from 'react-router-dom';
import Storage_utils from "../../utils/Storage_utils"
class Login_form extends React.Component{
    login_data = async (event)=>{
        const {username,password} = this
        event.preventDefault()
        const response = await req_login(username.value,password.value)
        if (response.data.resCode === 0){
            Memory_untils.user = {username:username.value}
            Storage_utils.saveUser(username.value)
            this.props.history.replace("/")      
        }  
        alert(response.data.responseText)
    }
    render(){
        const user = Memory_untils.user
        if (!user){
            return <Redirect to="/login"/>
        }
        return(
            <div>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
                        <div className="col-sm-10">
                        <input ref={u => this.username=u} type="email" className="form-control" id="inputEmail3" placeholder="Email"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
                        <div className="col-sm-10">
                            <input ref={p => this.password=p} type="password" className="form-control" id="inputPassword3" placeholder="Password"/>
                        </div>
                    </div>                    
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                        <div className="checkbox">
                            <label>
                            <input type="checkbox"/> Remember me
                            </label>
                            <a style={{float:"right"}} href="http://localhost:3000/register">no account?</a>
                        </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                        <button onClick={this.login_data} type="submit" className="btn btn-default">Sign in</button>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                        
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default withRouter(Login_form);