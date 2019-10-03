import { createSlice } from 'redux-starter-kit'
import { InitialState } from '../ts/interfaces'

export const initialState: InitialState = {
    textItems: [
        {
            color: '',
            text: `Lorem `
        },
        {
            color: 'red',
            text: `Ipsum`
        },
        {
            color: '',
            text: ` is simply dummy text of the printing and typesetting industry. `
        },
        {
            color: 'yellow',
            text: `Lorem Ipsum`
        },
        {
            color: '',
            text: ` has been the industry’s `
        },
        {
            color: 'green',
            text: `standard`
        },
        {
            color: '',
            text: ` dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
        }
    ]
}

const slice = createSlice({
    initialState,
    reducers: {}
})

export default slice.reducer
