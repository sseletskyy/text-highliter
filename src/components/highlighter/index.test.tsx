import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { InitialState } from '../../ts/interfaces'
import { Color, FilterPanelSortBy } from '../../ts/enums'
import { Highlighter } from './index'
import HighlightPaletteContainer from './highlight-panel/highlight-palette-container'
import { TextAreaContainer } from './highlight-panel/text-area-container'
import { FilterPanel } from './filter-panel/filter-panel'

describe('FilterPanel', () => {
    let store, wrapper
    beforeEach(() => {
        const initialState: InitialState = {
            highlightColor: Color.EMPTY,
            filterColors: new Set(),
            filterPanelSortBy: FilterPanelSortBy.BY_APPEARANCE,
            textItems: [{ color: Color.RED, text: 'Red' }]
        }
        const mockStore = configureStore()
        store = mockStore(initialState)
        wrapper = mount(
            <Provider store={store}>
                <Highlighter />
            </Provider>
        )
    })
    it('should render HighlightPaletteContainer', () => {
        expect(wrapper.find(HighlightPaletteContainer).length).toEqual(1)
    })
    it('should render FilterTextArea', () => {
        expect(wrapper.find(TextAreaContainer).length).toEqual(1)
    })
    it('should render FilterPaletteContainer', () => {
        expect(wrapper.find(FilterPanel).length).toEqual(1)
    })
})
