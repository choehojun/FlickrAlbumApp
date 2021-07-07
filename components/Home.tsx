import React, {useCallback} from 'react'
import {Button} from 'react-native'
import TimePickerComponent from './TimePickerComponent'
import styled from '@emotion/native'
import {StackNavigationProp} from '@react-navigation/stack'
import RootStackParamList from '../navigation/RootStackParamList'
import {RouteProp} from '@react-navigation/native'
import {useHomeActions} from '../hooks/UseHomeActions'

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>
type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>

interface Props {
    navigation: HomeNavigationProp
    route: HomeRouteProp
}

const Home = ({navigation, route}: Props) => {
    const second = route.params?.second

    const {
        pickerTime,
        setPickerTime,
    } = useHomeActions(second)

    const handlePress = useCallback(() => {
        navigation.navigate('Slide', {
            second: pickerTime,
        })
    }, [pickerTime, navigation])

    return (
        <>
            <TextContainer>
                <AppName>
                    FlickrAlbumApp
                </AppName>
            </TextContainer>
            <InputContainer>
                <TimePickerComponent
                    selectedTime={pickerTime}
                    onValueChange={setPickerTime}
                />
                <Button
                    title='시작'
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
