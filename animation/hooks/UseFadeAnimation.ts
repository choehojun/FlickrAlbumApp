import {useMemo, useRef} from 'react'
import {Animated} from 'react-native'

export const useFadeAnimation = (delayMillis: number) => {
    const opacityForOddIndex = useRef(new Animated.Value(0)).current
    const opacityForEvenIndex = useRef(new Animated.Value(0)).current
    const fadeInAndOut = (fade: Animated.Value, delay: number, value: number) => Animated.timing(
        fade, {
            toValue: value,
            duration: delay,
            useNativeDriver: true,
        }
    )

    const imageOneFadeIn = fadeInAndOut(opacityForOddIndex, 0, 1)
    const imageTwoFadeIn = fadeInAndOut(opacityForEvenIndex, 1000, 1)
    const imageOneFadeOut = fadeInAndOut(opacityForOddIndex, 1000, 0)
    const imageTwoFadeOut = fadeInAndOut(opacityForEvenIndex, 0, 0)

    const fadeAnimation = useMemo(() => {
        return Animated.sequence([
            Animated.parallel([
                imageTwoFadeOut,
                imageOneFadeIn,
            ]),
            Animated.delay(delayMillis),
            Animated.parallel([
                imageOneFadeOut,
                imageTwoFadeIn,
            ]),
        ])
    }, [delayMillis, imageOneFadeIn, imageOneFadeOut, imageTwoFadeIn, imageTwoFadeOut])

    return {
        opacityForOddIndex,
        opacityForEvenIndex,
        fadeAnimation,
    }
}
