import {Picker} from '@react-native-picker/picker'
import React, {useCallback} from 'react'
import _ from 'lodash'

interface Props {
    selectedTime: number
    onValueChange: (val: number) => void
}

const PICKER_MAX_SECOND = 10

const resolvePickerItems = (itemCount: number) => {
    return _.range(1, itemCount + 1).map((value) => {
        return <Picker.Item
            key={`${value}`}
            label={`${value}초`}
            value={`${value}`}
        />
    })
}

const TimePickerComponent = ({selectedTime, onValueChange}: Props) => {
    const handleValueChange = useCallback((val: string) => {
        onValueChange(Number(val))
    }, [onValueChange])

    const selectedValue = String(selectedTime)

    const pickerItems = resolvePickerItems(PICKER_MAX_SECOND)

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
