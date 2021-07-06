import {Animated} from 'react-native'

export enum AnimationType {
    fadeOut,
    fadeIn,
}

export const createAnimation = (animationType: AnimationType, value: Animated.Value, delay: number) => Animated.timing(
    value, {
        toValue: animationType,
        duration: delay,
        useNativeDriver: true,
    },
)
