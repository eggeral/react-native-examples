import React, { Component } from 'react';
import { Button, TextInput, StyleSheet, View } from 'react-native';

export default class AddItem extends Component {

    state = { itemName: '' } // itemName is internal to AddItem so we keep this state here!

    render() {
        return <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={this.state.itemName}
                placeholder="Add item"
                onChangeText={newText => this.setState({ itemName: newText })}
            />
            <Button
                style={styles.button}
                onPress={() => {
                    if (this.state.itemName.trim()) {
                        this.props.onAdd({ name: this.state.itemName });
                    }
                    this.setState({itemName: ''});
                }}
                title="Add"
            />
        </View>
    }

}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        height: 36
    },

    input: {
        borderWidth: 0.5,
        borderColor: 'lightgrey',
        padding: 5,
        fontSize: 28,
        flex: 1
    },

    button: {
        width: 50
    }
});

