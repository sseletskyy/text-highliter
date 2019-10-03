import React from 'react'
import { shallow } from 'enzyme'

import { TextArea } from './text-area'
import { TextItem } from '../../ts/interfaces'

describe('TextArea', () => {
    it('should render one span', () => {
        const textItems: TextItem[] = [{ color: 'red', text: 'ABC' }]
        const spans = shallow(<TextArea textItems={textItems} />).find('span')
        expect(spans.length).toEqual(1)
        expect(spans.text()).toEqual('ABC')
    })
    it('should render two spans with different colors', () => {
        const textItems: TextItem[] = [{ color: 'red', text: 'ABC' }, { color: 'yellow', text: 'FGH' }]
        const wrapper = shallow(<TextArea textItems={textItems} />)
        const spans = wrapper.find('span')
        expect(spans.length).toEqual(2)
        expect(wrapper.text()).toEqual('ABCFGH')
        expect(spans.at(0).html()).toEqual('<span class="red">ABC</span>')
        expect(spans.at(1).html()).toEqual('<span class="yellow">FGH</span>')
    })
})
