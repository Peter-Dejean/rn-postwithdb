import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import {TestComponent} from '../components';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { setFavoriteAnimal, watchPersonData } from './../redux/app-redux'; 

const mapStateToProps = (state) => {
  return {
    favoriteAnimal: state.favoriteAnimal,
    personData: state.personData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
    setFavoriteAnimal: (text) => { dispatch(setFavoriteAnimal(text)) }, 
    watchPersonData: () => { dispatch(watchPersonData()) },
  }
}

class TestScreen extends React.Component {
  static navigationOptions = {
      header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      favoriteAnimal: this.props.favoriteAnimal,
    }
    //this.props.watchPersonData();
  }
  onSignoutPress = () => {
    firebase.auth().signOut();
  }
  onSetFavoritePetPress = () => {
    this.props.setFavoriteAnimal(this.state.favoriteAnimal);
  }

  render() {
    return (
      <View style={{paddingTop:20}} >
        <Text style={styles.tabBarInfoText}>
          Built by Becca's Dad, Your favorite pet goes here:
        </Text>
        <Text>{this.props.favoriteAnimal}</Text>
        <TextInput style={{borderWidth:1, width:200, height:40}}
                   value={ this.state.favoriteAnimal }
                   onChangeText={(text) =>{ this.setState({favoriteAnimal: text}) }}/>
        <TestComponent />
        <View  style={{paddingTop:50, alignItems:"center"}}>
          <View style={StyleSheet.btnContainer}>
            <View style={{marginBottom: 1}}>
              <Button title="Update Favorite Pet" onPress={this.onSetFavoritePetPress}/>
            </View>
            <Button title="Signout" onPress={this.onSignoutPress}/>
          </View>
        </View>
        <Text>{this.props.personData.firstName}</Text>
        <Text>{this.props.personData.lastName}</Text>
        <Text>{this.props.personData.team}</Text>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestScreen);

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',    
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
}
});
