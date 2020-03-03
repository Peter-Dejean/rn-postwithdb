import React, { Component } from 'react'
import { TouchableOpacity, Text } from 'react-native';
class Button extends Component {
    render () {
        let {onPress, title, style, titleStyle} = this.props;
        return (
           
            <TouchableOpacity
                onPress={onPress}
                style={style}>                
                <Text style={titleStyle}>{title}</Text>               
            </TouchableOpacity>           
        )
    }
}

export default Button