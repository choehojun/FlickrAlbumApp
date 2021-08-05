import React, {useCallback, useEffect, useState} from 'react'
import {Button} from 'react-native'
import TimePickerComponent from './TimePickerComponent'
import styled from '@emotion/native'
import {StackNavigationProp} from '@react-navigation/stack'
import RootStackParamList from '../navigation/RootStackParamList'
import {RouteProp, useIsFocused} from '@react-navigation/native'

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>
type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>

interface Props {
    navigation: HomeNavigationProp
    route: HomeRouteProp
}

const DEFAULT_SECOND = 1

const Home = ({navigation, route}: Props) => {
    const second = route.params?.second ?? DEFAULT_SECOND

    const [pickerTime, setPickerTime] = useState(second)
    const isFocused = useIsFocused()

    const handlePress = useCallback(() => {
        navigation.navigate('Slide', {
            second: pickerTime,
        })
    }, [pickerTime, navigation])

    useEffect(() => {
        setPickerTime(second)
    }, [isFocused])

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
