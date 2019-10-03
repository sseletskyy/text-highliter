import React from 'react'
import { shallow } from 'enzyme'

import { ColorPicker } from './color-picker'
import { Color } from '../../ts/enums'

describe(' ColorPicker', () => {
    it('should render as red', () => {
        const baseElement = shallow(<ColorPicker color={Color.RED} onClick={() => {}} />).find('.color-picker')
        // console.log(baseElement.html())
        expect(baseElement.html()).toEqual('<div class="color-picker red"></div>')
    })
    it('should render as yellow', () => {
        const baseElement = shallow(<ColorPicker color={Color.YELLOW} onClick={() => {}} />).find('.color-picker')
        expect(baseElement.html()).toEqual('<div class="color-picker yellow"></div>')
    })
    it('should render as selected', () => {
        const wrapper = shallow(<ColorPicker color={Color.RED} selected={true} onClick={() => {}} />).find(
            '.color-picker'
        )
        expect(wrapper.html()).toEqual('<div class="color-picker red selected"></div>')
    })

    describe('when clicked', () => {
        it('should call onClick prop', () => {
            const mockClick = jest.fn()
            const wrapper = shallow(<ColorPicker color={Color.RED} onClick={mockClick} />)
            expect(mockClick.mock.calls.length).toEqual(0)
            wrapper.find('.color-picker').simulate('click')
            expect(mockClick.mock.calls.length).toEqual(1)
        })
    })
})
