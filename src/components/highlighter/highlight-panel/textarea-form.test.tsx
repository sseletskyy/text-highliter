import React from 'react'
import { mount } from 'enzyme'
import { TextareaForm } from './textarea-form'

describe('TextareaForm', () => {
    it('should trigger onSubmit when clicked submit button', () => {
        const mockSubmit = jest.fn()
        const mockCancel = jest.fn()
        const defaultText = 'ABC'
        const wrapper = mount(<TextareaForm onSubmit={mockSubmit} onCancel={mockCancel} defaultText={defaultText} />)
        expect(mockSubmit.mock.calls.length).toEqual(0)
        wrapper.find('form').simulate('submit', { preventDefault: () => {} })
        expect(mockSubmit.mock.calls.length).toEqual(1)
        expect(mockSubmit.mock.calls[0][0]).toEqual(defaultText)
    })
})
