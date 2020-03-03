import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class TestComponent extends Component {
    static navigationOptions = {
		headerStyle: {
			backgroundColor: 'blue'
		}
	}
    render() {
        return (
            <View>
                <Text> Just check to see if we echo pet back correctly </Text>
            </View>
        )
    }
}
