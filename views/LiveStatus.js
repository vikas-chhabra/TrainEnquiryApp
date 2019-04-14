//import liraries
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Dimensions, Alert, StyleSheet, RefreshControl } from 'react-native';
import { TextInput, Title, Button, DataTable } from 'react-native-paper'
import { Container, Content, DatePicker } from 'native-base';
import { Ionicons } from '@expo/vector-icons/'
import Helper, { apiKey } from '../helper/Helper';

// create a component
class LiveStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainNumber: null,
            chosenDate: new Date(),
            dateToSend: new Date(),
            getLiveStatusUrl: 'livetrainstatus/apikey/',
            liveStatusResponse: {},
            liveStatusResponseFetched: false,
            showActivity: false,
            refreshing:false
        }
    }
    _onRefresh = () => {
        this.setState(
            {refreshing: true},
            ()=>{
                this.getLiveStatus();
                this.setState({refreshing:false})
            }
            );
      }
    setChosenDate = () => {
        let newDate = new Date();
        let newerDate = newDate.toString().slice(8, 10);
        let newerYear = newDate.toString().slice(11, 15)
        let newerMonth = newDate.toString().slice(4, 7)
        if (newerMonth === 'Jan') {
            newerMonth = '01'
        }
        else if (newerMonth === 'Feb') {
            newerMonth = '02'
        }
        else if (newerMonth === 'Mar') {
            newerMonth = '03'
        } else if (newerMonth === 'Apr') {
            newerMonth = '04'
        } else if (newerMonth === 'May') {
            newerMonth = '05'
        } else if (newerMonth === 'Jun') {
            newerMonth = '06'
        } else if (newerMonth === 'Jul') {
            newerMonth = '07'
        } else if (newerMonth === 'Aug') {
            newerMonth = '08'
        } else if (newerMonth === 'Sep') {
            newerMonth = '09'
        } else if (newerMonth === 'Oct') {
            newerMonth = '10'
        } else if (newerMonth === 'Nov') {
            newerMonth = '11'
        }
        else if (newerMonth === 'Dec') {
            newerMonth = '12'
        }
        this.setState({ chosenDate: newDate.toString().substr(4, 12), dateToSend: newerYear + newerMonth + newerDate });
    }
    setDate = (newDate) => {
        let newerDate = newDate.toString().slice(8, 10);
        let newerYear = newDate.toString().slice(11, 15)
        let newerMonth = newDate.toString().slice(4, 7)
        if (newerMonth === 'Jan') {
            newerMonth = '01'
        }
        else if (newerMonth === 'Feb') {
            newerMonth = '02'
        }
        else if (newerMonth === 'Mar') {
            newerMonth = '03'
        } else if (newerMonth === 'Apr') {
            newerMonth = '04'
        } else if (newerMonth === 'May') {
            newerMonth = '05'
        } else if (newerMonth === 'Jun') {
            newerMonth = '06'
        } else if (newerMonth === 'Jul') {
            newerMonth = '07'
        } else if (newerMonth === 'Aug') {
            newerMonth = '08'
        } else if (newerMonth === 'Sep') {
            newerMonth = '09'
        } else if (newerMonth === 'Oct') {
            newerMonth = '10'
        } else if (newerMonth === 'Nov') {
            newerMonth = '11'
        }
        else if (newerMonth === 'Dec') {
            newerMonth = '12'
        }
        this.setState({ chosenDate: newDate.toString().substr(4, 12), dateToSend: newerYear + newerMonth + newerDate });
    }
    clearDeatils = () => {
        this.setState({
            liveStatusResponse: {},
            liveStatusResponseFetched: false,
            trainNumber: '',
            dateToSend: new Date(),
            chosenDate: new Date(),
            stationCode: ''
        })
        this.setChosenDate()
    }
    getLiveStatus = () => {
        if (this.state.trainNumber === null) {
            Alert.alert("Please enter the train Number to continue...")
        }
        else {
            this.toggleActivity();
            let res = Helper(this.state.getLiveStatusUrl + apiKey + '/trainnumber/' + this.state.trainNumber + '/date/' + this.state.dateToSend);
            res.then((
                res => {
                    this.toggleActivity();
                    if (res.ResponseCode === '200') {
                        this.setState({
                            liveStatusResponse: res,
                            liveStatusResponseFetched: true
                        })

                    }
                    else {
                        Alert.alert(res.Message)

                    }
                }
            ))
        }
    }
    toggleActivity = () => {
        this.setState({
            showActivity: !this.state.showActivity
        })
    }
    componentWillMount() {
        this.setChosenDate();
    }
    render() {
        return (
            <Container>
                <Content
                    refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                        />
                      }
                >
                    
                    {
                        this.state.showActivity ? (
                            <View style={[styles.container, styles.horizontal]}>
                                <ActivityIndicator size="large" color="#0E6BA8" />
                            </View>
                        ) :
                            (
                                <View />
                            )
                    }
                    <View style={{ paddingLeft: 10 }}>
                        <Title>
                            Please enter Your details:
                        </Title>
                    </View>
                    <View style={{ padding: 10 }}>
                        <TextInput
                            label='Train Number'
                            keyboardType='number-pad'
                            value={this.state.trainNumber}
                            onChangeText={text => this.setState({ trainNumber: text })}
                            selectionColor="#0E6BA8"
                            underlineColor="#0E6BA8"
                        />
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                                <Ionicons name='md-calendar' size={32} color="#000" />
                                <DatePicker
                                    defaultDate={new Date(2019, 4, 4)}
                                    minimumDate={new Date(2019, 1, 1)}
                                    maximumDate={new Date(2019, 12, 31)}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"slide"}
                                    androidMode={"default"}
                                    placeHolderText="Select date"
                                    textStyle={{ color: "#0E6BA8" }}
                                    placeHolderTextStyle={{ color: "#0B4E7B" }}
                                    onDateChange={this.setDate}
                                    disabled={false}
                                />
                            </View>
                            <Text>
                                Date: {this.state.chosenDate.toString()}
                            </Text>
                        </View>
                        <View style={{ paddingTop: 30 }}>
                            <Button icon="train" mode="contained" onPress={() => this.getLiveStatus()} style={{ backgroundColor: '#0E6BA8' }}>
                                Get Live Status
                        </Button>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <Button icon="clear-all" mode="contained" onPress={() => this.clearDeatils()} style={{ backgroundColor: '#0E6BA8', }}>
                                Reset Details
                        </Button>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#000', height: 1, width: Dimensions.get("window").width, marginTop: 10 }} />

                    {
                        this.state.liveStatusResponseFetched ? (
                            <View style={{ padding: 10 }}>
                                <View style={{ paddingTop: 30 }}>
                                    <Title>Train Details -</Title>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: 'bold' }}>Number: </Text>
                                        <Text>{this.state.liveStatusResponse.TrianNumber}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: 'bold' }}>Start Date: </Text>
                                        <Text>{this.state.liveStatusResponse.StartDate}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: 'bold' }}>Position: </Text>
                                        <View style={{ flex: 1, flexWrap: 'wrap' }}>
                                            <Text>{this.state.liveStatusResponse.CurrentStation.StationName}, {this.state.liveStatusResponse.CurrentStation.StationCode}</Text>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 20 }}>
                                        <Text style={{ fontWeight: 'bold' }}>{this.state.liveStatusResponse.CurrentStation.StationName}</Text>
                                        <DataTable>
                                            <DataTable.Header>
                                                <DataTable.Title>Sch Arr</DataTable.Title>
                                                <DataTable.Title>Sch Dep</DataTable.Title>
                                                <DataTable.Title>Act Arr</DataTable.Title>
                                                <DataTable.Title>Act Dep</DataTable.Title>
                                                <DataTable.Title numeric>Late</DataTable.Title>
                                            </DataTable.Header>
                                            <DataTable.Row>
                                                <DataTable.Cell>{this.state.liveStatusResponse.CurrentStation.ScheduleArrival}</DataTable.Cell>
                                                <DataTable.Cell>{this.state.liveStatusResponse.CurrentStation.ScheduleDeparture}</DataTable.Cell>
                                                <DataTable.Cell>{this.state.liveStatusResponse.CurrentStation.ActualArrival}</DataTable.Cell>
                                                <DataTable.Cell>{this.state.liveStatusResponse.CurrentStation.ActualDeparture}</DataTable.Cell>
                                                <DataTable.Cell numeric>{this.state.liveStatusResponse.CurrentStation.DelayInArrival}</DataTable.Cell>
                                            </DataTable.Row>
                                        </DataTable>
                                    </View>
                                </View>
                            </View>
                        ) : (
                                <View></View>
                            )
                    }
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        alignSelf: 'center',
        height:Dimensions.get('window').height,
        zIndex:1000,
        width:Dimensions.get('window').width,
        backgroundColor:'rgba(0,0,0,0.4)'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})


//make this component available to the app
export default LiveStatus;
