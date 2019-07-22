import "./utils/fixtimerbug";

import React from "react";
import { mapping } from "@eva-design/eva";
import { ApplicationProvider } from "react-native-ui-kitten";
import { trackScreenTransition } from "./core/utils/analytics";
import { getCurrentStateName } from "./core/navigation/util";
import { ApplicationLoader } from "./core/appLoader/applicationLoader";
import { DynamicStatusBar } from "./components/common/DynamicStatusBar";
import { ThemeContext, themes, ThemeStore } from "./core/themes";

import AppNavigator from "./navigation/AppNavigator";

import * as firebase from "firebase";
import { firebaseConfig } from "./firebase";
firebase.initializeApp(firebaseConfig);

const fonts = {
  "opensans-semibold": require("./assets/fonts/opensans-semibold.ttf"),
  "opensans-bold": require("./assets/fonts/opensans-bold.ttf"),
  "opensans-extrabold": require("./assets/fonts/opensans-extra-bold.ttf"),
  "opensans-light": require("./assets/fonts/opensans-light.ttf"),
  "opensans-regular": require("./assets/fonts/opensans-regular.ttf"),
  "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
};

const images = [
  require("./assets/images/robot-dev.png"),
  require("./assets/images/robot-prod.png"),
  require("./assets/images/airport-photo.jpg"),
  require("./assets/images/map-bg.jpg")
];

const assets = {
  images: images,
  fonts: fonts
};

export default class App extends React.Component {
  state = {
    theme: "Eva Light"
  };

  onSwitchTheme = theme => {
    ThemeStore.setTheme(theme).then(() => {
      this.setState({ theme });
    });
  };
  render() {
    const contextValue = {
      currentTheme: this.state.theme,
      toggleTheme: this.onSwitchTheme
    };
    return (
      <ApplicationLoader assets={assets}>
        <ThemeContext.Provider value={contextValue}>
          <ApplicationProvider
            mapping={mapping}
            theme={themes[this.state.theme]}
          >
            <DynamicStatusBar currentTheme={this.state.theme} />
            <AppNavigator />
          </ApplicationProvider>
        </ThemeContext.Provider>
      </ApplicationLoader>
    );
  }
}
