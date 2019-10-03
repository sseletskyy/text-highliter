import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ColorPalette } from './color-palette'
import { Color } from '../../ts/enums'
import { InitialState } from '../../ts/interfaces'
import { actions } from '../../data/reducers'

const HighlightPaletteContainer = () => {
    const dispatch = useDispatch()
    const { highlightColor } = useSelector((state: InitialState) => state)

    const updateColor = (color: Color) => () => {
        dispatch(actions.updateHighlightColor(color))
    }

    return (
        <div className="highlight-palette">
            <ColorPalette selectedColors={[highlightColor]} updateColor={updateColor} />
        </div>
    )
}

export default HighlightPaletteContainer
