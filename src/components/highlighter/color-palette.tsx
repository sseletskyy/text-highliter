import React from 'react'
import styled from '@emotion/styled'
import { ColorPicker } from './color-picker'

const StyledColorPalette = styled.div`
    display: flex;
    flex-direction: row;
    margin: 15px 0;
`

export const ColorPalette = () => {
    const palette = ['red', 'yellow', 'green']
    const renderColorPicker = (color, index) => <ColorPicker color={color} key={index} />
    return <StyledColorPalette>{palette.map(renderColorPicker)}</StyledColorPalette>
}
