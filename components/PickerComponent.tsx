import { Picker } from '@react-native-picker/picker'
import React from 'react'

interface Props {
    selectedValue: string
    onValueChange: (val: string) => void
}

const PickerComponent = ({selectedValue, onValueChange}: Props) => {
    return (
        <Picker style={{height: 200, width: 250}}
            selectedValue={selectedValue}
            onValueChange={onValueChange}>
            <Picker.Item label='1초' value='1'/>
            <Picker.Item label='2초' value='2'/>
            <Picker.Item label='3초' value='3'/>
            <Picker.Item label='4초' value='4'/>
            <Picker.Item label='5초' value='5'/>
            <Picker.Item label='6초' value='6'/>
            <Picker.Item label='7초' value='7'/>
            <Picker.Item label='8초' value='8'/>
            <Picker.Item label='9초' value='9'/>
            <Picker.Item label='10초' value='10'/>
        </Picker>
    )
}

export default PickerComponent
