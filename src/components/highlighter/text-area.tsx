import React from 'react'
import styled from '@emotion/styled'
import { TextItem } from '../../ts/interfaces'
import { backgroundColors } from '../common-styles'

interface TextAreaProps {
    textItems: TextItem[]
}

const StyledTextArea = styled.div`
    .highlight-text-area {
        color: black;
        border: 1px solid gray;
        padding: 10px;
        min-height: 150px;
    }
    ${backgroundColors}
`
export const TextArea = (props: TextAreaProps) => {
    const { textItems } = props
    const renderTextItem = (item: TextItem, index: number) => (
        <span key={index} className={item.color}>
            {item.text}
        </span>
    )

    return (
        <StyledTextArea>
            <div className="highlight-text-area">{textItems.map(renderTextItem)}</div>
        </StyledTextArea>
    )
}
