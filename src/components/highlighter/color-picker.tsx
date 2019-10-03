import React from 'react'
import styled from '@emotion/styled'

interface ColorPickerProps {
    color: string
    key?: string
}

const StyledColorPicker = styled.div`
    .color-picker {
        margin-right: 15px;
        width: 75px;
        height: 40px;
        border: 1px solid black;
        display: inline-block;
    }
    .red {
        background-color: red;
    }

    .yellow {
        background-color: yellow;
    }

    .green {
        background-color: lightgreen;
    }
`
export const ColorPicker = (props: ColorPickerProps) => {
    const { color } = props
    return (
        <StyledColorPicker>
            <div className={`color-picker ${color}`} />
        </StyledColorPicker>
    )
}
