import React from 'react'
import { TextAreaContainer } from './text-area-container'
import HighlightPaletteContainer from './highlight-palette-container'

export const Highlighter = () => {
    return (
        <section className="highlight-section">
            <HighlightPaletteContainer />
            <TextAreaContainer />
        </section>
    )
}
