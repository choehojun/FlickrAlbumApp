import React, {useCallback, useEffect, useState} from 'react'
import { Animated, Button } from 'react-native'
import PickerComponent from './Picker'
import styled from '@emotion/native'

const ImageContainer = styled.View({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
})

const InputContainer = styled.View({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
})

const StyledImage = styled.Image({
    padding: 40,
})

const StyledText = styled.Text({
    fontSize: 13,
})

const ButtonContainer = styled.View({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
})

const Slide = ({navigation}) => {
    const sec = navigation.getParam('sec')
    const [fade] = useState(new Animated.Value(0))
    const [title, setTitle] = useState(String(sec))
    const [durationMillis, setDurationMillis] = useState(sec * 1000)
    const [url, setUrl] = useState()
    const [flag, setFlag] = useState(true)
    const [idx, setIdx] = useState(0)
    const [isMounted, setIsMounted] = useState(true)
    const [urlArray, setUrlArray] = useState()

    const handleValueChange = useCallback((val: React.SetStateAction<string>) => {
        const changedTitle = Number(val)
        setDurationMillis(changedTitle * 1000)
        setTitle(val)
    }, [setDurationMillis, setTitle])

    const fadeInAnimation = Animated.timing(
        fade, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }
    )
    const fadeOutAnimation = Animated.timing(
        fade, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }
    )
    const runAnimation = useCallback(() => {
        Animated.sequence([
            fadeInAnimation,
            Animated.delay(durationMillis),
            fadeOutAnimation
        ]).start(() => {
            if (isMounted) {
                if (idx < 20) {
                    setUrl(urlArray.items[idx].media.m)
                    setIdx(idx + 1)
                } else {
                    setIdx(0)
                    setFlag(true)
                }
            }
        })
    }, [durationMillis, fadeInAnimation, fadeOutAnimation, setIdx, setFlag, setUrl])

    useEffect(() => {
        setIsMounted(true)
        if (flag) {
            fetch('https://api.flickr.com/services/feeds/photos_public.gne?tags=landscape,portrait&tagmode=any&format=json&nojsoncallback=1')
                .then(response => {
                    return response.json()
                })
                .then(j => {
                    if (isMounted) {
                        setUrl(j.items[idx].media.m)
                        setUrlArray(j)
                        setFlag(false)
                    }
                }).then(() => {
                    if(isMounted) {
                        setIdx(idx + 1)
                    }
                })
        } else runAnimation()
        return () => {setIsMounted(false)}
    }, [idx, flag])

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
                <PickerComponent selectedValue={title}
                    onValueChange={handleValueChange}>
                </PickerComponent>
            </InputContainer>
            <ButtonContainer>
                <Button title="시작 화면으로"
                    onPress={() => navigation.navigate('Home')}
                />
            </ButtonContainer>
        </>
    )
}

export default Slide
