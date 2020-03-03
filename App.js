import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as firebase from 'firebase';
import React, { useState, useReducer } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import ApiKeys from './constants/ApiKeys';
import AppNavigator from './navigation/AppNavigator';
import MainTabNavigator from './navigation/MainTabNavigator';
import { Provider } from 'react-redux';
import { store } from './redux/app-redux';

export default class App extends React.Component { 

  constructor(props) {
    console.ignoredYellowBox = ['Remote debugger'];
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticated: false,
      isAuthenticationReady: false
    }
    if(!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
      axios.defaults.baseURL =
      'https://europe-west1-socialape-d081e.cloudfunctions.net/api';
      //axios.defaults.headers.common['Authorization'] = token;
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  };
 
  onAuthStateChanged = (user) => {
    this.setState({isAuthenticationReady: true});
    this.setState({isAuthenticated: !!user});
  }
  
    //firebase.auth().onAuthStateChanged({onAuthStateChanged});
  render() {
    if ( (!this.state.isLoadingComplete || !this.state.isAuthenticationReady) && !this.props.skipLoadingScreen) {
      
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.statehandleLoadingError}
          onFinish={this. handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            { this.state.isAuthenticated ? <MainTabNavigator />: <AppNavigator /> }   
          </View> 
        </Provider>
      );
    }   
  }
  handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
  }
  
  handleFinishLoading = (setLoadingComplete) => {
    this.setState({ isLoadingComplete: true });
  }
  loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in TestScreen.js. Feel free to
        // remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});