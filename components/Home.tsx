import React from 'react'
import {Button} from 'react-native'
import TimePickerComponent from './TimePickerComponent'
import styled from '@emotion/native'
import {StackNavigationProp} from '@react-navigation/stack'
import RootStackParamList from '../navigation/RootStackParamList'
import {useHomeActions} from '../hooks/UseHomeActions'

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

interface Props {
    navigation: HomeNavigationProp
}

const Home = ({navigation}: Props) => {
    const {
        pickerTime,
        setPickerTime,
        handlePress,
    } = useHomeActions(navigation)

    return (
        <>
            <TextContainer>
                <AppName>
          FlickrAlbumApp
                </AppName>
            </TextContainer>
            <InputContainer>
                <TimePickerComponent selectedValue={pickerTime}
                    onValueChange={setPickerTime}
                />
                <Button title="시작"
                    onPress={handlePress}
                />
            </InputContainer>
        </>
    )
}

const TextContainer = styled.View({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
})

const AppName = styled.Text({
    marginTop: 100,
    fontWeight: 'bold',
    fontSize: 35,
    fontStyle: 'italic',
})

const InputContainer = styled.View({
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
})

export default Home
