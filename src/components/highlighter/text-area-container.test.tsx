import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { InitialState } from '../../ts/interfaces'
import { TextAreaContainer } from './text-area-container'
import { Color } from '../../ts/enums'

describe('TextAreaContainer', () => {
    const initialState: InitialState = {
        highlightColor: Color.EMPTY,
        textItems: [{ color: Color.RED, text: 'Red' }]
    }
    const mockStore = configureStore()
    let store, wrapper
    beforeEach(() => {
        store = mockStore(initialState)
        wrapper = mount(
            <Provider store={store}>
                <TextAreaContainer />
            </Provider>
        )
    })

    it('should read textItems from redux store', () => {
        expect(
            wrapper
                .find('.highlight-text-area')
                .children()
                .html()
        ).toEqual('<span class="red">Red</span>')
    })
})
