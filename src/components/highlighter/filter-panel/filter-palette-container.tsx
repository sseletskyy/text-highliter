import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ColorPalette } from '../color-palette'
import { actions } from '../../../data/reducers'
import { Color } from '../../../ts/enums'
import { InitialState } from '../../../ts/interfaces'

const FilterPaletteContainer = () => {
    const dispatch = useDispatch()
    const { filterColors } = useSelector((state: InitialState) => state)

    const updateColor = (color: Color) => () => {
        dispatch(actions.updateFilterColor(color))
    }

    return <ColorPalette selectedColors={Array.from(filterColors)} updateColor={updateColor} />
}

export default FilterPaletteContainer
