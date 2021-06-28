import React, { useEffect,  useState } from "react";
import { View, Animated, Button, StyleSheet, Image, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Imgfile from "../assets/images/ImageForNews_26919_15786618897301054.png.webp";

const Slide = ({navigation}) => {
  const [fade] = useState(new Animated.Value(0))
  const [flag, setFlag] = useState(false)

  const fadeInAnimation = Animated.timing(
    fade, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }
  );
  const fadeOutAnimation = Animated.timing(
    fade, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }
  );
  const runAnimation = () => {
    Animated.sequence([
      fadeInAnimation,
      Animated.delay(1000),
      fadeOutAnimation
    ]).start(() => {
      setFlag(!flag)
    })
  }

  useEffect(() => {
    runAnimation()
  }, [flag])

  return(
    <View style={styles.eachView}>
      <View style={styles.eachView}>
        <Animated.View style={{
          opacity: fade,
        }}
        >
          <Image source={Imgfile} />
        </Animated.View>
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
