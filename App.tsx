import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import Home from './components/Home'
import Slide from './components/Slide'
import RootStackParamList from './navigation/RootStackParamList'

const Stack = createStackNavigator<RootStackParamList>()

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name='Home' component={Home}/>
                <Stack.Screen name='Slide' component={Slide}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App
