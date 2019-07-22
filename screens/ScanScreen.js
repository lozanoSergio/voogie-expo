import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native";
import { Text } from 'react-native-ui-kitten';
import * as Permissions from "expo-permissions";
import firebase from "firebase";
import BottomSheet from "reanimated-bottom-sheet";
import { BarCodeScanner } from "expo-barcode-scanner";

const { width, height } = Dimensions.get("window");
const scannerSize = width * 0.7;

const list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President"
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman"
  }
];

export default class ScanScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    hasCameraPermission: null,
    scanned: false,
    dataScanned: null,
    product: null
  };

  bs = React.createRef();

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  resetScan = () => {
    bs.current.snapTo(0);
    setState({ scanned: false });
  };

  onHeaderPress = () => {
    console.log("Tapped");
  };

  render() {
    const { hasCameraPermission, scanned, product } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    renderInner = () => {
      if (product !== null) {
        return (
          <View style={styles.panel}>
            <Text category="h5">
              {product ? product.name : "Producto no encontrado"}
            </Text>
          </View>
        );
      } else {
        return (
          <View style={styles.panel}>
            <ActivityIndicator size="large" />
          </View>
        );
      }
    };

    renderHeader = () => (
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
    );

    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={
            Platform.OS === "ios"
              ? StyleSheet.absoluteFillObject
              : styles.wrapperForAndroid
          }
        />
        <View style={styles.imageContainer}>
          <Image
            style={styles.qr}
            source={require("../assets/images/scan_border.png")}
          />
        </View>
        <BottomSheet
          ref={this.bs}
          snapPoints={[0, "25%", "100%"]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
        />
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    if (this.state.dataScanned !== data) {
      this.setState({ scanned: true });
      var ref = firebase.database().ref(`products/${data}`);
      ref.once(
        "value",
        snapshot => {
          if (snapshot.exists()) {
            this.setState({ product: snapshot.val(), dataScanned: data });
            this.bs.current.snapTo(1);
          }
        },
        error => {
          console.log(error);
        }
      );

      console.log(data);
    }
    setTimeout(
      function() {
        this.setState({ scanned: false });
      }.bind(this),
      1000
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  wrapperForAndroid: {
    width: width * 1.3,
    height: height * 1.3,
    marginBottom: "-25%"
  },
  imageContainer: {
    position: "absolute",
    justifyContent: "center",
    bottom: height / 3
  },
  qr: {},
  panelContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    maxWidth: width
  },
  panel: {
    height: "100%",
    padding: 20,
    backgroundColor: "#fff"
  },
  header: {
    backgroundColor: "#fff",
    shadowColor: "#000000",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  panelHeader: {
    alignItems: "center"
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10
  },
  panelTitle: {
    fontSize: 27,
    height: 35
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#318bfb",
    alignItems: "center",
    marginVertical: 10
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white"
  },
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey"
  }
});
