import {useCallback, useEffect, useState} from 'react'
import {useFadeAnimation} from '../animation/hooks/UseFadeAnimation'
import {fetchFromFlickrAPI} from '../service/FetchFromFlickrAPI'

const FLICKR_LANDSCAPE_PORTRAIT_URL = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=landscape,portrait&tagmode=any&format=json&nojsoncallback=1'

export const useSlideActions = (sec: number) => {
    const [delayMillis, setDelayMillis] = useState(sec * 1000)
    const [fetchFlag, setFetchFlag] = useState(true)
    const [evenIdx, setEvenIdx] = useState(0)
    const [oddIdx, setOddIdx] = useState(1)
    const [isEvenIndex, setIsEvenIndex] = useState(true)
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
        fetchFromFlickrAPI(FLICKR_LANDSCAPE_PORTRAIT_URL)
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
            if (isEvenIndex) {
                setEvenIdx(evenIdx + 2)
            }
            else {
                if (oddIdx === 15) {
                    setFetchFlag(true)
                    setOddIdx(oddIdx + 2)
                }
                else if (oddIdx === 19) {
                    setUrlArray(urlArray.slice(20))
                    setEvenIdx(0)
                    setOddIdx(1)
                }
                else {
                    setOddIdx(oddIdx + 2)
                }
            }
            setIsEvenIndex(!isEvenIndex)
        }
    }, [isMounted, setIsEvenIndex, isEvenIndex, setEvenIdx, evenIdx, setOddIdx, oddIdx, setFetchFlag, fetchFlag, urlArray, setUrlArray])

    useEffect(() => {
        setIsMounted(true)
        if (fetchFlag) {
            startFetch()
        }
        if (isEvenIndex) {
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
    }, [isEvenIndex])
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
