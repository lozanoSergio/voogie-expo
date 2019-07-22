import React from "react";
import { SplashScreen, AppLoading } from "expo";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";

import LoadingAnimationComponent from "./loadingAnimation";

export class ApplicationLoader extends React.Component {
  constructor(props) {
    super(props);
    SplashScreen.preventAutoHide();
  }

  state = {
    loaded: false
  };

  onLoadSuccess = () => {
    this.setState({ loaded: true });
    SplashScreen.hide();
  };

  onLoadError = error => {
    //console.warn(error);
  };

  loadResources = () => {
    return this.loadResourcesAsync(this.props.assets);
  };

  loadFonts = fonts => {
    return Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free to
        // remove this if you are not using it in your app
        fonts
      })
  };

  loadImages = images => {
    const tasks = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(tasks);
  };

  loadResourcesAsync = assets => {
    const { fonts, images } = assets;
    return Promise.all([
        this.loadFonts(fonts),
        this.loadImages(images),
      ]);
  }

  renderLoading = () => (
    <AppLoading
      startAsync={this.loadResources}
      onFinish={this.onLoadSuccess}
      onError={this.onLoadError}
      autoHideSplash={false}
    />
  );

  render() {
    return (
      <React.Fragment>
        {this.state.loaded ? this.props.children : this.renderLoading()}
        <LoadingAnimationComponent isLoaded={this.state.loaded} />
      </React.Fragment>
    );
  }
}
