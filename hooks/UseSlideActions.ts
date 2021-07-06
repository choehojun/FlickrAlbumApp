import {useCallback, useEffect, useState} from 'react'
import {useFadeAnimation} from '../animation/hooks/UseFadeAnimation'

export type FetchImageAPIType = (url: string) => Promise<Array<string>>

const Constant = {
    FETCH_SIZE: 20,
    INDEX_FROM_LAST_STARTING_FETCH: 5,
}

export const useSlideActions = (sec: number, fetchImageAPI: FetchImageAPIType, url: string) => {
    const [delayMillis, setDelayMillis] = useState(sec * 1000)
    const [fetchFlag, setFetchFlag] = useState(true)
    const [evenIdx, setEvenIdx] = useState(0)
    const [oddIdx, setOddIdx] = useState(1)
    const [isEvenIndexShown, setIsEvenIndexShown] = useState(true)
    const [isMounted, setIsMounted] = useState(true)
    const [urlArray, setUrlArray] = useState<Array<string>>([])
    const pickerTime = delayMillis / 1000
    const {
        opacityForEvenIndex,
        opacityForOddIndex,
        evenIndexFadeAnimation,
        oddIndexFadeAnimation,
    } = useFadeAnimation(delayMillis)

    const handleValueChange = useCallback((val: number) => {
        setDelayMillis(val * 1000)
    }, [setDelayMillis])

    const startFetch = useCallback(() => {
        fetchImageAPI(url)
            .then((items) => {
                const imagArray = items
                if (isMounted) {
                    setUrlArray(urlArray.concat(imagArray))
                    setFetchFlag(false)
                }
            })
    }, [isMounted, setUrlArray, setFetchFlag, fetchFlag, urlArray])

    const transitionToNextImage = useCallback(() => {
        if (isMounted) {
            if (isEvenIndexShown) {
                setEvenIdx(evenIdx + 2)
            } else {
                if (oddIdx === Constant.FETCH_SIZE - Constant.INDEX_FROM_LAST_STARTING_FETCH) {
                    setFetchFlag(true)
                    setOddIdx(oddIdx + 2)
                } else if (oddIdx === Constant.FETCH_SIZE - 1) {
                    setUrlArray(urlArray.slice(Constant.FETCH_SIZE))
                    setEvenIdx(0)
                    setOddIdx(1)
                } else {
                    setOddIdx(oddIdx + 2)
                }
            }
            setIsEvenIndexShown(!isEvenIndexShown)
        }
    }, [isMounted, setIsEvenIndexShown, isEvenIndexShown, setEvenIdx, evenIdx, setOddIdx, oddIdx, setFetchFlag, fetchFlag, urlArray, setUrlArray])

    useEffect(() => {
        setIsMounted(true)
        if (fetchFlag) {
            startFetch()
        }
        if (isEvenIndexShown) {
            evenIndexFadeAnimation.start(() => {
                transitionToNextImage()
            })
        } else {
            oddIndexFadeAnimation.start(() => {
                transitionToNextImage()
            })
        }
        return () => {
            setIsMounted(false)
        }
    }, [isEvenIndexShown])
    return {
        pickerTime,
        opacityForEvenIndex,
        opacityForOddIndex,
        evenIdx,
        oddIdx,
        urlArray,
        handleValueChange,
    }
}
