import {useCallback, useEffect, useState} from 'react'
import {StackNavigationProp} from '@react-navigation/stack'
import RootStackParamList from '../navigation/RootStackParamList'

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

export const useHomeActions = (navigation: HomeNavigationProp, sec: undefined | number) => {
    const [pickerTime, setPickerTime] = useState(1)
    const handlePress = useCallback(() => {
        navigation.navigate('Slide', {
            sec: pickerTime
        })
    }, [pickerTime, navigation])

    useEffect(() => {
        setPickerTime(sec ?? 1)
    }, [sec, navigation.isFocused()])

    return {
        pickerTime,
        setPickerTime,
        handlePress,
    }
}
