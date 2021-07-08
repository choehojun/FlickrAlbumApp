import {useEffect, useState} from 'react'
import {useIsFocused} from '@react-navigation/native'

export const useHomeActions = (second: undefined | number) => {
    const [pickerTime, setPickerTime] = useState(1)
    const isFocused = useIsFocused()

    useEffect(() => {
        setPickerTime(second ?? 1)
    }, [isFocused])

    return {
        pickerTime,
        setPickerTime,
    }
}
