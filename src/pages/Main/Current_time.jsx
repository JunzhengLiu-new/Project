import React from "react"
class Current_time extends React.Component{
    state={
        current_time:""
    } 
    UNSAFE_componentWillUpdate(){
        this.real_time()
    }
    componentDidMount(){
        this.real_time()
    }

    UNSAFE_componentWillUnMount = () => {
        clearTimeout(this.timer)
    }
    real_time = ()=>{
        this.timer = setTimeout(()=>{
            this.current_time = new Date().toLocaleTimeString()
            this.setState({
                current_time:this.current_time
            })  
        },1000) 
    }
    render(){
        return(
            <div style={{"float":"right","fontSize":"18px","lineHeight":"30px"}}>{this.state.current_time}</div>
        )
    }
}
export default Current_time