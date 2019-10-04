import React, { useState } from 'react'
import styled from '@emotion/styled'

interface TextareaFormProps {
    defaultText: string
    onSubmit: (str: string) => void
    onCancel: React.FormEventHandler
}

const StyledTextAreaForm = styled.div`
    textarea {
        width: 100%;
        height: 150px;
        font-size: 1.3em;
    }
`

export const TextareaForm = (props: TextareaFormProps) => {
    const { defaultText, onSubmit, onCancel } = props
    const [textAreaValue, updateTextAreaValue] = useState<string>(defaultText)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(textAreaValue)
    }

    const handleTextAreaChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        updateTextAreaValue(e.currentTarget.value)
    }

    return (
        <StyledTextAreaForm>
            <form onSubmit={handleSubmit}>
                <textarea value={textAreaValue} onChange={handleTextAreaChange} />
                <input type="submit" value="Submit" />
                <input type="reset" value="Cancel" onClick={onCancel} />
            </form>
        </StyledTextAreaForm>
    )
}
