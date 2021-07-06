import {useCallback, useEffect, useState} from 'react'
import {StackNavigationProp} from '@react-navigation/stack'
import RootStackParamList from '../navigation/RootStackParamList'
import {useIsFocused} from '@react-navigation/native'

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

export const useHomeActions = (navigation: HomeNavigationProp, sec: undefined | number) => {
    const [pickerTime, setPickerTime] = useState(1)
    const isFocused = useIsFocused()
    const handlePress = useCallback(() => {
        navigation.navigate('Slide', {
            sec: pickerTime,
        })
    }, [pickerTime, navigation])

    useEffect(() => {
        setPickerTime(sec ?? 1)
    }, [isFocused])

    return {
        pickerTime,
        setPickerTime,
        handlePress,
    }
}
