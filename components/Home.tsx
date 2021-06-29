import React, { useState } from 'react';
import { Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styled from '@emotion/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Description = styled.Text`
  margin-top: 100px;
  font-weight: bold;
  font-size: 35px;
  font-style: italic;
`;

const ContainerTwo = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

const Home = ({navigation}) => {
  const [title, setTitle] = useState('1');
  const isPressed = () => {
    const changedTitle = Number(title);
    navigation.navigate('Slide', {
      sec: changedTitle
    });
  };

  return (
    <Container>
      <Container>
        <Description>
          FlickrAlbumApp
        </Description>
      </Container>
      <ContainerTwo>
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
          onPress={isPressed}
        />
      </ContainerTwo>
    </Container>
  );
};

export default Home;
