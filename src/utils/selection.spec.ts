import { Color } from '../ts/enums'
import { highlightTextItems } from './selection'
import { SelectionRange, TextItem } from '../ts/interfaces'

describe('highlightTextItems, select within a single node, highlight text is red', () => {
    const textItems: TextItem[] = [
        { color: Color.GREEN, text: `Lorem ` },
        { color: Color.EMPTY, text: `Ipsum is simply dummy ` },
        { color: Color.RED, text: `text` }
    ]
    describe('when anchorIndex is negative', () => {
        it('should return unchanged array', () => {
            const range: SelectionRange = {
                anchorIndex: -1,
                focusIndex: 1,
                anchorOffset: 6,
                focusOffset: 11
            }
            const actual = highlightTextItems({ textItems, range })
            expect(actual).toEqual(textItems)
        })
    })
    describe('when selected textItem starts in the middle', () => {
        it('should return', () => {
            const range: SelectionRange = {
                anchorIndex: 1,
                focusIndex: 1,
                anchorOffset: 6,
                focusOffset: 11
            }
            const actual = highlightTextItems({ textItems, range })
            const expected = [
                { color: Color.GREEN, text: `Lorem ` },
                { color: Color.EMPTY, text: `Ipsum ` },
                { color: Color.RED, text: `is si` },
                { color: Color.EMPTY, text: `mply dummy ` },
                { color: Color.RED, text: `text` }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected textItem starts in the middle from right to left', () => {
        it('should return', () => {
            const range: SelectionRange = {
                anchorIndex: 1,
                focusIndex: 1,
                anchorOffset: 11,
                focusOffset: 6
            }
            const actual = highlightTextItems({ textItems, range })
            const expected = [
                { color: Color.GREEN, text: `Lorem ` },
                { color: Color.EMPTY, text: `Ipsum ` },
                { color: Color.RED, text: `is si` },
                { color: Color.EMPTY, text: `mply dummy ` },
                { color: Color.RED, text: `text` }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected textItem starts from beginning', () => {
        it('should return', () => {
            const range: SelectionRange = {
                anchorIndex: 1,
                focusIndex: 1,
                anchorOffset: 0,
                focusOffset: 8
            }
            const actual = highlightTextItems({ textItems, range })
            const expected = [
                { color: Color.GREEN, text: `Lorem ` },
                { color: Color.RED, text: `Ipsum is` },
                { color: Color.EMPTY, text: ` simply dummy ` },
                { color: Color.RED, text: `text` }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected textItem ends at the end', () => {
        it('should return', () => {
            const range: SelectionRange = {
                anchorIndex: 1,
                focusIndex: 1,
                anchorOffset: 16,
                focusOffset: 22
            }
            const actual = highlightTextItems({ textItems, range })
            const expected = [
                { color: Color.GREEN, text: `Lorem ` },
                { color: Color.EMPTY, text: `Ipsum is simply ` },
                { color: Color.RED, text: `dummy text` }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected textItem covers the whole node (and the next has the same color)', () => {
        it('should set color', () => {
            const range: SelectionRange = {
                anchorIndex: 1,
                focusIndex: 1,
                anchorOffset: 0,
                focusOffset: 22
            }
            const actual = highlightTextItems({ textItems, range })
            const expected = [
                { color: Color.GREEN, text: `Lorem ` },
                { color: Color.RED, text: `Ipsum is simply dummy text` }
            ]
            expect(actual).toEqual(expected)
        })
        it('should NOT reset color', () => {
            const range: SelectionRange = {
                anchorIndex: 1,
                focusIndex: 1,
                anchorOffset: 0,
                focusOffset: 22
            }
            const changedTextItems = highlightTextItems({ textItems, range })
            const actual = highlightTextItems({ textItems: changedTextItems, range })
            const expected = [
                { color: Color.GREEN, text: `Lorem ` },
                { color: Color.RED, text: `Ipsum is simply dummy text` }
            ]
            expect(actual).toEqual(expected)
        })
    })
})
describe('highlightTextItems, select within two nodes, highlight text is red', () => {
    const textItems: TextItem[] = [
        { color: Color.GREEN, text: `Lorem ` },
        { color: Color.EMPTY, text: `Ipsum is simply dummy ` },
        { color: Color.RED, text: `text` }
    ]
    describe('when selected textItem starts in the middle of anchor node and ends in the middle of focus node', () => {
        it('should return', () => {
            const range: SelectionRange = {
                anchorIndex: 0,
                focusIndex: 1,
                anchorOffset: 3,
                focusOffset: 5
            }
            const actual = highlightTextItems({ textItems, range })
            const expected = [
                { color: Color.GREEN, text: `Lor` },
                { color: Color.RED, text: `em Ipsum` },
                { color: Color.EMPTY, text: ` is simply dummy ` },
                { color: Color.RED, text: `text` }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected textItem starts in the middle from right to left', () => {
        it('should return', () => {
            const range: SelectionRange = {
                anchorIndex: 1,
                focusIndex: 0,
                anchorOffset: 5,
                focusOffset: 3
            }
            const actual = highlightTextItems({ textItems, range })
            const expected = [
                { color: Color.GREEN, text: `Lor` },
                { color: Color.RED, text: `em Ipsum` },
                { color: Color.EMPTY, text: ` is simply dummy ` },
                { color: Color.RED, text: `text` }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected textItem starts from beginning', () => {
        it('should return', () => {
            const range: SelectionRange = {
                anchorIndex: 0,
                focusIndex: 1,
                anchorOffset: 0,
                focusOffset: 8
            }
            const actual = highlightTextItems({ textItems, range })
            const expected = [
                { color: Color.RED, text: `Lorem Ipsum is` },
                { color: Color.EMPTY, text: ` simply dummy ` },
                { color: Color.RED, text: `text` }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected textItem starts in the middle of anchor node and ends at the end of focus node (and the next one is the same color)', () => {
        it('should return', () => {
            const range: SelectionRange = {
                anchorIndex: 0,
                focusIndex: 1,
                anchorOffset: 3,
                focusOffset: 22
            }
            const actual = highlightTextItems({ textItems, range })
            const expected = [
                { color: Color.GREEN, text: `Lor` },
                { color: Color.RED, text: `em Ipsum is simply dummy text` }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected textItem covers the whole two nodes (and the next has the same color)', () => {
        it('should set color', () => {
            const range: SelectionRange = {
                anchorIndex: 0,
                focusIndex: 1,
                anchorOffset: 0,
                focusOffset: 22
            }
            const actual = highlightTextItems({ textItems, range })
            const expected = [{ color: Color.RED, text: `Lorem Ipsum is simply dummy text` }]
            expect(actual).toEqual(expected)
        })
        it('should NOT reset color', () => {
            const range: SelectionRange = {
                anchorIndex: 0,
                focusIndex: 1,
                anchorOffset: 0,
                focusOffset: 22
            }
            const changedTextItems = highlightTextItems({ textItems, range })
            const secondRange: SelectionRange = {
                anchorIndex: 0,
                focusIndex: 0,
                anchorOffset: 0,
                focusOffset: 22
            }
            const actual = highlightTextItems({ textItems: changedTextItems, range: secondRange })
            const expected = [{ color: Color.RED, text: `Lorem Ipsum is simply dummy text` }]
            expect(actual).toEqual(expected)
        })
    })
})
describe('highlightTextItems, select within three nodes, highlight text is red', () => {
    const textItems: TextItem[] = [
        { color: Color.RED, text: `R ` },
        { color: Color.GREEN, text: `G ` },
        { color: Color.EMPTY, text: `X ` },
        { color: Color.RED, text: `R ` },
        { color: Color.EMPTY, text: `X ` },
        { color: Color.RED, text: `R ` }
    ]
    describe('when selected (red - green - empty)', () => {
        it('should return', () => {
            const range: SelectionRange = {
                anchorIndex: 0,
                focusIndex: 2,
                anchorOffset: 1,
                focusOffset: 1
            }
            const actual = highlightTextItems({ textItems, range })
            const expected = [
                { color: Color.RED, text: `R G X` },
                { color: Color.EMPTY, text: ` ` },
                { color: Color.RED, text: `R ` },
                { color: Color.EMPTY, text: `X ` },
                { color: Color.RED, text: `R ` }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected (green - empty - red)', () => {
        it('should return', () => {
            const range: SelectionRange = {
                anchorIndex: 1,
                focusIndex: 3,
                anchorOffset: 0,
                focusOffset: 1
            }
            const actual = highlightTextItems({ textItems, range })
            const expected = [
                { color: Color.RED, text: `R G X R ` },
                { color: Color.EMPTY, text: `X ` },
                { color: Color.RED, text: `R ` }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected (empty - red - empty)', () => {
        it('should return', () => {
            const range: SelectionRange = {
                anchorIndex: 2,
                focusIndex: 4,
                anchorOffset: 0,
                focusOffset: 2
            }
            const actual = highlightTextItems({ textItems, range })
            const expected = [
                { color: Color.RED, text: `R ` },
                { color: Color.GREEN, text: `G ` },
                { color: Color.RED, text: `X R X R ` }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected (empty - red - empty)', () => {
        it('should return', () => {
            const range: SelectionRange = {
                anchorIndex: 2,
                focusIndex: 4,
                anchorOffset: 0,
                focusOffset: 1
            }
            const actual = highlightTextItems({ textItems, range })
            const expected = [
                { color: Color.RED, text: `R ` },
                { color: Color.GREEN, text: `G ` },
                { color: Color.RED, text: `X R X` },
                { color: Color.EMPTY, text: ` ` },
                { color: Color.RED, text: `R ` }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected (red - empty - red)', () => {
        it('should return', () => {
            const range: SelectionRange = {
                anchorIndex: 0,
                focusIndex: 5,
                anchorOffset: 1,
                focusOffset: 1
            }
            const actual = highlightTextItems({ textItems, range })
            const expected = [{ color: Color.RED, text: `R G X R X R ` }]
            expect(actual).toEqual(expected)
        })
    })
})

/*
describe('highlightText', () => {
    describe('when several textItems with the same color', () => {
        it('should be combined in a single textItem', () => {
            const text: TextItem[] = [
                { color: Color.RED, text: 'Lorem ' },
                { color: '', text: 'Ipsum' },
                { color: Color.RED, text: ' is ' },
                { color: '', text: 'simply dummy text of the...' }
            ]
            const range: SelectionRange = {
                textContent: 'Ipsum',
                anchorOffset: 0,
                focusOffset: 5
            }
            const color = Color.RED
            const actual = highlightText({ textItems: text, range, color })
            const expected: TextItem[] = [
                { color: Color.RED, text: 'Lorem Ipsum is ' },
                { color: '', text: 'simply dummy text of the...' }
            ]
            expect(actual).toEqual(expected)
        })
    })
})

*/
