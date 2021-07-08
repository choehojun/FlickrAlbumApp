import {useCallback, useEffect, useState} from 'react'
import {useFadeAnimation} from '../animation/hooks/UseFadeAnimation'
import {FetchImageAPIType} from '../model/FetchImageAPIType'

const Constant = {
    FETCH_SIZE: 20,
    INDEX_FROM_LAST_STARTING_FETCH: 5,
}

export const useSlideActions = (second: number, fetchImageAPI: FetchImageAPIType, url: string) => {
    const [delayMillis, setDelayMillis] = useState(second * 1000)
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
        evenIndexShownAndCrossFade,
        oddIndexShownAndCrossFade,
    } = useFadeAnimation(delayMillis)

    const handleValueChange = useCallback((val: number) => {
        setDelayMillis(val * 1000)
    }, [setDelayMillis])

    const startFetch = useCallback(() => {
        fetchImageAPI(url)
            .then((items) => {
                const imagArray = items
                if (isMounted) {
                    setUrlArray(prev => prev.concat(imagArray))
                    setFetchFlag(false)
                }
            })
    }, [isMounted, setUrlArray, setFetchFlag])

    const transitionToNextImage = useCallback(() => {
        if (isMounted) {
            if (isEvenIndexShown) {
                setEvenIdx(prev => prev + 2)
                setIsEvenIndexShown(prev => !prev)
                return
            }
            if (oddIdx === Constant.FETCH_SIZE - Constant.INDEX_FROM_LAST_STARTING_FETCH) {
                setFetchFlag(true)
                setOddIdx(prev => prev + 2)
            } else if (oddIdx === Constant.FETCH_SIZE - 1) {
                setUrlArray(prev => prev.slice(Constant.FETCH_SIZE))
                setEvenIdx(0)
                setOddIdx(1)
            } else {
                setOddIdx(prev => prev + 2)
            }
            setIsEvenIndexShown(prev => !prev)
        }
    }, [isMounted, setIsEvenIndexShown, isEvenIndexShown, setEvenIdx, setOddIdx, setFetchFlag, setUrlArray])

    useEffect(() => {
        if (fetchFlag) {
            startFetch()
        }
        if (isEvenIndexShown) {
            evenIndexShownAndCrossFade.start(() => {
                transitionToNextImage()
            })
        } else {
            oddIndexShownAndCrossFade.start(() => {
                transitionToNextImage()
            })
        }
    }, [isEvenIndexShown])

    useEffect(() => {
        setIsMounted(true)
        return () => {
            setIsMounted(false)
        }
    }, [])

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
