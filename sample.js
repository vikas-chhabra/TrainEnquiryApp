import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import { Constants, } from 'expo'
import { FontAwesome } from '@expo/vector-icons';

const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get('window');

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      getActiveScreen:false
    }
    this.position=new Animated.ValueXY()
    this.positionAbout = new Animated.ValueXY

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onStartShouldSetPanResponder: (evt, gestureState)=>{true},
      onPanResponderMove:(evt, gestureState)=>{
        this.setState({
          getActiveScreen:true
        })
        this.position.setValue({x:gestureState.dx,y:gestureState.dy})
      },
      onPanResponderRelease:(evt, gestureState)=>{
        if(gestureState.dy < 0){
          Animated.spring(this.position.y,{
            toValue: -HEIGHT/1.55,
            tension:1
        }).start()
      }
      else{
        Animated.spring(this.position.y,{
          toValue: HEIGHT/1.55,
          tension:1
      }).start()
      }
      },
      onPanResponderGrant:()=>{
        this.position.extractOffset();
      }
    })
    this._panResponderAbout = PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onStartShouldSetPanResponder: (evt, gestureState)=>{true},
      onPanResponderMove:(evt, gestureState)=>{
        this.setState({
          getActiveScreen:false
        })
        this.positionAbout.setValue({x:gestureState.dx,y:gestureState.dy})
      },
      onPanResponderRelease:(evt, gestureState)=>{
        if(gestureState.dy < 0){
          Animated.spring(this.positionAbout.y,{
            toValue: -HEIGHT/1.24,
            tension:1
        }).start()
      }
      else{
        Animated.spring(this.positionAbout.y,{
          toValue: HEIGHT/1.24,
          tension:1
      }).start()
      }
      },
      onPanResponderGrant:()=>{
        this.positionAbout.extractOffset();
      }
    })
  }
  render() {
    const decreaseTopOfFirstView = this.position.y.interpolate({
      inputRange:[-(HEIGHT/1.55-20),0],
      outputRange:[HEIGHT-HEIGHT/1.12,HEIGHT/1.55],
      extrapolate:'clamp'
    })
    const decreaseTopOfFirstViewAbout = this.positionAbout.y.interpolate({
      inputRange:[-(HEIGHT/1.24-20),0],
      outputRange:[HEIGHT-HEIGHT/1.12,HEIGHT / 1.24],
      extrapolate:'clamp'
    })
    const decreaseTopOfImage = this.position.y.interpolate({
      inputRange:[-(HEIGHT/1.55-20),0],
      outputRange:[-200,0],
      extrapolate:'clamp'
    })
    const decreaseTopOfImageAbout = this.positionAbout.y.interpolate({
      inputRange:[-(HEIGHT/1.24-20),0],
      outputRange:[-200,0],
      extrapolate:'clamp'
    })
    const decreaseImageSize = this.position.y.interpolate({
      inputRange:[-(HEIGHT/1.55-20),0],
      outputRange:[65,150],
      extrapolate:'clamp'
    })
    const decreaseImageSizeAbout = this.positionAbout.y.interpolate({
      inputRange:[-(HEIGHT/1.24-20),0],
      outputRange:[65,150],
      extrapolate:'clamp'
    })
    return (
      // overall container starts here
      <View style={styles.container}>
        <View style={{ height: HEIGHT, backgroundColor: 'transparent', position: 'absolute', width: WIDTH }}>
          <View style={{ height: HEIGHT / 1.55, backgroundColor: 'transparent', width: WIDTH, justifyContent: 'center', alignItems: 'stretch' }}>
            <View style={styles.statusBar}></View>
            <View style={{ flex: 1, backgroundColor: 'trasnparent', alignItems: 'flex-end', justifyContent: 'center' }}>
              <View style={{ flex: 1, backgroundColor: 'transparent', width: 35, justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesome name="ellipsis-v" size={35} color="#000" />
              </View>
            </View>
            <View style={{ flex: 6, backgroundColor:'transparent', justifyContent: 'center', alignItems: "center" }}>
              <Animated.View style={{ backgroundColor: 'transparent', borderRadius: this.state.getActiveScreen?(decreaseImageSize):(decreaseImageSizeAbout), padding: 13, height: this.state.getActiveScreen?(decreaseImageSize):(decreaseImageSizeAbout), width: this.state.getActiveScreen?(decreaseImageSize):(decreaseImageSizeAbout), alignItems: 'center', justifyContent: 'center' ,top:this.state.getActiveScreen?(decreaseTopOfImage):(decreaseTopOfImageAbout)}}><Animated.Image source={require('./assets/images/me.jpg')} style={{ height: this.state.getActiveScreen?(decreaseImageSize):(decreaseImageSizeAbout), width: this.state.getActiveScreen?(decreaseImageSize):(decreaseImageSizeAbout), borderRadius: this.state.getActiveScreen?(decreaseImageSize):(decreaseImageSizeAbout), }} /></Animated.View>
              <View style={{ backgroundColor: 'transparent', padding: 13 }}><Text style={{fontSize:20}}>Vikas Chhabra</Text></View>
              <View style={{ backgroundColor: 'transparent', flexDirection:'row', padding: 13, paddingTop:0 }}>
                <FontAwesome name="wechat" size={20} color="#000" />
                <Text style={{paddingLeft:7}}>Message</Text>
              </View>
            </View>
          </View>
        </View>
        <Animated.View {...this._panResponder.panHandlers} style={[{ height: HEIGHT, backgroundColor: '#abc', position: 'absolute', width: WIDTH, top: decreaseTopOfFirstView, borderTopLeftRadius: 30, borderTopRightRadius: 30, left:0 }]}></Animated.View>
        <Animated.View {...this._panResponderAbout.panHandlers} style={{ height: HEIGHT, backgroundColor: '#000', position: 'absolute', width: WIDTH, top: decreaseTopOfFirstViewAbout, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}></Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  statusBar: {
    backgroundColor: "#fff",
    height: Constants.statusBarHeight - 14,
  },
});
