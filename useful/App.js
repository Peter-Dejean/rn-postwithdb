import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Button from './components/button';
import AppleHealthKit from 'rn-apple-healthkit';

const add_day_todate = (dt, no_of_days) => {
  return new Date(dt.setMonth(dt.getDay() + no_of_days));      
};
export default class App extends Component {  
  
  handleLoadData = () => {
    console.log('Let us retrieve and load heart data.') 
   alert('Get it done!');
   let rates = [];
   let options = {
    unit: 'bpm',										// optional; default 'bpm'
    //endDate: (new Date()).toISOString(),	
    //startDate: add_day_todate(new Date(),-1),		// required
    endDate: (new Date()).toISOString(),	
    startDate: add_day_todate(endDate,-1),		// required
    			// optional; default now
    ascending: false,									// optional; default false
    limit:10,											// optional; default no limit  
};
   AppleHealthKit.getHeartRateSamples(options, (err, results) => {
    if (err) {
      console.log('',);
      alert(` Unable to get any data from kit? ${err}` )
      return [];
    }
    console.log(' ?',)
    alert(`  Bueller? ${results}` )
    rates = results;
  });
   alert(`  What? ${typeof(rates)}` )
   alert(`  How? ${rates}` )
   //alert(`  Where? ${rates()}` )
  }; 

  render() {
    return (
      <View style={styles.container}>
        <Text style={{flex:1, justifyContent: 'flex-end'}}>Open up App.js to start working on your app!</Text>
        <View style={{flex:1, alignItems: 'center',justifyContent: 'center'}}>
          <Button                        
                            onPress={this.handleLoadData}
                            style={styles.buttons}
                            title='Load Heart Data' 
                            titleStyle={styles.titleStyle}
                            />
        </View>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0380E',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.height    
  },
  buttons: {       
    borderWidth:1,
    borderColor:'#FFFFFF',        
    borderRadius: 6,
    width: '49%',
    height: '25%',
    flex: 1,
   
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:10,  
  },
titleStyle: {
    fontFamily: 'Roboto',
    color:'#FFFFFF',
    fontSize: 12,
},
});
