import { createSlice, PayloadAction } from 'redux-starter-kit'
import { InitialState, TextItem } from '../ts/interfaces'
import { Color, FilterPanelSortBy } from '../ts/enums'

export const initialState: InitialState = {
    filterColors: new Set(),
    filterPanelSortBy: FilterPanelSortBy.BY_APPEARANCE,
    highlightColor: Color.RED,
    textItems: [
        {
            color: Color.EMPTY,
            text: `Lorem `
        },
        {
            color: Color.RED,
            text: `Ipsum`
        },
        {
            color: Color.EMPTY,
            text: ` is simply dummy text of the printing and typesetting industry. `
        },
        {
            color: Color.YELLOW,
            text: `Lorem Ipsum`
        },
        {
            color: Color.EMPTY,
            text: ` has been the industry’s `
        },
        {
            color: Color.GREEN,
            text: `standard`
        },
        {
            color: Color.EMPTY,
            text: ` dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
        }
    ]
}

export const updateTextItems = (state: InitialState, action: PayloadAction<TextItem[]>) => {
    state.textItems = action.payload
}

export const updateHighlightColor = (state: InitialState, action: PayloadAction<Color>) => {
    state.highlightColor = state.highlightColor === action.payload ? Color.EMPTY : action.payload
}

export const updateFilterColor = (state: InitialState, action: PayloadAction<Color>) => {
    state.filterColors.has(action.payload)
        ? state.filterColors.delete(action.payload)
        : state.filterColors.add(action.payload)
    state.filterColors = new Set(state.filterColors)
}

export const updateFilterPanelSortBy = (state: InitialState, action: PayloadAction<FilterPanelSortBy>) => {
    state.filterPanelSortBy = action.payload
}

const slice = createSlice({
    initialState,
    reducers: {
        updateFilterColor,
        updateFilterPanelSortBy,
        updateHighlightColor,
        updateTextItems
    }
})

export default slice.reducer
export const actions = { ...slice.actions }
