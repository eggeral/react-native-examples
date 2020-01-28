import React, { Component } from 'react';
import { Button } from 'react-native';


export function QrCodeButton(props) {

    return <Button
        title="QrCodeButton"
        accessibilityLabel="qrCodeButton"
        onPress={props.onPress}>
    </Button >

}

export function CameraButton(props) {

    return <Button
        title="CameraButton"
        accessibilityLabel="cameraButton"
        onPress={props.onPress}>
    </Button >

}
