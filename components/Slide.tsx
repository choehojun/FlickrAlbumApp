import React, {useCallback, useEffect, useRef, useState} from 'react'
import { Animated, Button } from 'react-native'
import TimePickerComponent from './TimePickerComponent'
import styled from '@emotion/native'
import {StackNavigationProp} from '@react-navigation/stack'
import RootStackParamList from '../navigation/RootStackParamList'
import {RouteProp} from '@react-navigation/native'

type SlideNavigationProp = StackNavigationProp<RootStackParamList, 'Slide'>
type SlideRouteProp = RouteProp<RootStackParamList, 'Slide'>

interface Props {
    navigation: SlideNavigationProp
    route: SlideRouteProp
}

const Slide = ({navigation, route}: Props) => {
    const sec = route.params.sec
    const fadeOne = useRef(new Animated.Value(0)).current
    const fadeTwo = useRef(new Animated.Value(0)).current
    const [title, setTitle] = useState(String(sec))
    const [durationMillis, setDurationMillis] = useState(sec * 1000)
    const [startFlag, setStartFlag] = useState(true)
    const [fetchFlag, setFetchFlag] = useState(false)
    const [idx, setIdx] = useState(0)
    const [isMounted, setIsMounted] = useState(true)
    const [urlArray, setUrlArray] = useState<Array<string>>([])
    const [tempArray, setTempArray] = useState<Array<string>>([])

    const handleValueChange = useCallback((val: string) => {
        const titleToSecond = Number(val)
        setDurationMillis(titleToSecond * 1000)
        setTitle(val)
    }, [setDurationMillis, setTitle])

    const fadeInAndOut = (fade: Animated.Value, duration: number, value: number) => Animated.timing(
        fade, {
            toValue: value,
            duration: duration,
            useNativeDriver: true,
        }
    )

    const imageOneFadeIn = fadeInAndOut(fadeOne, 0, 1)
    const imageTwoFadeIn = fadeInAndOut(fadeTwo, 1000, 1)
    const imageOneFadeOut = fadeInAndOut(fadeOne, 1000, 0)
    const imageTwoFadeOut = fadeInAndOut(fadeTwo, 0, 0)

    const runAnimation = useCallback(() => {
        Animated.sequence([
            Animated.parallel([
                imageTwoFadeOut,
                imageOneFadeIn,
            ]),
            Animated.delay(durationMillis),
            Animated.parallel([
                imageOneFadeOut,
                imageTwoFadeIn,
            ]),
        ]).start(() => {
            if (isMounted) {
                if(idx === 15) {
                    setFetchFlag(true)
                    setIdx(idx + 1)
                }
                else if (idx === 19) {
                    setUrlArray(tempArray)
                    setIdx(0)
                }
                else {
                    setIdx(idx + 1)
                }
            }
        })
    }, [durationMillis, imageOneFadeIn, imageOneFadeOut, imageTwoFadeIn, setFetchFlag, setUrlArray, setIdx, fetchFlag, idx, urlArray])

    const startFetch = useCallback(() => {
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
                    setStartFlag(false)
                }
            })
    }, [isMounted, setUrlArray, setStartFlag, startFlag, urlArray])

    const fetchToTemp = useCallback(() => {
        fetch('https://api.flickr.com/services/feeds/photos_public.gne?tags=landscape,portrait&tagmode=any&format=json&nojsoncallback=1')
            .then(response => {
                return response.json()
            })
            .then(j => {
                const imagArray = j.items.map((item: { media: { m: string } }) => {
                    return item.media.m
                })
                if (isMounted) {
                    setTempArray(imagArray)
                    setFetchFlag(false)
                }
            })
    }, [isMounted, setTempArray, setFetchFlag, fetchFlag, tempArray])

    useEffect(() => {
        setIsMounted(true)
        if (startFlag) {
            startFetch()
        }
        if (fetchFlag) {
            fetchToTemp()
        }
        runAnimation()
        return () => {setIsMounted(false)}
    }, [idx])

    return(
        <>
            <TextContainer>
                <StyledText>현재 시간: {durationMillis / 1000}초</StyledText>
            </TextContainer>
            <ImageContainer>
                <Animated.View style={{
                    opacity: fadeOne,
                    position: 'absolute'
                }}
                >
                    <StyledImage
                        source={{
                            uri: urlArray[idx],
                            width: 300,
                            height: 300
                        }}
                    />
                </Animated.View>
                <Animated.View style={{
                    opacity: fadeTwo,
                    position: 'absolute'
                }}
                >
                    <StyledImage
                        source={{
                            uri: idx === 19 ? tempArray[0] : urlArray[idx + 1],
                            width: 300,
                            height: 300
                        }}
                    />
                </Animated.View>
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
    marginBottom: 130,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
})

const InputContainer = styled.View({
    marginTop: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
})

const TextContainer = styled.View({
    marginTop: 20,
    marginBottom: 130,
    alignItems: 'center',
    justifyContent: 'center',
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
