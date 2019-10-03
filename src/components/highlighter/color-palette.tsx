import React from 'react'
import styled from '@emotion/styled'
import { ColorPicker } from './color-picker'
import { Color } from '../../ts/enums'

export interface ColorPaletteProps {
    selectedColors: Color[] | string[]
    updateColor: (color: Color) => () => void
}

const StyledColorPalette = styled.div`
    display: flex;
    flex-direction: row;
    margin: 15px 0;
`

export const ColorPalette = (props: ColorPaletteProps) => {
    const { updateColor, selectedColors } = props
    const palette = [Color.RED, Color.YELLOW, Color.GREEN]
    const renderColorPicker = (color, index) => (
        <ColorPicker
            color={color}
            key={index}
            onClick={updateColor(color)}
            selected={selectedColors.some(item => item === color)}
        />
    )
    return <StyledColorPalette>{palette.map(renderColorPicker)}</StyledColorPalette>
}
