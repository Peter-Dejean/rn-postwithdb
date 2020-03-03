import React, { Component } from 'react';
import { StyleSheet, Button, Text, TextInput, View } from 'react-native';

export default class ForgotPasswordSCreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };

    }

    onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert("Password reset email has been sent.");
            }, (error) => {
                Alert.alert(error.message);
            });
    }
    onBackToLoginPress = () => {
        var navActions = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({routeName: "Login"})
            ]
        });
        this.props.navigation.dispatch(navActions);        
    };
 
    render() {
        return (
            <View  style={{paddingTop:50, alignItems:"center"}}>
                <Text>Forgot Password</Text>
                <TextInput style={{width:200, height:35, borderWidth:1}} 
                    value={this.state.email} 
                    onChange={(text) => {this.setState({email: text}) }}/>
            
                <Button title="Reset Password" onPress={this.onResetPasswordPress} /> 
                <Button title="Back to Login..." onPress={this.onBackToLoginPress} />
            </View>
        );
    }
}

const style = StyleSheet.create({

});

