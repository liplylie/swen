import React, { Component } from "react";
import {
    View,
    Text,
    Platform,
    PermissionsAndroid,
    Dimensions,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView
} from "react-native";

export default class Converter extends Component {
    // static propTypes = {
    //     selectCountry: propTypes.object,
    // };
    componentWillMount(){
        console.log(this.props, "converter props")
    }
    render() {
        return (
            <View>
                <Text>Converter</Text>
            </View>
        );
    }
}
