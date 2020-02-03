import React, { Component } from 'react';
import {
    Button,
    View
} from 'react-native';
import update from 'immutability-helper';



export default class MasterScreen extends Component {

    state = {
        vehicles: [
            { vin: 'asdf34', brand: 'BMW', color: 'yellow' },
            { vin: 'adf333', brand: 'Audi', color: 'red' },
        ]
    }

    // Options for the navigation
    static navigationOptions = {
        title: 'Vehicles', // Title of this Screen
    };

    render() {
        const buttons = this.state.vehicles.map((vehicle, index) => (
            <Button
                key={vehicle.vin}
                title={vehicle.vin}
                onPress={() => this.props.navigation.navigate('Detail', { // params to pass to the Detail
                    vehicle,
                    onChangeVehicle: newVehicle => {
                        // We have to make sure to create a new array
                        // so React can detect the change!
                        // We use the immutability-helper update method for this
                        // expo install immutability-helper
                        const newVehicles = update(this.state.vehicles, { $merge: { [index]: newVehicle } })
                        console.log('updating', index, newVehicles);
                        this.setState({ vehicles: newVehicles });
                    }
                })}
            />))
        return (
            <View>
                {buttons}
            </View>
        );
    }
}
