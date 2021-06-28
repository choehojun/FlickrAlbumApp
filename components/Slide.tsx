import React, { useEffect,  useState } from "react";
import { View, Animated, Button, StyleSheet, Image, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
//import Imgfile from "../assets/images/ImageForNews_26919_15786618897301054.png.webp";

const Slide = ({navigation}) => {
  const sec = navigation.getParam('sec')
  const [fade] = useState(new Animated.Value(0))
  const [title, setTitle] = useState(String(sec))
  const [seconds, setSeconds] = useState(sec * 1000)
  const [url, setUrl] = useState()
  const [flag, setFlag] = useState(false)
  const [idx, setIdx] = useState(0)

  const isChanged = (val: React.SetStateAction<string>) => {
    const changedTitle = Number(val)
    setSeconds(changedTitle * 1000)
    setTitle(val)
  }

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
      Animated.delay(seconds),
      fadeOutAnimation
    ]).start(() => {
      setIdx(idx + 1)
      setFlag(!flag)
    })
  }

  useEffect(() => {
    if(idx >= 20) {
      setIdx(0)
    }
    fetch('https://api.flickr.com/services/feeds/photos_public.gne?tags=landscape,portrait&tagmode=any&format=json&nojsoncallback=1')
      .then(response => {return response.json()})
      .then(j => {setUrl(j.items[idx].media.m)})
      .then(() => {
          runAnimation()
      }).catch(() => setFlag(!flag))
  }, [flag])

  return(
    <View style={styles.eachView}>
      <View style={styles.eachView}>
        <Animated.View style={{
          opacity: fade,
        }}
        >
          <Image source={{uri: url}}
                 style={{width: 200, height: 200}}
          />
        </Animated.View>
        <Text>현재 시간: {seconds / 1000}초</Text>
      </View>
      <View style={styles.viewTwo}>
        <Picker style = {{height: 200, width: 250}}
                selectedValue={title}
                onValueChange={(val) => isChanged(val)}>
          <Picker.Item label='1초' value='1'/>
          <Picker.Item label='2초' value='2'/>
          <Picker.Item label='3초' value='3'/>
          <Picker.Item label='4초' value='4'/>
          <Picker.Item label='5초' value='5'/>
          <Picker.Item label='6초' value='6'/>
          <Picker.Item label='7초' value='7'/>
          <Picker.Item label='8초' value='8'/>
          <Picker.Item label='9초' value='9'/>
          <Picker.Item label='10초' value='10'/>
        </Picker>
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
