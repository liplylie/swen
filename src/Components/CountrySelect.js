import React, { Component } from "react";
import {
  View, 
  Text,
  FlatList,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Dimensions,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { Convert, Styles } from "../styles";
import SvgImage from "react-native-svg-image"
import propTypes from "prop-types"

class UnconnectedCountrySelect extends Component {
  static propTypes = {
      country: propTypes.object,
  };

  changeBaseCurrency(){
    alert("This feature is not yet supported")
  }

  renderFlatListItem = item => {
    //console.log("item: ", item);
    if (!item) {
      return null
    }

    // get the flags for currencies that contain flags
    let flag = item[1].flag || null;
    let currency = item[1].currency || item[1];

    let icon = () => {
      if (flag) {
        return (
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", flex: 1 }}>
            <View style={{ flex: 0.8 }}>
              <SvgImage
                source={{ uri: flag }}
                style={{
                  width: Convert(30),
                  marginTop: Convert(10),
                  marginLeft: Convert(5)
                }}
              />
            </View>
            <View style={{ flex: 4 }}>
              <Text style={{  height: 20, width: 35 }}>
                {item[0]}
              </Text>
            </View>
          </View>
        )
      } else {
        return (
          <View style={{ flex: 1 }}>
            <Text style={{ left: Convert(68) }}>
              {item[0]}
            </Text>
          </View>

        )
      }
    }

    return (
      <View style={[Styles.scroll, Styles.flatListItem]}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={{ flexDirection: "row", flex: 1, justifyContent: "center", alignItems: "center" }} onPress={() => this.changeBaseCurrency()}>
            {icon()}
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const { rates, baseCurrency } = this.props.country
    const data = Object.entries(rates)
    return (
      <View style={{flex:1}}>
        <View style={{ flex: 8, backgroundColor: "white" }}>
          <FlatList
            style={Styles.flatList}
            data={data}
            renderItem={({ item }) => this.renderFlatListItem(item)}
          />
        </View>
      </View>
    );
  }
}

  const CountrySelect = connect(state => ({
    country: state.country
  }))(UnconnectedCountrySelect);

  export default CountrySelect;