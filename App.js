import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActionConst, Actions, Router, Scene } from "react-native-router-flux";
import Home from "./src/Components/Home";
import CountrySelect from "./src/Components/CountrySelect";
import Converter from "./src/Components/Converter";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key={"ROOT_SCENE"} panHandlers={null} passProps>
          <Scene
            key={"home"}
            component={Home}
            hideNavBar
            type={ActionConst.RESET}
          />
          <Scene
            key={"CountrySelect"}
            component={CountrySelect}
            hideNavBar
            type={ActionConst.RESET}
          />
          <Scene
            key={"Converter"}
            component={Converter}
            hideNavBar
            type={ActionConst.RESET}
          />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
