import {useCallback, useState} from 'react'
import {StackNavigationProp} from '@react-navigation/stack'
import RootStackParamList from '../navigation/RootStackParamList'

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

export const useHomeActions = (navigation: HomeNavigationProp) => {
    const [pickerTime, setPickerTime] = useState('1')
    const handlePress = useCallback(() => {
        const stringToNumberSecond = Number(pickerTime)
        navigation.navigate('Slide', {
            sec: stringToNumberSecond
        })
    }, [pickerTime, navigation])

    return {
        pickerTime,
        setPickerTime,
        handlePress,
    }
}
