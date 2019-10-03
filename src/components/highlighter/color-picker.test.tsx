import React from 'react'
import { shallow } from 'enzyme'

import { ColorPicker } from './color-picker'

describe(' ColorPicker', () => {
    it('should render red color picker', () => {
        const baseElement = shallow(<ColorPicker color={'red'} />).find('.color-picker')
        // console.log(baseElement.html())
        expect(baseElement.html()).toEqual('<div class="color-picker red"></div>')
    })
    it('should render yellow color picker', () => {
        const baseElement = shallow(<ColorPicker color={'yellow'} />).find('.color-picker')
        // console.log(baseElement.html())
        expect(baseElement.html()).toEqual('<div class="color-picker yellow"></div>')
    })
})
