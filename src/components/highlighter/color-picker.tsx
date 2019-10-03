import React from 'react'
import styled from '@emotion/styled'
import { cx } from 'emotion'
import { backgroundColors } from '../common-styles'
import { Color } from '../../ts/enums'
interface ColorPickerProps {
    color: Color
    onClick: () => void
    selected?: boolean
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

    .selected {
        box-shadow: rgb(128, 128, 128) 4px 4px 4px 0px;
    }
    ${backgroundColors}
`
export const ColorPicker = (props: ColorPickerProps) => {
    const { color, onClick, selected = false } = props
    return (
        <StyledColorPicker>
            <div onClick={onClick} className={cx('color-picker', color, { selected })} />
        </StyledColorPicker>
    )
}
