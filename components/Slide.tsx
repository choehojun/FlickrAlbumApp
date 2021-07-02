import React from 'react'
import {Animated, Button} from 'react-native'
import TimePickerComponent from './TimePickerComponent'
import styled from '@emotion/native'
import {StackNavigationProp} from '@react-navigation/stack'
import RootStackParamList from '../navigation/RootStackParamList'
import {RouteProp} from '@react-navigation/native'
import {useSlideActions} from '../hooks/UseSlideActions'

type SlideNavigationProp = StackNavigationProp<RootStackParamList, 'Slide'>
type SlideRouteProp = RouteProp<RootStackParamList, 'Slide'>

interface Props {
    navigation: SlideNavigationProp
    route: SlideRouteProp
}

const Slide = ({navigation, route}: Props) => {
    const {sec} = route.params
    const {
        title,
        fadeOne,
        fadeTwo,
        idx,
        urlArray,
        tempArray,
        handleValueChange,
    } = useSlideActions(sec)

    return(
        <>
            <TextContainer>
                <StyledText>현재 시간: {title}초</StyledText>
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
