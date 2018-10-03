import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    Platform,
    PermissionsAndroid,
    Dimensions,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { Convert } from "../styles.js";
import axios from "axios";
import * as secret from "../../sensitive.json";

class UnconnectedConverter extends Component {
    constructor(props){
        super(props)
    }
    static propTypes = {
        rate: propTypes.number,
        baseCurrency: propTypes.string
    };

    state = {
        baseAmount: 0.00,
        convertedCurrency: 0.00
    }

    componentWillMount() {
        console.log(this.props, "converter props")
    }

    componentDidMount() {
        this.textInputRef.focus()
    }

    handleConvert(number){
        const { baseCurrency, country, rate } = this.props;
        // api doesn't work for free, need to build own converter
        // let value = await axios.get(`http://data.fixer.io/api/convert?access_key=${secret.apiKey}&from=${baseCurrency}&to=${country}`);
        let value = rate * number
        value = Math.round(value * 100) / 100;
        this.setState({
            convertedCurrency: value, baseAmount: number
        })
    }
    
    render() {
        return (
        <KeyboardAvoidingView style={{ display: "flex", flex: 1, flexDirection: "column", backgroundColor: "cornflowerblue" }}>
            <View style={{ borderStyle: "solid", borderBottomWidth: 1, borderBottomColor: "lightgray", flexDirection: "row", flex: 1, justifyContent: "space-around", alignItems: "center", backgroundColor: "white" }}>
             <TextInput 
                style={{ width: Convert(40), fontSize:Convert(40) }} 
                onChangeText={text => this.handleConvert(text)} 
                value={`${this.state.baseAmount}`} 
                ref={ref => this.textInputRef = ref}
                keyboardType="numeric" 
                defaultValue={"0"}
                returnKeyType="done" 
                blurOnSubmit
                />
              <Text style={{fontSize:Convert(20)}}>{this.props.baseCurrency}</Text>
             
            </View>
            <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-around", alignItems: "center", backgroundColor: "white" }}>
                <Text style={{fontSize:Convert(40)}}>{this.state.convertedCurrency}</Text>
                <Text style={{fontSize:Convert(20)}}>{this.props.country}</Text>
            </View>
            <View style={{ flex: 2, backgroundColor: "cornflowerblue" }} />
          </KeyboardAvoidingView>
        )

    }
}

const Converter = connect(state => ({
    rates: state.country.rates,
    baseCurrency: state.country.baseCurrency

}))(UnconnectedConverter);

export default Converter;
