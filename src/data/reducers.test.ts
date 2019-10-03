import { initialState, updateTextItems } from './reducers'
import { createAction } from 'redux-starter-kit'
import { Color } from '../ts/enums'

describe('updateTextItems', () => {
    const action = createAction('updateTextItems')
    it('should keep text items with no color', () => {
        const payload = [
            { color: '', text: 'Lorem ' },
            { color: Color.RED, text: 'Ipsum' },
            {
                color: '',
                text: ` is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
            }
        ]
        const state = { ...initialState }
        updateTextItems(state, action(payload))
        const actual = state.textItems
        expect(actual).toEqual(payload)
    })
})
