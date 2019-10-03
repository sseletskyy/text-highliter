import { Color } from '../ts/enums'
import { highlightText, highlightTextItem } from './selection'
import { SelectionRange, TextItem } from '../ts/interfaces'

describe('highlightTextItem, default text without color, highlight text is red', () => {
    const textItem: TextItem = {
        color: '',
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
    }
    describe('when selected textItem starts in the middle', () => {
        it('should return', () => {
            const range: SelectionRange = {
                textContent: textItem.text,
                anchorOffset: 6,
                focusOffset: 11
            }
            const actual = highlightTextItem({ textItem, range })
            const expected = [
                { color: '', text: 'Lorem ' },
                { color: Color.RED, text: 'Ipsum' },
                {
                    color: '',
                    text: ` is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
                }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected textItem starts in the middle from right to left', () => {
        it('should return', () => {
            const range: SelectionRange = {
                textContent: textItem.text,
                anchorOffset: 11,
                focusOffset: 6
            }
            const actual = highlightTextItem({ textItem, range })
            const expected = [
                { color: '', text: 'Lorem ' },
                { color: Color.RED, text: 'Ipsum' },
                {
                    color: '',
                    text: ` is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
                }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected textItem starts from beginning', () => {
        it('should return', () => {
            const range: SelectionRange = {
                textContent: textItem.text,
                anchorOffset: 0,
                focusOffset: 8
            }
            const actual = highlightTextItem({ textItem, range })
            const expected = [
                { color: Color.RED, text: 'Lorem Ip' },
                {
                    color: '',
                    text: `sum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
                }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected textItem ends at the end', () => {
        it('should return', () => {
            const range: SelectionRange = {
                textContent: textItem.text,
                anchorOffset: 346,
                focusOffset: 361
            }
            const actual = highlightTextItem({ textItem, range })
            const expected = [
                {
                    color: '',
                    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remain`
                },
                { color: Color.RED, text: 'ing essentially' }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected textItem covers the whole node', () => {
        it('should set color', () => {
            const range: SelectionRange = {
                textContent: textItem.text,
                anchorOffset: 0,
                focusOffset: 361
            }
            const actual = highlightTextItem({ textItem, range })
            const expected = [
                {
                    color: Color.RED,
                    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
                }
            ]
            expect(actual).toEqual(expected)
        })
        it('should reset color', () => {
            const range: SelectionRange = {
                textContent: textItem.text,
                anchorOffset: 0,
                focusOffset: 361
            }
            const selected = highlightTextItem({ textItem, range })
            const actual = highlightTextItem({ textItem: selected[0], range })
            const expected = [
                {
                    color: '',
                    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
                }
            ]
            expect(actual).toEqual(expected)
        })
    })
})
describe('highlightTextItem, default text with color green, highlight text is red', () => {
    const textItem = {
        color: Color.GREEN,
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
    }
    describe('when selected text starts in the middle', () => {
        it('should return', () => {
            const range: SelectionRange = {
                textContent: textItem.text,
                anchorOffset: 6,
                focusOffset: 11
            }
            const actual = highlightTextItem({ textItem, range })
            const expected = [
                { color: Color.GREEN, text: 'Lorem ' },
                { color: Color.RED, text: 'Ipsum' },
                {
                    color: Color.GREEN,
                    text: ` is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
                }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected text starts in the middle from right to left', () => {
        it('should return', () => {
            const range: SelectionRange = {
                textContent: textItem.text,
                anchorOffset: 11,
                focusOffset: 6
            }
            const actual = highlightTextItem({ textItem, range })
            const expected = [
                { color: Color.GREEN, text: 'Lorem ' },
                { color: Color.RED, text: 'Ipsum' },
                {
                    color: Color.GREEN,
                    text: ` is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
                }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected text starts from beginning', () => {
        it('should return', () => {
            const range: SelectionRange = {
                textContent: textItem.text,
                anchorOffset: 0,
                focusOffset: 8
            }
            const actual = highlightTextItem({ textItem, range })
            const expected = [
                { color: Color.RED, text: 'Lorem Ip' },
                {
                    color: Color.GREEN,
                    text: `sum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
                }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected text ends at the end', () => {
        it('should return', () => {
            const range: SelectionRange = {
                textContent: textItem.text,
                anchorOffset: 346,
                focusOffset: 361
            }
            const actual = highlightTextItem({ textItem, range })
            const expected = [
                {
                    color: Color.GREEN,
                    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remain`
                },
                { color: Color.RED, text: 'ing essentially' }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected text covers the whole node', () => {
        it('should set color', () => {
            const range: SelectionRange = {
                textContent: textItem.text,
                anchorOffset: 0,
                focusOffset: 361
            }
            const actual = highlightTextItem({ textItem, range })
            const expected = [
                {
                    color: Color.RED,
                    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
                }
            ]
            expect(actual).toEqual(expected)
        })
        it('should reset color', () => {
            const range: SelectionRange = {
                textContent: textItem.text,
                anchorOffset: 0,
                focusOffset: 361
            }
            const selected = highlightTextItem({ textItem, range })
            const actual = highlightTextItem({ textItem: selected[0], range })
            const expected = [
                {
                    color: '',
                    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
                }
            ]
            expect(actual).toEqual(expected)
        })
    })
})
describe('highlightTextItem, default text with color green, highlight text is green', () => {
    const color = Color.GREEN
    const textItem: TextItem = {
        color: Color.GREEN,
        text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
    }
    describe('when selected textItem starts in the middle', () => {
        it('should return', () => {
            const range: SelectionRange = {
                textContent: textItem.text,
                anchorOffset: 6,
                focusOffset: 11
            }
            const actual = highlightTextItem({ textItem, range, color })
            const expected = [
                { color: Color.GREEN, text: 'Lorem ' },
                { color: '', text: 'Ipsum' },
                {
                    color: Color.GREEN,
                    text: ` is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
                }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected textItem starts in the middle from right to left', () => {
        it('should return', () => {
            const range: SelectionRange = {
                textContent: textItem.text,
                anchorOffset: 11,
                focusOffset: 6
            }
            const actual = highlightTextItem({ textItem, range, color })
            const expected = [
                { color: Color.GREEN, text: 'Lorem ' },
                { color: '', text: 'Ipsum' },
                {
                    color: Color.GREEN,
                    text: ` is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
                }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected textItem starts from beginning', () => {
        it('should return', () => {
            const range: SelectionRange = {
                textContent: textItem.text,
                anchorOffset: 0,
                focusOffset: 8
            }
            const actual = highlightTextItem({ textItem, range, color })
            const expected = [
                { color: '', text: 'Lorem Ip' },
                {
                    color: Color.GREEN,
                    text: `sum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
                }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected textItem ends at the end', () => {
        it('should return', () => {
            const range: SelectionRange = {
                textContent: textItem.text,
                anchorOffset: 346,
                focusOffset: 361
            }
            const actual = highlightTextItem({ textItem, range, color })
            const expected = [
                {
                    color: Color.GREEN,
                    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remain`
                },
                { color: '', text: 'ing essentially' }
            ]
            expect(actual).toEqual(expected)
        })
    })
    describe('when selected textItem covers the whole node', () => {
        it('should reset color', () => {
            const range: SelectionRange = {
                textContent: textItem.text,
                anchorOffset: 0,
                focusOffset: 361
            }
            const actual = highlightTextItem({ textItem, range, color })
            const expected = [
                {
                    color: '',
                    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
                }
            ]
            expect(actual).toEqual(expected)
        })
        it('should set color again', () => {
            const range: SelectionRange = {
                textContent: textItem.text,
                anchorOffset: 0,
                focusOffset: 361
            }
            const selected = highlightTextItem({ textItem, range, color })
            const actual = highlightTextItem({ textItem: selected[0], range, color })
            const expected = [
                {
                    color: Color.GREEN,
                    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially`
                }
            ]
            expect(actual).toEqual(expected)
        })
    })
})
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
