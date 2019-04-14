//import liraries
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Dimensions, Alert, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { TextInput, Title, Button, DataTable } from 'react-native-paper'
import { Container, Content, DatePicker } from 'native-base';
import { Ionicons } from '@expo/vector-icons/'
import Helper, { apiKey } from '../helper/Helper';

// create a component
class TrainBetweenStations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceStationCode: '',
            destinationStationCode: '',
            getTrainBetweenStationsUrl: 'TrainBetweenStation/apikey/',
            trainBetweenStationsResponse: {},
            trainBetweenStationsResponsefetched: false,
            showActivity: false,
            refreshing: false
        }
    }
    _onRefresh = () => {
        this.setState(
            { refreshing: true },
            () => {
                this.getTrainBetweenStations();
                this.setState({ refreshing: false })
            }
        );
    }
    clearDeatils = () => {
        this.setState({
            sourceStationCode: '',
            destinationStationCode: '',
            trainBetweenStationsResponsefetched: false
        })
    }
    getTrainBetweenStations = () => {
        if (this.state.sourceStationCode === '' && this.state.destinationStationCode === '') {
            Alert.alert("Please enter the Correct Details")
        }
        else {
            this.toggleActivity();
            let res = Helper(this.state.getTrainBetweenStationsUrl + apiKey + '/From/' + this.state.sourceStationCode + '/to/' + this.state.destinationStationCode);
            res.then((
                res => {
                    console.log('res is ', res)
                    this.toggleActivity();
                    if (res.ResponseCode === '200') {
                        this.setState({
                            trainBetweenStationsResponse: res,
                            trainBetweenStationsResponsefetched: true
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
                            label='Sorce Station Code'
                            value={this.state.sourceStationCode}
                            onChangeText={text => this.setState({ sourceStationCode: text.toUpperCase() })}
                            selectionColor="#0E6BA8"
                            underlineColor="#0E6BA8"
                        />
                        <TextInput
                            label='Destination Station Code'
                            value={this.state.destinationStationCode}
                            onChangeText={text => this.setState({ destinationStationCode: text.toUpperCase() })}
                            selectionColor="#0E6BA8"
                            underlineColor="#0E6BA8"
                            style={{ marginTop: 10 }}
                        />
                        <View style={{ paddingTop: 30 }}>
                            <Button icon="train" mode="contained" onPress={() => this.getTrainBetweenStations()} style={{ backgroundColor: '#0E6BA8' }}>
                                Get Train Between Stations
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
                        this.state.trainBetweenStationsResponsefetched ? (
                            <View style={{ padding: 10 }}>
                                <View style={{ paddingTop: 30 }}>
                                    <Title>Train Details -</Title>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: 'bold' }}>Total Trains: </Text>
                                        <Text>{this.state.trainBetweenStationsResponse.TotalTrains}</Text>
                                    </View>
                                    <View style={{ marginTop: 20 }}>
                                        <Text style={{ fontWeight: 'bold' }}>List of Trains:</Text>
                                        <ScrollView horizontal={true}>
                                            <DataTable>
                                                <DataTable.Header>
                                                    <DataTable.Title>Train No.|</DataTable.Title>
                                                    <DataTable.Title> Train Name|</DataTable.Title>
                                                    <DataTable.Title> Source|</DataTable.Title>
                                                    <DataTable.Title> Arr Time|</DataTable.Title>
                                                    <DataTable.Title > Destination|</DataTable.Title>
                                                    <DataTable.Title > Departure Time|</DataTable.Title>
                                                    <DataTable.Title > Travel Time|</DataTable.Title>
                                                    <DataTable.Title > Train Type|</DataTable.Title>
                                                </DataTable.Header>
                                                {
                                                    this.state.trainBetweenStationsResponse.Trains.map((v, i) => {
                                                        if(i%2===0){
                                                            return (
                                                                <DataTable.Row key={i}>
                                                                    <DataTable.Cell>{v.TrainNo}</DataTable.Cell>
                                                                    <DataTable.Cell>{v.TrainName}</DataTable.Cell>
                                                                    <DataTable.Cell>{v.Source}</DataTable.Cell>
                                                                    <DataTable.Cell>{v.ArrivalTime}</DataTable.Cell>
                                                                    <DataTable.Cell>{v.Destination}</DataTable.Cell>
                                                                    <DataTable.Cell>{v.DepartureTime}</DataTable.Cell>
                                                                    <DataTable.Cell>{v.TravelTime}</DataTable.Cell>
                                                                    <DataTable.Cell>{v.TrainType}</DataTable.Cell>
                                                                </DataTable.Row>
                                                            )
                                                        }
                                                        else{
                                                            return (
                                                                <DataTable.Row key={i} style={{backgroundColor:'rgba(0,0,0,0.2)'}}>
                                                                    <DataTable.Cell>{v.TrainNo}</DataTable.Cell>
                                                                    <DataTable.Cell>{v.TrainName}</DataTable.Cell>
                                                                    <DataTable.Cell>{v.Source}</DataTable.Cell>
                                                                    <DataTable.Cell>{v.ArrivalTime}</DataTable.Cell>
                                                                    <DataTable.Cell>{v.Destination}</DataTable.Cell>
                                                                    <DataTable.Cell>{v.DepartureTime}</DataTable.Cell>
                                                                    <DataTable.Cell>{v.TravelTime}</DataTable.Cell>
                                                                    <DataTable.Cell>{v.TrainType}</DataTable.Cell>
                                                                </DataTable.Row>
                                                            )
                                                        }
                                                    })
                                                }
                                            </DataTable>
                                        </ScrollView>
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
        position: 'absolute',
        alignSelf: 'center',
        height: Dimensions.get('window').height,
        zIndex: 1000,
        width: Dimensions.get('window').width,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})


//make this component available to the app
export default TrainBetweenStations;
