import React, { useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const Home = ({navigation}) => {
  const isPressed = () => {
    navigation.navigate('Slide')
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.viewOne}>
        <Text style={styles.textView}>
          FlickrAlbumApp
        </Text>
      </View>
      <View style={styles.viewTwo}>
        <Button title="시작"
                onPress={isPressed}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  viewOne: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  viewTwo: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  textView: {
    marginTop: 100,
    fontWeight: "bold",
    fontSize: 35,
    fontStyle: "italic"
  }
})

export default Home
