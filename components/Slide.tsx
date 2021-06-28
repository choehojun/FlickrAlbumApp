import React, { useEffect,  useState } from "react";
import { View, Animated, Button, StyleSheet, Image, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Imgfile from "../assets/images/ImageForNews_26919_15786618897301054.png.webp";

const Slide = ({navigation}) => {

  return(
    <View style={styles.eachView}>
      <View style={styles.eachView}>
        <Image source={Imgfile} />
      </View>
      <View style={styles.eachView}>
        <Button title="시작 화면으로"
                onPress={() => navigation.navigate('Home')}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eachView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewTwo: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  }
})

export default Slide
