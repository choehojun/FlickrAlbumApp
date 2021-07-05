import {useCallback, useState} from 'react'
import {StackNavigationProp} from '@react-navigation/stack'
import RootStackParamList from '../navigation/RootStackParamList'

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

export const useHomeActions = (navigation: HomeNavigationProp) => {
    const [pickerTime, setPickerTime] = useState(1)
    const handlePress = useCallback(() => {
        navigation.navigate('Slide', {
            sec: pickerTime
        })
    }, [pickerTime, navigation])

    return {
        pickerTime,
        setPickerTime,
        handlePress,
    }
}
