import React from 'react'
import { mount } from 'enzyme'
import { Color, FilterPanelSortBy } from '../../../ts/enums'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { InitialState } from '../../../ts/interfaces'
import { FilterTextArea } from './filter-text-area'

describe('FiterTextArea', () => {
    const setup = (filterColors, filterPanelSortBy) => {
        const initialState: InitialState = {
            highlightColor: Color.EMPTY,
            filterColors,
            filterPanelSortBy,
            textItems: [{ color: Color.RED, text: 'Red' }, { color: Color.RED, text: 'First' }]
        }
        const mockStore = configureStore()
        const store = mockStore(initialState)
        const wrapper = mount(
            <Provider store={store}>
                <FilterTextArea />
            </Provider>
        )
        return {
            store,
            wrapper
        }
    }
    it('should render two <p>', () => {
        const { wrapper } = setup(new Set([Color.RED]), FilterPanelSortBy.BY_APPEARANCE)
        expect(wrapper.find('p').length).toEqual(2)
        expect(wrapper.text()).toEqual('RedFirst')
    })
    it('should render two <p>', () => {
        const { wrapper } = setup(new Set([Color.RED]), FilterPanelSortBy.BY_NAME)
        expect(wrapper.find('p').length).toEqual(2)
        expect(wrapper.text()).toEqual('FirstRed')
    })
    it('should render no <p>', () => {
        const { wrapper } = setup(new Set([Color.YELLOW]), FilterPanelSortBy.BY_NAME)
        expect(wrapper.find('p').length).toEqual(0)
    })
})
