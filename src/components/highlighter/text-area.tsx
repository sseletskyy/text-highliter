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
        const anchorNode = selection.anchorNode.parentElement
        const focusNode = selection.focusNode.parentElement
        const allNodes = Array.from(anchorNode.parentElement.children)
        const range: SelectionRange = {
            anchorIndex: allNodes.findIndex(el => el === anchorNode),
            anchorOffset: selection.anchorOffset,
            focusIndex: allNodes.findIndex(el => el === focusNode),
            focusOffset: selection.focusOffset
        }
        selection.removeAllRanges()
        onSelection(range)
    }

    return (
        <StyledTextArea>
            <div className="highlight-text-area" onMouseUp={handleSelection}>
                {textItems.map(renderTextItem)}
            </div>
        </StyledTextArea>
    )
}
