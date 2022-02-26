import React from "react"
import { req_register } from "../../api"
import {withRouter} from 'react-router-dom';

class Register extends React.Component{
	state={
        username:"",
        password:"",
		re_password:"",
        user_prompt:"",
        password_prompt:"",
		re_password_prompt:"",
		agree:false
    }
	saveuser_data = (event)=>{
        if (event.target.id === "email"){
            this.setState({
                username:event.target.value
            },function(){
                if(!(/^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/).test(this.state.username)){
                    this.setState({user_prompt:"! Email format error"})
                }
                else{
                    this.setState({user_prompt:""})
                }
            })

        }
        else if(event.target.id === "password"){
            this.setState({
                password:event.target.value
            },function(){
                if(!(/^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])).{8,20}$/).test(this.state.password))
                {
                    this.setState({password_prompt:"! Must contain uppercase and lowercase letters, numbers and symbol"})
                    
                }
            else
                {
                    this.setState({password_prompt:""})
                }
            })

        }
		else if(event.target.id === "re_password"){
			this.setState({
                re_password:event.target.value
            },function(){
                if(this.state.password === this.state.re_password)
                {
					this.setState({re_password_prompt:""})
                          
                }
            else
                {
                    this.setState({re_password_prompt:"Password does not match"})
                }
            })
		}
		else{
			console.log(event.target.checked)
			this.setState({
				agree:event.target.checked
			})
		}
    }
	register_data = async (event) => {
		event.preventDefault()
		const {username,password} = this.state
		if(this.state.agree && this.state.user_prompt.length===0 && this.state.password_prompt.length===0 && this.state.re_password_prompt.length===0){
			const response = await req_register(username,password)
			if(response.data.resCode === 0){
				alert(response.data.responseText)
				this.props.history.replace("/login")
			}
			else{
				alert(response.data.responseText)
			}
			
		}
		else{
			alert("Please enter username and password as required")
		}
        
	}

	render(){
		return(
			<div className="my-login-page">
				<section className="h-100">
					<div className="container h-100">
						<div className="row justify-content-md-center h-100">
							<div className="card-wrapper">
								<div className="card fat">
									<div className="card-body">
										<h4 className="card-title">Register</h4>
										<form onChange={this.saveuser_data} className="my-login-validation" noValidate="">
											<div className="form-group">
												<label htmlFor="email">*E-Mail Address</label>
												<input id="email" type="email" className="form-control" name="email" required/>
												<div className="invalid-feedback">
													{this.state.user_prompt}
												</div>
											</div>

											<div className="form-group">
												<label htmlFor="password">*Password</label>
												<input id="password" type="password" className="form-control" name="password" required data-eye/>
												<div className="invalid-feedback">
													{this.state.password_prompt}
												</div>
											</div>
											<div className="form-group">
												<label htmlFor="password">*Repeat Password</label>
												<input id="re_password" type="password" className="form-control" name="password" required data-eye/>
												<div className="invalid-feedback">
													{this.state.re_password_prompt}
												</div>
											</div>
											<div className="form-group">
												<div className="custom-checkbox custom-control">
													<input type="checkbox" name="agree" id="agree" className="custom-control-input" required=""/>
													<label htmlFor="agree" className="custom-control-label">I agree to the <a href="#">Terms and Conditions</a></label>
													<div className="invalid-feedback">
														You must agree with our Terms and Conditions
													</div>
												</div>
											</div>

											<div className="form-group m-0">
												<button onClick={this.register_data} type="submit" className="btn btn-primary btn-block">
													Register
												</button>
											</div>
											<div className="mt-4 text-center">
												Already have an account? <a href="/login">Login</a>
											</div>
										</form>
									</div>
								</div>
								<div className="footer">
									Copyright &copy; 2017 &mdash; Your Company 
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		)
	}
}
export default withRouter(Register);