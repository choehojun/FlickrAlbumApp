import React, {useCallback, useState} from 'react'
import { Button } from 'react-native'
import TimePickerComponent from './TimePickerComponent'
import styled from '@emotion/native'
import {NavigationStackProp} from 'react-navigation-stack'

interface Props {
    navigation: NavigationStackProp<{userId: string}>
}

const Home = ({navigation}: Props) => {
    const [title, setTitle] = useState('1')
    const handlePress = useCallback(() => {
        const titleToSecond = Number(title)
        navigation.navigate('Slide', {
            sec: titleToSecond
        })
    }, [title, navigation])

    return (
        <>
            <TextContainer>
                <AppName>
          FlickrAlbumApp
                </AppName>
            </TextContainer>
            <InputContainer>
                <TimePickerComponent selectedValue={title}
                    onValueChange={(val: string) => setTitle(val)}
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
