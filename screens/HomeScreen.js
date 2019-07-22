import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Layout, Text } from 'react-native-ui-kitten';

import FloatButton from "../components/UI/Buttons/FloatButton";

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  clickHandler = () => {
    //function to handle click on floating Action Button
    this.props.navigation.push('ScanScreen');
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.props.navigation.push('TestScreen')}>Test Screen</Button>
        <FloatButton name="cube-scan" type="material-community" action={this.clickHandler} />
      </View>
    );
  }
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
