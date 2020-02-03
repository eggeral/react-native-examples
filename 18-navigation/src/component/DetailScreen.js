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
        // in general: Never copy props to state. In case of a navigation this is ok!
        const vehicle = this.props.navigation.getParam('vehicle');
        this.setState({ vehicle })
    }

    updateVehicle(vehicle) {
        this.setState({ vehicle })
        this.props.navigation.setParams({ vehicle }) // to update the title
    }


    render() {
        const vehicle = this.props.navigation.getParam('vehicle');
        return (
            <View style={styles.container}>
                <TextInput
                    value={vehicle.vin}
                    onChangeText={(text) => this.updateVehicle({ ...this.state.vehicle, vin: text })}
                ></TextInput>
                <TextInput
                    value={vehicle.brand}
                    onChangeText={(text) => this.updateVehicle({ ...this.state.vehicle, brand: text })}
                ></TextInput>
                <TextInput
                    value={vehicle.color}
                    onChangeText={(text) => this.updateVehicle({ ...this.state.vehicle, color: text })}
                ></TextInput>

                <Button
                    title="Update"
                    onPress={() => {
                        this.props.navigation.getParam('onChangeVehicle')(vehicle);
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