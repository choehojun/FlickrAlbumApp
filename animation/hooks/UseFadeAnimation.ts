import {useMemo, useRef} from 'react'
import {Animated} from 'react-native'
import {AnimationType, createAnimation} from '../model/AnimationType'

const Constant = {
    FADE_DURATION: 1000,
}
export const useFadeAnimation = (delayMillis: number) => {
    const opacityForEvenIndex = useRef(new Animated.Value(1)).current
    const opacityForOddIndex = useRef(new Animated.Value(0)).current


    const evenIndexFadeIn = createAnimation(AnimationType.fadeIn, opacityForEvenIndex, Constant.FADE_DURATION)
    const oddIndexFadeIn = createAnimation(AnimationType.fadeIn, opacityForOddIndex, Constant.FADE_DURATION)
    const evenIndexFadeOut = createAnimation(AnimationType.fadeOut, opacityForEvenIndex, Constant.FADE_DURATION)
    const oddIndexFadeOut = createAnimation(AnimationType.fadeOut, opacityForOddIndex, Constant.FADE_DURATION)

    const evenIndexShownAndCrossFade = useMemo(() => {
        return Animated.sequence([
            Animated.delay(delayMillis),
            Animated.parallel([
                evenIndexFadeOut,
                oddIndexFadeIn,
            ]),
        ])
    }, [delayMillis, evenIndexFadeOut, oddIndexFadeIn])

    const oddIndexShownAndCrossFade = useMemo(() => {
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
        evenIndexShownAndCrossFade,
        oddIndexShownAndCrossFade,
    }
}
