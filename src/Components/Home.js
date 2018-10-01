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
import  { Convert } from "../styles";
import SvgImage from "react-native-svg-image"

const { height, width } = Dimensions.get("window");

const styles = {
    flatListItem: {
        height: height >= 667 ? height * 0.08 : height * 0.1,
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "gray"
    },
    flatList: {
        // marginVertical: height * 0.01,
        marginVertical: 0
    },
    row: {
        flexDirection: "row"
    },
    scroll: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
}

class UnconnectedHome extends Component {
    // static propTypes = {
    //     selectCountry: propTypes.object,
    // };

    async componentWillMount(){
        console.log(this.props, "home props")
        const { dispatch } = this.props

        // get data from fixer io

        let data = await axios.get(`http://data.fixer.io/api/latest?access_key=${secret.apiKey}`);

        for (key in data.data.rates) {
           // attach flag to rates object
            try {
                let flag = await axios.get(`https://restcountries.eu/rest/v2/currency/${key}`);
                let send = Object.assign({}, { currency: data.data.rates[key], flag: flag.data[0].flag})
                data.data.rates[key] = send
            }
            catch(err){
                continue
            }
           
        }
        
        dispatch(countrySelectActions.setBaseCurrency(data.data.base));
        console.log(data.data.rates, "rates bro")
        dispatch(countrySelectActions.setRates(data.data.rates));
       


    }


    renderFlatListItem = item => {
       console.log("item: ", item);
        if (!item){
            return null
        }

        // get the flags for currencies that contain flags
        let flag = item[1].flag || null;
        let currency = item[1].currency || item[1];

        let icon = () => {
            if (flag) {
                console.log(flag,"flag")
                return (
                    <View style={{flex: 1}}>
                    <SvgImage
                            source={{uri:flag}}
                        style={{
                            width: Convert(30),
                            height: Convert(20),
                            marginTop: Convert(10),
                            marginLeft: Convert(5)

                        }}/>
                        </View>
                )     
            } else {
                return (
                <Text style={{ marginLeft: Convert(5) }}>
                    {item[0]}
                  </Text>
                )
            }
            
        }
        

        return (
        <View style={[styles.scroll, styles.flatListItem]}>
            <View>
              <TouchableOpacity style={{ flexDirection: "row", flex: 1, alignItems: "center" }} onPress={() => Actions.Converter(
                    { country: item[0], rate: currency, flag: flag }
                  )}>
                {icon()}
                <Text style={{ left: flag ? width - 100 : width - 130 }}>
                  {Math.round(currency * 100) / 100}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )
    }

    render() {
        const { rates } = this.props.country
        const data = Object.entries(rates)
        console.log(this.props.country, "country")
        return <View style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: "cornflowerblue", alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={()=> {Actions.CountrySelect()}}>
                    <View style={{ height: 40, width: 80, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                        <Text> Flag </Text>
                    </View>
                </TouchableOpacity>
              
            </View>
            <View style={{ flex: 8, backgroundColor: "white" }}>
                <FlatList
                    style={styles.flatList}
                    data={data}
                    renderItem={({ item }) => this.renderFlatListItem(item)}
                />
            </View>
          </View>;
    }
}


const Home = connect(state => ({
    country: state.country
}))(UnconnectedHome);

export default Home ;
