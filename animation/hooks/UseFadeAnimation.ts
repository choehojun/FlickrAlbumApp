import {useMemo, useRef} from 'react'
import {Animated} from 'react-native'

export const useFadeAnimation = (durationMillis: number) => {
    const fadeOne = useRef(new Animated.Value(0)).current
    const fadeTwo = useRef(new Animated.Value(0)).current
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

    const fadeAnimation = useMemo(() => {
        return Animated.sequence([
            Animated.parallel([
                imageTwoFadeOut,
                imageOneFadeIn,
            ]),
            Animated.delay(durationMillis),
            Animated.parallel([
                imageOneFadeOut,
                imageTwoFadeIn,
            ]),
        ])
    }, [durationMillis, imageOneFadeIn, imageOneFadeOut, imageTwoFadeIn, imageTwoFadeOut])

    return {
        fadeOne,
        fadeTwo,
        fadeAnimation,
    }
}
