import React, { Component } from 'react';
import {
    Button,
    View
} from 'react-native';
import { vehiclesService } from '../state/VehiclesService';
import { vehiclesQuery } from '../state/VehiclesQuery';

export default class MasterScreen extends Component {

    state = { vehicles: [] }

    static navigationOptions = {
        title: 'Vehicles'
    };

    componentDidMount() {
        vehiclesQuery.selectAll().subscribe(vehicles => this.setState({ vehicles }))
        vehiclesService.get();
    }

    render() {
        const buttons = this.state.vehicles.map((vehicle) => (
            <Button
                key={vehicle.vin}
                title={vehicle.vin}
                onPress={() => {
                    vehiclesService.setActive(vehicle.vin);
                    this.props.navigation.navigate('Detail', {
                        vehicle,
                        onChangeVehicle: newVehicle => vehiclesService.updateActive(newVehicle)
                    })
                }}
            />
        ))
        return (
            <View>
                {buttons}
                <Button title='Add' onPress={() => vehiclesService.add({ vin: 'new', brand: '', color: '' })}>
                </Button>
            </View>
        );
    }
}
