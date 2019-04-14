//import liraries
import React, { Component } from 'react';
import {createAppContainer,createStackNavigator,createDrawerNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import LiveStatus from './views/LiveStatus';
import PnrStatus from './views/PnrStatus';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import {Font, AppLoading, } from 'expo';
import {StatusBar} from 'react-native';
import {Ionicons} from '@expo/vector-icons/'
import TrainBetweenStations from './views/TrainBetweenStations'
import Cancelled from './views/Cancelled'
import {Alert} from 'react-native'

//api key is 6ad501m3ga

// create a component
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isReady:false
    }
  }
  async componentWillMount() {
    await Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isReady: true })
}
  render() {
    if(this.state.isReady){
    return (
      <MyRootContainer />
    );
    }
    else{
      return(<AppLoading/>)
    }
  }
}

const AppTopTabNavigator = createMaterialTopTabNavigator({
  LiveStatus:LiveStatus,
  PnrStatus:PnrStatus,
  BtwStations:TrainBetweenStations,
  Cancelled:Cancelled
},{
  navigationOptions:({ navigation })=>({
    header:<Header backgroundColor="0E6BA8" style={{backgroundColor:'#0E6BA8'}}>
    <StatusBar backgroundColor="#0E6BA8"/>
    <Left>
      <Button transparent>
        <Ionicons name='md-train' size={32} color="#fff"/>
      </Button>
    </Left>
    <Body>
      <Title style={{color:'#fff'}}>Train Enquiry</Title>
    </Body>
    <Right>
      <Button transparent onPress={(e)=>{Alert.alert("Thank You for loving Us!!")}}>
        <Icon name='heart' style={{color:'#fff'}}/>
      </Button>
      <Button transparent onPress={(e)=>{navigation.toggleDrawer()}}>
        <Icon name='menu' style={{color:'#fff'}}/>
      </Button>
    </Right>
  </Header>,
  }),
  tabBarOptions:{
    allowFontScaling:true,
    style:{backgroundColor:"#0B4E7B"},
    scrollEnabled:true
  }
})
const AppStackNavigator = createStackNavigator({
  Tabs:{
    screen:AppTopTabNavigator
  },
})
const AppDrawerNavigator = createDrawerNavigator({
  Home:AppStackNavigator
},{
  drawerPosition:'right',
  drawerType:'slide'
})

const MyRootContainer = createAppContainer(AppDrawerNavigator)

//make this component available to the app
export default App;
