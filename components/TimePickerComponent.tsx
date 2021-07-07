import {Picker} from '@react-native-picker/picker'
import React, {useCallback} from 'react'

interface Props {
    selectedTime: number
    onValueChange: (val: number) => void
}

const pickerItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
    return <Picker.Item key={`${value}`} label={`${value}초`} value={`${value}`}/>
})


const TimePickerComponent = ({selectedTime, onValueChange}: Props) => {

    const handleValueChange = useCallback((val: string) => {
        onValueChange(Number(val))
    }, [onValueChange])

    const selectedValue = String(selectedTime)

    return (
        <Picker
            style={{height: 200, width: 250}}
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
        >
            {pickerItems}
        </Picker>
    )
}

export default TimePickerComponent
