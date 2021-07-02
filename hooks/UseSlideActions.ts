import {useCallback, useEffect, useState} from 'react'
import {useFadeAnimation} from '../animation/hooks/UseFadeAnimation'
import {fetchFromFlickrAPI} from '../service/FetchFromFlickrAPI'

const FLICKR_LANDSCAPE_PORTRAIT_URL = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=landscape,portrait&tagmode=any&format=json&nojsoncallback=1'

export const useSlideActions = (sec: number) => {
    const [durationMillis, setDurationMillis] = useState(sec * 1000)
    const [startFlag, setStartFlag] = useState(true)
    const [fetchFlag, setFetchFlag] = useState(false)
    const [idx, setIdx] = useState(0)
    const [isMounted, setIsMounted] = useState(true)
    const [urlArray, setUrlArray] = useState<Array<string>>([])
    const [tempArray, setTempArray] = useState<Array<string>>([])
    const title = String(durationMillis / 1000)
    const {
        fadeOne,
        fadeTwo,
        fadeAnimation,
    } = useFadeAnimation(durationMillis)

    const handleValueChange = useCallback((val: string) => {
        const titleToSecond = Number(val)
        setDurationMillis(titleToSecond * 1000)
    }, [setDurationMillis])

    const startFetch = useCallback(() => {
        fetchFromFlickrAPI(FLICKR_LANDSCAPE_PORTRAIT_URL)
            .then((items) => {
                const imagArray = items
                if (isMounted) {
                    setUrlArray(imagArray)
                    setStartFlag(false)
                }
            })
    }, [isMounted, setUrlArray, setStartFlag, startFlag, urlArray])

    const fetchToTemp = useCallback(() => {
        fetchFromFlickrAPI(FLICKR_LANDSCAPE_PORTRAIT_URL)
            .then((items) => {
                const imagArray = items
                if (isMounted) {
                    setTempArray(imagArray)
                    setFetchFlag(false)
                }
            })
    }, [isMounted, setTempArray, setFetchFlag, fetchFlag, tempArray])

    const transitionToNextImage = useCallback(() => {
        if (isMounted) {
            if (idx === 15) {
                setFetchFlag(true)
                setIdx(idx + 1)
            } else if (idx === 19) {
                setUrlArray(tempArray)
                setIdx(0)
            } else {
                setIdx(idx + 1)
            }
        }
    }, [isMounted, setFetchFlag, setIdx, setUrlArray, fetchFlag, idx, urlArray, tempArray])

    useEffect(() => {
        setIsMounted(true)
        if (startFlag) {
            startFetch()
        }
        if (fetchFlag) {
            fetchToTemp()
        }
        fadeAnimation.start(() => {
            transitionToNextImage()
        })
        return () => {
            setIsMounted(false)
        }
    }, [idx])
    return {
        title,
        fadeOne,
        fadeTwo,
        idx,
        urlArray,
        tempArray,
        handleValueChange,
    }
}
