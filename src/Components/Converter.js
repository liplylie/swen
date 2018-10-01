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
import { connect } from "react-redux";

class UnconnectedConverter extends Component {
    // static propTypes = {
    //     selectCountry: propTypes.object,
    // };
    componentWillMount(){
        console.log(this.props, "converter props")
    }
    render() {
        return (
            <View style={{display: "flex", flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>{this.props.country}</Text>
            </View>
        );
    }
}

const Converter = connect(state => ({
    rate: state.rate
}))(UnconnectedConverter);

export default Converter;
