import {
    initialState,
    updateFilterColor,
    updateFilterPanelSortBy,
    updateHighlightColor,
    updateTextItems
} from './reducers'
import { createAction } from 'redux-starter-kit'
import { Color, FilterPanelSortBy } from '../ts/enums'

describe('updateTextItems', () => {
    it('should keep text items with no color', () => {
        const action = createAction('updateTextItems')
        const payload = [
            { color: '', text: 'Lorem ' },
            { color: Color.RED, text: 'Ipsum' },
            {
                color: '',
                text: ` is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
            }
        ]
        const state = { ...initialState }
        updateTextItems(state, action(payload))
        const actual = state.textItems
        expect(actual).toEqual(payload)
    })
})

describe('updateHighlightColor', () => {
    it('should toggle color value', () => {
        const action = createAction('updateHighlightColor')
        const payload = Color.RED
        const state = {
            ...initialState,
            highlightColor: Color.RED
        }
        updateHighlightColor(state, action(payload))
        const actual = state.highlightColor
        const expected = Color.EMPTY
        expect(actual).toEqual(expected)
    })
})

describe('updateFilterColor', () => {
    let state
    const action = createAction('updateFilterColor')
    beforeEach(() => {
        state = {
            ...initialState,
            filterColors: new Set([Color.RED, Color.GREEN])
        }
    })
    it('should remove existed color', () => {
        const payload = Color.RED
        updateFilterColor(state, action(payload))
        const actual = Array.from(state.filterColors)
        const expected = [Color.GREEN]
        expect(actual).toEqual(expected)
    })
    it('should add missing color', () => {
        const payload = Color.YELLOW
        updateFilterColor(state, action(payload))
        const actual = Array.from(state.filterColors)
        const expected = [Color.RED, Color.GREEN, Color.YELLOW]
        expect(actual).toEqual(expected)
    })
})
describe('updateFilterPanelSortBy', () => {
    it('should change setting', () => {
        const action = createAction('updateFilterPanelSortBy')
        const state = {
            ...initialState,
            filterPanelSortBy: FilterPanelSortBy.BY_NAME
        }
        const payload = FilterPanelSortBy.BY_APPEARANCE
        updateFilterPanelSortBy(state, action(payload))
        const actual = state.filterPanelSortBy
        expect(actual).toEqual(payload)
    })
})
