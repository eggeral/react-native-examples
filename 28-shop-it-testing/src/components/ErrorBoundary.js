import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import { itemsQuery } from '../state/ItemsQuery';
import { itemsService } from '../state/ItemsService';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: '' };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.log("ErrorBoundary", error, errorInfo);
    }

    componentDidMount() {
        itemsQuery.selectError().subscribe(error => {
            if (error) {
                console.log('ItemsStore has error', error);
                this.setState({ hasError: true, error });
            }
        })
    }

    resetError() {
        this.setState({ hasError: false });
        itemsService.resetError();
    }

    render() {

        if (this.state.hasError) {
            return <SafeAreaView style={styles.container}>
                <Text>Something went wrong.</Text>
                <Text>{'' + this.state.error}</Text>
                <Button title="Retry" onPress={() => this.resetError()}></Button>
            </SafeAreaView>;
        }

        return this.props.children;
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});