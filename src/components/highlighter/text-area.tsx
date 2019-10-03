import React from 'react'
import styled from '@emotion/styled'
import { SelectionRange, TextItem } from '../../ts/interfaces'
import { backgroundColors, textArea } from '../common-styles'

interface TextAreaProps {
    textItems: TextItem[]
    onSelection: (range: SelectionRange) => void
}

const StyledTextArea = styled.div`
    .highlight-text-area {
        ${textArea}
    }
    ${backgroundColors}
`
export const TextArea = (props: TextAreaProps) => {
    const { textItems, onSelection } = props
    const renderTextItem = (item: TextItem, index: number) => (
        <span key={index} className={item.color}>
            {item.text}
        </span>
    )

    const handleSelection = () => {
        const selection = window.getSelection()
        if (selection.anchorNode === selection.focusNode) {
            const range: SelectionRange = {
                textContent: selection.anchorNode.textContent,
                anchorOffset: selection.anchorOffset,
                focusOffset: selection.focusOffset
            }
            onSelection(range)
        } else {
            console.warn('selected different nodes')
        }
    }

    return (
        <StyledTextArea>
            <div className="highlight-text-area" onMouseUp={handleSelection}>
                {textItems.map(renderTextItem)}
            </div>
        </StyledTextArea>
    )
}
