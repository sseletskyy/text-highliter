import React from 'react'
import { ColorPalette } from './color-palette'
import { TextArea } from './text-area'

export const Highlighter = () => {
    const textItems = [
        { color: '', text: 'Lorem Ipsum ' },
        { color: 'red', text: 'abc' },
        { color: '', text: ' some text ' },
        { color: 'yellow', text: 'yellow' },
        { color: '', text: ' ' },
        { color: 'green', text: 'green' }
    ]
    return (
        <section className="highlight-section">
            <ColorPalette />
            <TextArea textItems={textItems} />
        </section>
    )
}
