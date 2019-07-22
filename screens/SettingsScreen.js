import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import firebase from 'firebase';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "app.json"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>SettingsScreen</Text>
        <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
