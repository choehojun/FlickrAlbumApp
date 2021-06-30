import React, {useCallback, useState} from 'react'
import { Button } from 'react-native'
import PickerComponent from './PickerComponent'
import styled from '@emotion/native'

const Home = ({navigation}) => {
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
                <PickerComponent selectedValue={title}
                    onValueChange={(val) => setTitle(val)}>
                </PickerComponent>

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
