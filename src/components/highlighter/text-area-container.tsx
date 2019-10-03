import React from 'react'
import styled from '@emotion/styled'
import { useSelector, useDispatch } from 'react-redux'
import { InitialState, SelectionRange } from '../../ts/interfaces'
import { TextArea } from './text-area'
import { highlightText } from '../../utils/selection'
import { actions } from '../../data/reducers'

const StyledTextArea = styled.div`
    display: flex;
    flex-direction: column;

    p {
        font-size: 1.5em;
    }
`
export const TextAreaContainer = () => {
    const { textItems, highlightColor } = useSelector((state: InitialState) => state)
    const dispatch = useDispatch()
    const onSelection = (range: SelectionRange) => {
        dispatch(actions.updateTextItems(highlightText({ textItems, range, color: highlightColor })))
    }
    return (
        <StyledTextArea>
            <TextArea textItems={textItems} onSelection={onSelection} />
        </StyledTextArea>
    )
}
