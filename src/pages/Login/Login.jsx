import React from "react"
import Login_form from "./Login_form"
// login router component
export default class Login extends React.Component{
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1" style={{height:"260px"}}>
                        <img style={{width:"40px",marginTop:"18px"}} src={require("./images/react_img.png")} alt="react_img"/>
                    </div>
                    <div className="col-lg-11 col-md-11 col-sm=11 col-xs-11">
                        <h2>Management System</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm=3 col-xs-3"></div>
                    <div className="col-lg-6 col-md-6 col-sm=6 col-xs-6">
                        <Login_form/>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm=3 col-xs-3"></div>
                </div>
            </div>
        )
    }
}