import {useEffect, useState} from 'react'
import {useIsFocused} from '@react-navigation/native'

export const useHomeActions = (sec: undefined | number) => {
    const [pickerTime, setPickerTime] = useState(1)
    const isFocused = useIsFocused()

    useEffect(() => {
        setPickerTime(sec ?? 1)
    }, [isFocused])

    return {
        pickerTime,
        setPickerTime,
    }
}
