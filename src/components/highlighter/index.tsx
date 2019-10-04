import React from 'react'
import styled from '@emotion/styled'
import { TextAreaContainer } from './highlight-panel/text-area-container'
import HighlightPaletteContainer from './highlight-panel/highlight-palette-container'
import { FilterPanel } from './filter-panel/filter-panel'

const StyledApp = styled.div`
    display: flex;
    align-items: left;
    justify-content: center;
    flex-direction: column;
    max-width: 640px;
    padding: 0 20px;
`

export const Highlighter = () => {
    return (
        <StyledApp>
            <section className="highlight-section">
                <HighlightPaletteContainer />
                <TextAreaContainer />
            </section>
            <section className="filter-section">
                <FilterPanel />
            </section>
        </StyledApp>
    )
}
