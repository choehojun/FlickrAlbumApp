import { Picker } from '@react-native-picker/picker'
import React from 'react'

interface Props {
    selectedValue: string
    onValueChange: (val: string) => void
}

const pickerItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
    return <Picker.Item key={`${value}`} label={`${value}초`} value={`${value}`}/>
})


const TimePickerComponent = ({selectedValue, onValueChange}: Props) => {
    return (
        <Picker style={{height: 200, width: 250}}
            selectedValue={selectedValue}
            onValueChange={onValueChange}>
            {pickerItems}
        </Picker>
    )
}

export default TimePickerComponent
