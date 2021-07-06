import {useMemo, useRef} from 'react'
import {Animated} from 'react-native'
import {AnimationType, createAnimation} from '../model/AnimationType'

export const useFadeAnimation = (delayMillis: number) => {
    const opacityForEvenIndex = useRef(new Animated.Value(1)).current
    const opacityForOddIndex = useRef(new Animated.Value(0)).current


    const evenIndexFadeIn = createAnimation(AnimationType.fadeIn, opacityForEvenIndex, 1000)
    const oddIndexFadeIn = createAnimation(AnimationType.fadeIn, opacityForOddIndex, 1000)
    const evenIndexFadeOut = createAnimation(AnimationType.fadeOut, opacityForEvenIndex, 1000)
    const oddIndexFadeOut = createAnimation(AnimationType.fadeOut, opacityForOddIndex, 1000)

    const evenIndexFadeAnimation = useMemo(() => {
        return Animated.sequence([
            Animated.delay(delayMillis),
            Animated.parallel([
                evenIndexFadeOut,
                oddIndexFadeIn,
            ]),
        ])
    }, [delayMillis, evenIndexFadeOut, oddIndexFadeIn])

    const oddIndexFadeAnimation = useMemo(() => {
        return Animated.sequence([
            Animated.delay(delayMillis),
            Animated.parallel([
                oddIndexFadeOut,
                evenIndexFadeIn,
            ]),
        ])
    }, [delayMillis, oddIndexFadeOut, evenIndexFadeIn])

    return {
        opacityForEvenIndex,
        opacityForOddIndex,
        evenIndexFadeAnimation,
        oddIndexFadeAnimation,
    }
}
