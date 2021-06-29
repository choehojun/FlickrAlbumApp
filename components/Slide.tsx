import React, {useCallback, useEffect, useState} from 'react';
import { Animated, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styled from '@emotion/native';

const ImageContainer = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

const InputContainer = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-end',
});

const StyledImage = styled.Image({
  padding: 40,
});

const StyledText = styled.Text({
  fontSize: 13,
});

const ButtonContainer = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

const Slide = ({navigation}) => {
  const sec = navigation.getParam('sec');
  const [fade] = useState(new Animated.Value(0));
  const [title, setTitle] = useState(String(sec));
  const [durationMillis, setDurationMillis] = useState(sec * 1000);
  const [url, setUrl] = useState();
  const [flag, setFlag] = useState(false);
  const [idx, setIdx] = useState(0);
  const [isMounted, setIsMounted] = useState(true);

  const handleValueChange = useCallback((val: React.SetStateAction<string>) => {
    const changedTitle = Number(val);
    setDurationMillis(changedTitle * 1000);
    setTitle(val);
  }, [setDurationMillis, setTitle]);

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
  const runAnimation = useCallback(() => {
    Animated.sequence([
      fadeInAnimation,
      Animated.delay(durationMillis),
      fadeOutAnimation
    ]).start(() => {
      if (isMounted) {
        setIdx(idx + 1);
        setFlag(!flag);
      }
    });
  }, [durationMillis, fadeInAnimation, fadeOutAnimation, setIdx, setFlag]);

  useEffect(() => {
    setIsMounted(true);
    if(idx >= 20) {
      setIdx(0);
    }
    fetch('https://api.flickr.com/services/feeds/photos_public.gne?tags=landscape,portrait&tagmode=any&format=json&nojsoncallback=1')
      .then(response => {return response.json();})
      .then(j => {
        if (isMounted) {
          setUrl(j.items[idx].media.m);
        }
      })
      .then(() => {
        runAnimation();
      }).catch(() => setFlag(!flag));
    return () => {setIsMounted(false);};
  }, [flag]);

  return(
    <>
      <ImageContainer>
        <Animated.View style={{
          opacity: fade,
        }}
        >
          <StyledImage
            source={{
              uri: url,
              width: 200,
              height: 200
            }}
          />
        </Animated.View>
        <StyledText>현재 시간: {durationMillis / 1000}초</StyledText>
      </ImageContainer>
      <InputContainer>
        <Picker style = {{height: 200, width: 250}}
          selectedValue={title}
          onValueChange={handleValueChange}>
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
      </InputContainer>
      <ButtonContainer>
        <Button title="시작 화면으로"
          onPress={() => navigation.navigate('Home')}
        />
      </ButtonContainer>
    </>
  );
};

export default Slide;
