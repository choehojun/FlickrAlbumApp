import React, {useCallback, useEffect, useState} from 'react'
import { Animated, Button } from 'react-native'
import TimePickerComponent from './TimePickerComponent'
import styled from '@emotion/native'
import {NavigationScreenProp} from 'react-navigation'

interface Props {
    navigation: NavigationScreenProp<any>
}

const Slide = ({navigation}: Props) => {
    const sec = navigation.getParam('sec')
    const [fade] = useState(new Animated.Value(0))
    const [title, setTitle] = useState(String(sec))
    const [durationMillis, setDurationMillis] = useState(sec * 1000)
    const [flag, setFlag] = useState(true)
    const [idx, setIdx] = useState(0)
    const [isMounted, setIsMounted] = useState(true)
    const [urlArray, setUrlArray] = useState<Array<string>>([])

    const handleValueChange = useCallback((val: string) => {
        const titleToSecond = Number(val)
        setDurationMillis(titleToSecond * 1000)
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
                if (idx < 19) {
                    setIdx(idx + 1)
                } else {
                    setUrlArray([])
                    setFlag(true)
                    setIdx(0)
                }
            }
        })
    }, [durationMillis, fadeInAnimation, fadeOutAnimation, setIdx, setFlag, isMounted, flag, idx])

    const FetchImages = useCallback(() => {
        fetch('https://api.flickr.com/services/feeds/photos_public.gne?tags=landscape,portrait&tagmode=any&format=json&nojsoncallback=1')
            .then(response => {
                return response.json()
            })
            .then(j => {
                const imagArray = j.items.map((item: { media: { m: string } }) => {
                    return item.media.m
                })
                if (isMounted) {
                    setUrlArray(imagArray)
                    setFlag(false)
                }
            })
    }, [isMounted, setUrlArray, setFlag, flag, urlArray])

    useEffect(() => {
        setIsMounted(true)
        if (flag) {
            FetchImages()
        }
        runAnimation()
        return () => {setIsMounted(false)}
    }, [idx])

    return(
        <>
            <ImageContainer>
                <Animated.View style={{
                    opacity: fade,
                }}
                >
                    <StyledImage
                        source={{
                            uri: urlArray[idx],
                            width: 200,
                            height: 200
                        }}
                    />
                </Animated.View>
                <StyledText>현재 시간: {durationMillis / 1000}초</StyledText>
            </ImageContainer>
            <InputContainer>
                <TimePickerComponent selectedValue={title}
                    onValueChange={handleValueChange}
                />
            </InputContainer>
            <ButtonContainer>
                <Button title="시작 화면으로"
                    onPress={() => navigation.navigate('Home')}
                />
            </ButtonContainer>
        </>
    )
}

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

export default Slide
