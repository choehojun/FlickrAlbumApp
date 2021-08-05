import {Animated} from 'react-native'

export enum AnimationType {
    fadeOut = 0,
    fadeIn = 1,
}

export const createAnimation = (animationType: AnimationType, value: Animated.Value, duration: number) => Animated.timing(
    value, {
        toValue: animationType,
        duration: duration,
        useNativeDriver: true,
    },
)
