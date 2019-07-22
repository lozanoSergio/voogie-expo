import React from "react";
import {
  View,
  StatusBar,
  ViewProps,
  StatusBarStyle,
  Platform
} from "react-native";
import {
  ThemedComponentProps,
  ThemeType,
  withStyles
} from "react-native-ui-kitten";
import Constants from "expo-constants";


class DynamicStatusBarComponent extends React.Component {
  getStatusBarContent = () => {
    if (this.props.currentTheme === "Eva Light") {
      return "dark-content";
    } else {
      return "light-content";
    }
  };

  render() {
    const { themedStyle } = this.props;
    
    const androidStatusBarBgColor = themedStyle.container.backgroundColor;
    const barStyle = this.getStatusBarContent();
    console.log(themedStyle.container.backgroundColor)
    return (
      <View style={themedStyle.container}>
        <StatusBar
          backgroundColor={androidStatusBarBgColor}
          barStyle={barStyle}
        />
      </View>
    );
  }
}

export const DynamicStatusBar = withStyles(
  DynamicStatusBarComponent,
  theme => ({
    container: {
      backgroundColor: theme["background-basic-color-1"],
      height: Platform.select({
        ios: Constants.statusBarHeight,
        android: 0
      })
    }
  })
);
