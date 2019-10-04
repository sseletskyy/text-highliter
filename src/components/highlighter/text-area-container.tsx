import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useSelector, useDispatch } from 'react-redux'
import { InitialState, SelectionRange } from '../../ts/interfaces'
import { TextArea } from './text-area'
import { highlightTextItems } from '../../utils/selection'
import { actions } from '../../data/reducers'
import { HighlightTextAreaMode as Mode } from '../../ts/enums'
import { TextareaForm } from './textarea-form'
import { textItemsToString } from '../../utils/helpers'

const StyledTextArea = styled.div`
    display: flex;
    flex-direction: column;

    p {
        font-size: 1.5em;
    }
    .edit-button,
    input {
        color: blue;
        width: 100px;
        padding: 5px;
        margin: 10px 10px 10px 0;
    }
`

export const TextAreaContainer = () => {
    const { textItems, highlightColor } = useSelector((state: InitialState) => state)
    const dispatch = useDispatch()
    const onSelection = (range: SelectionRange) => {
        dispatch(actions.updateTextItems(highlightTextItems({ textItems, range, color: highlightColor })))
    }
    const [mode, setMode] = useState<Mode>(Mode.READ)

    const setEditMode = () => {
        setMode(Mode.EDIT)
    }
    const handleSubmit = (textareaValue: string) => {
        dispatch(actions.updateTextItems([{ color: '', text: textareaValue }]))
        setMode(Mode.READ)
    }
    const handleCancel = () => {
        setMode(Mode.READ)
    }

    return (
        <StyledTextArea>
            {mode === Mode.READ && (
                <>
                    <TextArea textItems={textItems} onSelection={onSelection} />
                    <button className="edit-button" onClick={setEditMode}>
                        EDIT
                    </button>
                </>
            )}
            {mode === Mode.EDIT && (
                <TextareaForm
                    defaultText={textItemsToString(textItems)}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            )}
        </StyledTextArea>
    )
}
