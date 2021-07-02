import {useCallback, useState} from 'react'
import {StackNavigationProp} from '@react-navigation/stack'
import RootStackParamList from '../navigation/RootStackParamList'

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

export const useHomeActions = (navigation: HomeNavigationProp) => {
    const [title, setTitle] = useState('1')
    const handlePress = useCallback(() => {
        const titleToSecond = Number(title)
        navigation.navigate('Slide', {
            sec: titleToSecond
        })
    }, [title, navigation])

    return {
        title,
        setTitle,
        handlePress,
    }
}
