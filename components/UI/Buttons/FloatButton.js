import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Icon from '../Icons/Icon';

export default class FloatButton extends Component {
  render() {
    const { action } = this.props;
    return (
      <View style={styles.FloatingButtonStyle}>
        <Icon
          raised
          reverse
          onPress={action}
          {...this.props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    FloatingButtonStyle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: 15,
    bottom: 15
  }
});
