import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { FilterPanel } from './filter-panel'
import { InitialState } from '../../../ts/interfaces'
import { Color, FilterPanelSortBy } from '../../../ts/enums'
import FilterPaletteContainer from './filter-palette-container'
import { SortingContainer } from './sorting-container'
import { FilterTextArea } from './filter-text-area'

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
                <FilterPanel />
            </Provider>
        )
    })
    it('should render SortingContainer', () => {
        expect(wrapper.find(SortingContainer).length).toEqual(1)
    })
    it('should render FilterTextArea', () => {
        expect(wrapper.find(FilterTextArea).length).toEqual(1)
    })
    it('should render FilterPaletteContainer', () => {
        expect(wrapper.find(FilterPaletteContainer).length).toEqual(1)
    })
})
