import React from 'react'
import styled from '@emotion/styled'
import { ColorPicker } from './color-picker'
import { Color } from '../../ts/enums'

const StyledColorPalette = styled.div`
    display: flex;
    flex-direction: row;
    margin: 15px 0;
`

export const ColorPalette = () => {
    const palette = [Color.RED, Color.YELLOW, Color.GREEN]
    const handleClick = _ => () => {}
    const renderColorPicker = (color, index) => (
        <ColorPicker color={color} key={index} onClick={handleClick(color)} selected={color === Color.RED} />
    )
    return <StyledColorPalette>{palette.map(renderColorPicker)}</StyledColorPalette>
}
