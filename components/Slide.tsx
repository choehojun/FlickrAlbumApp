import React, {useCallback, useEffect, useRef, useState} from 'react'
import { Animated, Button } from 'react-native'
import TimePickerComponent from './TimePickerComponent'
import styled from '@emotion/native'
import {NavigationScreenProp} from 'react-navigation'

interface Props {
    navigation: NavigationScreenProp<any>
}

const Slide = ({navigation}: Props) => {
    const sec = navigation.getParam('sec')
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

    const fadeInAnimationOne = Animated.timing(
        fadeOne, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
        }
    )

    const fadeOutAnimationOne = Animated.timing(
        fadeOne, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }
    )

    const fadeInAnimationTwo = Animated.timing(
        fadeTwo, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }
    )

    const fadeOutAnimationTwo = Animated.timing(
        fadeTwo, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
        }
    )

    const runAnimation = useCallback(() => {
        Animated.sequence([
            fadeInAnimationOne,
            Animated.delay(durationMillis),
            Animated.parallel([
                fadeOutAnimationOne,
                fadeInAnimationTwo
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
            fadeOutAnimationTwo.start()
        })
    }, [durationMillis, fadeInAnimationOne, fadeOutAnimationOne, fadeInAnimationTwo, fadeOutAnimationTwo,
        setFetchFlag, setUrlArray, setIdx, fetchFlag, idx, urlArray])

    const StartFetch = useCallback(() => {
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

    const FetchToTemp = useCallback(() => {
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
            StartFetch()
        }
        if (fetchFlag) {
            FetchToTemp()
        }
        runAnimation()
        return () => {setIsMounted(false)}
    }, [idx])

    return(
        <>
            <ImageContainer>
                <Animated.View style={{
                    opacity: fadeOne,
                    position: 'absolute'
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
                <Animated.View style={{
                    opacity: fadeTwo,
                    position: 'absolute'
                }}
                >
                    <StyledImage
                        source={{
                            uri: idx === 19 ? tempArray[0] : urlArray[idx + 1],
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
