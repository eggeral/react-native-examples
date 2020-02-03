import React, { Component } from 'react';
import { Text, SafeAreaView, Button } from 'react-native';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.log("getDerivedStateFromError", error);
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log("componentDidCatch", error, errorInfo);
    }

    render() {

        console.log('ErrorBoundary rendering', this.state.hasError);
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <SafeAreaView>
                <Text>Something went wrong.</Text>
                <Button title="Retry" onPress={() => this.setState({ hasError: false })}></Button>
            </SafeAreaView>;
        }

        return this.props.children;
    }
}