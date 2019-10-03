import React from 'react'
import styled from '@emotion/styled'
import FilterPaletteContainer from './filter-palette-container'
import { FilterTextArea } from './filter-text-area'
import { SortingContainer } from './sorting-container'

const StyledArea = styled.div`
    .flex {
        display: flex;
        align-items: left;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .right-column {
        width: auto;
        padding: 15px 0;
    }
`

export const FilterPanel = () => {
    return (
        <StyledArea>
            <div className="flex">
                <FilterPaletteContainer />
                <div className="right-column">
                    <SortingContainer />
                </div>
            </div>
            <FilterTextArea />
        </StyledArea>
    )
}
