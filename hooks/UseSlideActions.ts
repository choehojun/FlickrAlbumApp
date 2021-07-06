import {useCallback, useEffect, useState} from 'react'
import {useFadeAnimation} from '../animation/hooks/UseFadeAnimation'
import {fetchFromFlickrAPI} from '../service/FetchFromFlickrAPI'

const FLICKR_LANDSCAPE_PORTRAIT_URL = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=landscape,portrait&tagmode=any&format=json&nojsoncallback=1'

export const useSlideActions = (sec: number) => {
    const [delayMillis, setDelayMillis] = useState(sec * 1000)
    const [fetchFlag, setFetchFlag] = useState(true)
    const [idx, setIdx] = useState(0)
    const [isMounted, setIsMounted] = useState(true)
    const [urlArray, setUrlArray] = useState<Array<string>>([])
    const pickerTime = delayMillis / 1000
    const {
        opacityForOddIndex,
        opacityForEvenIndex,
        fadeAnimation,
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
            if (idx === 15) {
                setFetchFlag(true)
                setIdx(idx + 1)
            } else if (idx === 19) {
                setUrlArray(urlArray.slice(20))
                setIdx(0)
            } else {
                setIdx(idx + 1)
            }
        }
    }, [isMounted, setIdx, setUrlArray, idx, urlArray])

    useEffect(() => {
        setIsMounted(true)
        if (fetchFlag) {
            startFetch()
        }
        fadeAnimation.start(() => {
            transitionToNextImage()
        })
        return () => {
            setIsMounted(false)
        }
    }, [idx])
    return {
        pickerTime,
        opacityForOddIndex,
        opacityForEvenIndex,
        idx,
        urlArray,
        handleValueChange,
    }
}
