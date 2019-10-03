import { SelectionRange, TextItem } from '../ts/interfaces'
import { Color } from '../ts/enums'

export interface HighlightTextItemParams {
    textItem: TextItem
    range: SelectionRange
    color?: Color
}

export interface HighlightTextParams {
    textItems: TextItem[]
    range: SelectionRange
    color?: Color
}

export const highlightTextItem = ({ textItem, range, color = Color.RED }: HighlightTextItemParams) => {
    const [left, right] = [
        Math.min(range.anchorOffset, range.focusOffset),
        Math.max(range.anchorOffset, range.focusOffset)
    ]
    const originalColor = textItem.color
    if (left === 0 && right === range.textContent.length) {
        return [{ color: originalColor === color ? '' : color, text: range.textContent }]
    }
    return [
        { color: originalColor, text: range.textContent.substring(0, left) },
        { color: originalColor === color ? '' : color, text: range.textContent.substring(left, right) },
        { color: originalColor, text: range.textContent.substring(right) }
    ].filter((item: TextItem) => item.text.length > 0)
}

export const highlightText = ({ textItems, range, color = Color.RED }: HighlightTextParams) => {
    const highlightReducer = (rangeObj: SelectionRange) => (acc: TextItem[], next: TextItem) => {
        if (next.text === rangeObj.textContent) {
            acc.push(...highlightTextItem({ textItem: next, range: rangeObj, color }))
        } else {
            acc.push(next)
        }
        return acc
    }
    const combineReducer = (acc: TextItem[], next: TextItem) => {
        const last = acc.pop()
        if (!last) {
            return [next]
        }
        // compare last item with next
        if (last.color === next.color) {
            // combine them
            acc.push({
                color: last.color,
                text: last.text.concat(next.text)
            })
        } else {
            acc.push(last, next)
        }
        return acc
    }
    const updatedText = textItems.reduce(highlightReducer(range), [])
    return updatedText.reduce(combineReducer, [])
}
