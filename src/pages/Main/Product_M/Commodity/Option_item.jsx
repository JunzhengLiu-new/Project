import React from "react"
import {withRouter} from 'react-router-dom'
class Option_item extends React.Component{
    render(){
        const option_item = this.props.option_item
        return(
            <option>{option_item}</option>
        )
    }
}
export default withRouter(Option_item);