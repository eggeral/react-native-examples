import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';


export function QrCodeButton(props) {

    return <TouchableOpacity
        onPress={props.onPress}>
        <Icon name="qrcode" size={25} color="gray" />
    </TouchableOpacity >

}

export function CameraButton(props) {

    return <TouchableOpacity
        onPress={props.onPress}>
        <Icon name="camera" size={25} color="gray" />
    </TouchableOpacity >

}