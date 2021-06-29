import React, {useCallback, useState} from 'react';
import { Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styled from '@emotion/native';

const TextContainer = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

const AppName = styled.Text({
  marginTop: 100,
  fontWeight: 'bold',
  fontSize: 35,
  fontStyle: 'italic',
});

const InputContainer = styled.View({
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const Home = ({navigation}) => {
  const [title, setTitle] = useState('1');
  const handlePress = useCallback(() => {
    const changedTitle = Number(title);
    navigation.navigate('Slide', {
      sec: changedTitle
    });
  }, [title, navigation]);

  return (
    <>
      <TextContainer>
        <AppName>
          FlickrAlbumApp
        </AppName>
      </TextContainer>
      <InputContainer>
        <Picker style={{height: 200, width: 250}}
          selectedValue={title}
          onValueChange={(val) => setTitle(val)}>
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

        <Button title="시작"
          onPress={handlePress}
        />
      </InputContainer>
    </>
  );
};

export default Home;
