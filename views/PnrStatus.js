//import liraries
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Dimensions, Alert, StyleSheet, RefreshControl } from 'react-native';
import { TextInput, Title, Button, DataTable } from 'react-native-paper'
import { Container, Content, DatePicker } from 'native-base';
import { Ionicons } from '@expo/vector-icons/'
import Helper, { apiKey, pnrStatusUrl } from '../helper/Helper';

// create a component
class PnrStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pnrNumber: null,
            getPnrStatusUrl: pnrStatusUrl,
            pnrStatusResponse: {},
            pnrStatusResponseFetched: false,
            showActivity: false,
            refreshing: false
        }
    }
    _onRefresh = () => {
        this.setState(
            { refreshing: true },
            () => {
                this.getPnrStatus();
                this.setState({ refreshing: false })
            }
        );
    }

    clearDeatils = () => {
        this.setState({
            pnrStatusResponse: {},
            pnrStatusResponseFetched: false,
            pnrNumber: '',
        })
    }
    getPnrStatus = () => {
        if (this.state.pnrNumber === null) {
            Alert.alert("Please enter the PNR Number to continue...")
        }
        else {
            this.toggleActivity();
            let res = Helper(this.state.getPnrStatusUrl + apiKey + '/PNRNumber/' + this.state.pnrNumber + '/Route/1/');
            res.then((
                res => {
                    console.log(res)
                    this.toggleActivity();
                    if (res.ResponseCode === '200') {
                        this.setState({
                            pnrStatusResponse: res,
                            pnrStatusResponseFetched: true
                        })

                    }
                    else {
                        Alert.alert(res.Status)

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
                    <View style={{ paddingLeft: 10 }}>
                        <Title>
                            Please enter PNR Number to search:
                        </Title>
                    </View>
                    <View style={{ padding: 10 }}>
                        <TextInput
                            label='PNR Number'
                            keyboardType='number-pad'
                            value={this.state.pnrNumber}
                            onChangeText={text => this.setState({ pnrNumber: text })}
                            selectionColor="#0E6BA8"
                            underlineColor="#0E6BA8"
                        />
                        <View style={{ paddingTop: 30 }}>
                            <Button icon="train" mode="contained" onPress={() => this.getPnrStatus()} style={{ backgroundColor: '#0E6BA8' }}>
                                Get PNR Status
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
                        this.state.pnrStatusResponseFetched ? (
                            <View style={{ padding: 10 }}>
                                <View style={{ paddingTop: 30 }}>
                                    <Title>Train Details -</Title>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: 'bold' }}>Train Number: </Text>
                                        <Text>{this.state.pnrStatusResponse.TrianNumber}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: 'bold' }}>PnrNumber: </Text>
                                        <Text>{this.state.pnrStatusResponse.PnrNumber}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: 'bold' }}>Train Name: </Text>
                                        <Text>{this.state.pnrStatusResponse.TrainName}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: 'bold' }}>Journey Date: </Text>
                                        <Text>{this.state.pnrStatusResponse.JourneyDate}</Text>
                                    </View>
                                    <View style={{ marginTop: 20 }}>
                                        <Text style={{ fontWeight: 'bold' }}>{this.state.liveStatusResponse.CurrentStation.StationName}</Text>
                                        <DataTable>
                                            <DataTable.Header>
                                                <DataTable.Title>Booking Status</DataTable.Title>
                                                <DataTable.Title>Current Status</DataTable.Title>
                                            </DataTable.Header>
                                            {
                                                this.state.pnrStatusResponse.Passangers.map((value, key) => {
                                                    return (
                                                        <DataTable.Row>
                                                            <DataTable.Cell>{value.BookingStatus}</DataTable.Cell>
                                                            <DataTable.Cell>{value.CurrentStatus}</DataTable.Cell>
                                                        </DataTable.Row>
                                                    )
                                                })
                                            }
                                        </DataTable>
                                    </View>
                                </View>
                            </View>
                        ) : (
                                <View></View>
                            )
                    }
                </Content>
                {
                        this.state.showActivity ? (
                            <View style={[styles.container, styles.horizontal]}>
                                <ActivityIndicator size="large" color="#0E6BA8" style={{marginBottom: 30,}}/>
                            </View>
                        ) :
                            (
                                <View></View>
                            )
                    }
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
export default PnrStatus;
