import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView,
    Platform,
    PermissionsAndroid,
    Dimensions,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView
} from "react-native";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import { connect } from "react-redux";
import * as secret from "../../sensitive.json";
import countrySelectActions from "../Actions/countrySelectActions";
import  { Convert, Styles } from "../styles";
import SvgImage from "react-native-svg-image"
import propTypes from "prop-types"

const { height, width } = Dimensions.get("window");

class UnconnectedHome extends Component {
    static propTypes = {
        country: propTypes.object,
    };


    async componentWillMount(){
        console.log(this.props, "home props")
        const { dispatch } = this.props

        // get data from fixer io

        let data = await axios.get(`http://data.fixer.io/api/latest?access_key=${secret.apiKey}`);
        if (Platform.OS === "ios"){
            for (key in data.data.rates) {
                // attach flag url to rates object
                try {
                    let flag = await axios.get(`https://restcountries.eu/rest/v2/currency/${key}`);
                    let send = Object.assign({}, { currency: data.data.rates[key], flag: flag.data[0].flag })
                    data.data.rates[key] = send
                }
                catch (err) {
                    continue
                }
            }
        }
       

        dispatch(countrySelectActions.setBaseCurrency(data.data.base));
        dispatch(countrySelectActions.setRates(data.data.rates));
    }


    renderFlatListItem = item => {
       //console.log("item: ", item);
        if (!item){
            return null
        }

        // get the flags for currencies that contain flags
        let flag = item[1].flag || null;
        let currency = item[1].currency || item[1];

        let icon = () => {
            if (flag && Platform.OS === "ios") {
                return (
                    <View style={{flexDirection: "row", alignItems: "center", flex:1 }}>
                        <View style={{ flex:0.8}}>
                            <SvgImage
                                source={{ uri: flag }}
                                style={{
                                    width: Convert(30),
                                    marginTop: Convert(10),
                                    marginLeft: Convert(5),
                                }}
                            />
                        </View>
                        <View style = {{flex:3}}>
                            <Text style={{ marginLeft: Convert(18), height: 20, width: 35 }}>
                                {item[0]}
                            </Text>
                        </View>
                    </View>  
                )     
            } else {
                return (
                    <View style= {{flex: 1}}>
                        <Text style={{ left: Convert(42) }}>
                            {item[0]}
                        </Text>
                    </View>
                    
                )
            }
            
        }
        

        return (
            <View style={[Styles.scroll, Styles.flatListItem]}>
                <View style={{flex:1}}>
                <TouchableOpacity style={{ flexDirection: "row", flex: 1, alignItems: "center" }} onPress={() => Actions.Converter(
                        { country: item[0], rate: currency, flag: flag }
                    )}>
                    {icon()}
                    <View style={{flex:1.5}}></View>
                    <Text style={{ flex: 1 }}>
                    {Math.round(currency * 100) / 100}
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const { rates, baseCurrency } = this.props.country
        const data = Object.entries(rates)
        return (
            <View style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: "cornflowerblue", alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity onPress={()=> {Actions.CountrySelect()}}>
                        <View style={{ height: 40, width: 80, backgroundColor: "white", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Image
                                source={require("../photos/euro.png")}
                                style={{
                                    width: Convert(20),
                                    height: Convert(20),
                                    marginRight: 3
                                }}
                            />
                            <Text>{baseCurrency}</Text>

                        </View>
                    </TouchableOpacity>
                
                </View>
                <View style={{ flex: 8, backgroundColor: "white" }}>
                    <FlatList
                        style={Styles.flatList}
                        data={data}
                        renderItem={({ item }) => this.renderFlatListItem(item)}
                    />
                </View>
            </View>
        )
    }
}


const Home = connect(state => ({
    country: state.country
}))(UnconnectedHome);

export default Home ;
