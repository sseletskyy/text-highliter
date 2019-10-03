import React from 'react'
import { shallow } from 'enzyme'
import Home from '../index'
describe('Home', () => {
    it('should have h1 with content Test', () => {
        const app = shallow(<Home />)
        expect(app.text()).toEqual('<Highlighter />')
    })
})
