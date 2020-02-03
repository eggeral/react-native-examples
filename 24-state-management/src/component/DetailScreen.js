import React, { Component } from 'react';
import {
    Button,
    StyleSheet,
    TextInput,
    View
} from 'react-native';

export default class DetailScreen extends Component {

    state = { vehicle: {} }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('vehicle', { vin: 'Default vin' }).vin,
        };
    };

    componentDidMount() {
        const vehicle = this.props.navigation.getParam('vehicle');
        this.setState({ vehicle })
    }

    updateVehicle(vehicle) {
        this.setState({vehicle})
        this.props.navigation.setParams({vehicle}) 
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.vehicle.vin}
                    onChangeText={(text) => this.updateVehicle({ ...this.state.vehicle, vin: text })}
                ></TextInput>
                <TextInput
                    value={this.state.vehicle.brand}
                    onChangeText={(text) => this.updateVehicle({ ...this.state.vehicle, brand: text })}
                ></TextInput>
                <TextInput
                    value={this.state.vehicle.color}
                    onChangeText={(text) => this.updateVehicle({ ...this.state.vehicle, color: text })}
                ></TextInput>

                <Button
                    title="Update"
                    onPress={() => {
                        this.props.navigation.getParam('onChangeVehicle')(this.state.vehicle);
                        this.props.navigation.goBack();
                    }}
                ></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 48,
    }
});