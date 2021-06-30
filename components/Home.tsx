import React, {useCallback, useState} from 'react'
import { Button } from 'react-native'
import PickerComponent from './Picker'
import styled from '@emotion/native'

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

const Home = ({navigation}) => {
    const [title, setTitle] = useState('1')
    const handlePress = useCallback(() => {
        const changedTitle = Number(title)
        navigation.navigate('Slide', {
            sec: changedTitle
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

export default Home
