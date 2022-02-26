import React from "react";
export default class Home extends React.Component{
    render(){
        return(
            <div style={{"fontSize":"20px","height":"750px","width":"96%","margin":"auto"}}>
                <div style={{"fontSize":"20px","backgroundColor":"#FFFFFF","height":"230px","borderColor":"red","borderStyle":"solid"}} className="col-lg-4 col-md-4">In development. . . . For administrators, the number of all users is displayed. 
                for the user,displays the total number of items sold and the total number of inventory</div>
                <div style={{"fontSize":"20px","backgroundColor":"#FFFFFF","height":"230px","borderColor":"red","borderStyle":"solid"}} className="col-lg-8 col-md-8">In development. . . .For administrators, line graph of the number of users
For users, a line graph of the number of items</div>            
                <div style={{"backgroundColor":"#FFFFFF","height":"60px","float":"left","width":"100%","borderColor":"black","borderStyle":"solid"}} className="nav nav-tabs">
                    <li role="presentation" className="active"><a href="#">Home</a></li>
                    <li role="presentation"><a href="#">Profile</a></li>     
                </div>
                <div style={{"backgroundColor":"#FFFFFF","width":"100%","float":"left","height":"370px","borderColor":"red","borderStyle":"solid"}}>
                    <div style={{"fontSize":"20px","height":"230px","borderColor":"red","borderStyle":"solid"}} className="col-lg-7 col-md-7">In development. . . .For admins, pie chart of active users
For users, a pie chart of the proportion of various products</div>
                    <div style={{"fontSize":"20px","height":"230px","borderColor":"red","borderStyle":"solid"}} className="col-lg-5 col-md-5">In development. . . .today's task schedule</div>  
                    Product and Role functions have been developed
                </div>
                
            </div>
        )
    }
}