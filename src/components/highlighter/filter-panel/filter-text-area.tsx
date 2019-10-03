import React from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { InitialState, TextItem } from '../../../ts/interfaces'
import { backgroundColors, textArea } from '../../common-styles'
import { FilterPanelSortBy } from '../../../ts/enums'

const StyledTextArea = styled.div`
    ${textArea}
    p {
        font-size: 1em;

        span {
            padding: 0 5px;
        }
    }
    ${backgroundColors}
`

export const FilterTextArea = () => {
    const { textItems, filterColors, filterPanelSortBy } = useSelector((state: InitialState) => state)
    const renderTextItem = (item: TextItem, index: number) => (
        <p key={index}>
            <span className={item.color}>{item.text}</span>
        </p>
    )
    const byFilterColors = (item: TextItem) => {
        return filterColors.has(item.color)
    }
    const byFilterPanelSortBy = (a: TextItem, b: TextItem) => {
        if (filterPanelSortBy === FilterPanelSortBy.BY_NAME) {
            return a.text > b.text ? 1 : a.text < b.text ? -1 : 0
        }
        return undefined
    }
    return (
        <StyledTextArea>
            {textItems
                .filter(byFilterColors)
                .sort(byFilterPanelSortBy)
                .map(renderTextItem)}
        </StyledTextArea>
    )
}
