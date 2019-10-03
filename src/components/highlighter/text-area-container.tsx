import React from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { InitialState } from '../../ts/interfaces'
import { TextArea } from './text-area'

const StyledTextArea = styled.div`
    display: flex;
    flex-direction: column;

    p {
        font-size: 1.5em;
    }
`
export const TextAreaContainer = () => {
    const { textItems } = useSelector((state: InitialState) => state)
    return (
        <StyledTextArea>
            <TextArea textItems={textItems} />
        </StyledTextArea>
    )
}
