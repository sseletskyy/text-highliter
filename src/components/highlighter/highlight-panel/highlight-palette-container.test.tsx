import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { InitialState } from '../../../ts/interfaces'
import { Color, FilterPanelSortBy } from '../../../ts/enums'
import HighlightPaletteContainer from './highlight-palette-container'

describe('TextAreaContainer', () => {
    const initialState: InitialState = {
        highlightColor: Color.GREEN,
        filterColors: new Set(),
        filterPanelSortBy: FilterPanelSortBy.BY_APPEARANCE,
        textItems: [{ color: Color.RED, text: 'Red' }]
    }
    const mockStore = configureStore()
    let store, wrapper
    beforeEach(() => {
        store = mockStore(initialState)
        wrapper = mount(
            <Provider store={store}>
                <HighlightPaletteContainer />
            </Provider>
        )
    })

    it('should read textItems from redux store', () => {
        expect(wrapper.find('.highlight-palette').html()).toContain('<div class="color-picker green selected"></div>')
    })
})
