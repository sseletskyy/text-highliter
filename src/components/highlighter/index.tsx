import React from 'react'
import { ColorPalette } from './color-palette'
import { TextAreaContainer } from './text-area-container'

export const Highlighter = () => {
    return (
        <section className="highlight-section">
            <ColorPalette />
            <TextAreaContainer />
        </section>
    )
}
