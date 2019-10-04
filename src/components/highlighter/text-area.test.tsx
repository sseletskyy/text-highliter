import React from 'react'
import { shallow } from 'enzyme'

import { TextArea } from './text-area'
import { TextItem } from '../../ts/interfaces'
import { Color } from '../../ts/enums'

const generateNodes = () => {
    const parentDiv = document.createElement('div')
    const parent = document.createElement('p')
    const textNodeA = document.createTextNode('ABCDE')
    const textNodeB = document.createTextNode('second')
    const nodeA = document.createElement('span')
    const nodeB = document.createElement('span')
    nodeA.appendChild(textNodeA)
    nodeB.appendChild(textNodeB)
    parent.appendChild(nodeA)
    parent.appendChild(nodeB)
    parentDiv.appendChild(parent)
    return {
        textNodeA,
        textNodeB
    }
}

const generateGetSelectionOfSameNode = () => {
    // @ts-ignore
    window.getSelection = () => {
        const { textNodeA } = generateNodes()
        return {
            removeAllRanges: () => {},
            anchorNode: textNodeA,
            focusNode: textNodeA,
            anchorOffset: 1,
            focusOffset: 4
        }
    }
}
const generateGetSelectionOfDiffNodes = () => {
    // @ts-ignore
    window.getSelection = () => {
        const { textNodeA, textNodeB } = generateNodes()
        return {
            removeAllRanges: () => {},
            anchorNode: textNodeA,
            focusNode: textNodeB,
            anchorOffset: 4,
            focusOffset: 1
        }
    }
}

describe('TextArea', () => {
    let mockEvent
    beforeEach(() => {
        generateGetSelectionOfSameNode()
        mockEvent = jest.fn()
    })
    it('should render one span', () => {
        const textItems: TextItem[] = [{ color: Color.RED, text: 'ABC' }]
        const spans = shallow(<TextArea textItems={textItems} onSelection={() => {}} />).find('span')
        expect(spans.length).toEqual(1)
        expect(spans.text()).toEqual('ABC')
    })
    it('should render two spans with different colors', () => {
        const textItems: TextItem[] = [{ color: Color.RED, text: 'ABC' }, { color: Color.YELLOW, text: 'FGH' }]
        const wrapper = shallow(<TextArea textItems={textItems} onSelection={() => {}} />)
        const spans = wrapper.find('span')
        expect(spans.length).toEqual(2)
        expect(wrapper.text()).toEqual('ABCFGH')
        expect(spans.at(0).html()).toEqual('<span class="red">ABC</span>')
        expect(spans.at(1).html()).toEqual('<span class="yellow">FGH</span>')
    })
    it('should call onSelection prop when selection within a single node', () => {
        const textItems: TextItem[] = [{ color: Color.EMPTY, text: ' ABC ' }, { color: Color.YELLOW, text: ' FGH' }]
        const wrapper = shallow(<TextArea textItems={textItems} onSelection={mockEvent} />)
        expect(mockEvent.mock.calls.length).toEqual(0)
        const textAreaComponent = wrapper.find('.highlight-text-area')
        textAreaComponent.simulate('mouseup')
        expect(mockEvent.mock.calls.length).toEqual(1)
    })
    it('should call onSelection prop when selection within different nodes', () => {
        generateGetSelectionOfDiffNodes()
        const textItems: TextItem[] = [{ color: Color.EMPTY, text: ' ABC ' }, { color: Color.YELLOW, text: ' FGH' }]
        const wrapper = shallow(<TextArea textItems={textItems} onSelection={mockEvent} />)
        expect(mockEvent.mock.calls.length).toEqual(0)
        const textAreaComponent = wrapper.find('.highlight-text-area')
        textAreaComponent.simulate('mouseup')
        expect(mockEvent.mock.calls.length).toEqual(1)
    })
})
