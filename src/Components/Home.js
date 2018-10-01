import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Platform,
    PermissionsAndroid,
    Dimensions,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView
} from "react-native";
import { Actions } from "react-native-router-flux";

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
    }
}

export default class Home extends Component {
    // static propTypes = {
    //     selectCountry: propTypes.object,
    // };


    renderFlatListItem = (index, item) => {
        console.log("item: ", item);

        return <View key={index} style={[styles.row, styles.flatListItem]}>
            <View>
              <TouchableOpacity onPress={()=>Actions.Converter({country: item})}>
                <Text>{item}</Text>
              </TouchableOpacity>
            </View>
          </View>;
    }
    render() {
        const data = ["one", "two", "three"]
        return <View style={{ display: "flex", flexDirection: "column", flex: 1, backgroundColor: "red" }}>
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
                    renderItem={({ index, item }) => this.renderFlatListItem(index, item)}
                />
            </View>
          </View>;
    }
}
