import { textItemsToString } from './helpers'
import { TextItem } from '../ts/interfaces'
import { Color } from '../ts/enums'

describe('textItemsToString', () => {
    it('should return a plain text', () => {
        const textItems: TextItem[] = [
            { color: Color.GREEN, text: `Lorem ` },
            { color: Color.EMPTY, text: `Ipsum ` },
            { color: Color.RED, text: `text` }
        ]
        const actual = textItemsToString(textItems)
        const expected = `Lorem Ipsum text`
        expect(actual).toEqual(expected)
    })
})
