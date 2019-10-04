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

/**
 * highlight text in a single textItem, split it into several in case of partial selection range
 */
export const highlightTextItem = ({ textItem, range, color = Color.RED }: HighlightTextItemParams): TextItem[] => {
    const { color: originalColor, text: textContent } = textItem
    const [left, right] = [
        Math.min(range.anchorOffset, range.focusOffset),
        Math.max(range.anchorOffset, range.focusOffset)
    ]
    if (left === 0 && right === textContent.length) {
        return [{ color: originalColor === color ? '' : color, text: textContent }]
    }
    return [
        { color: originalColor, text: textContent.substring(0, left) },
        { color: color, text: textContent.substring(left, right) },
        { color: originalColor, text: textContent.substring(right) }
    ].filter((item: TextItem) => item.text.length > 0)
}

/**
 * Callback from Array.reducer
 * it combines TextItems with the same color
 */
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

// convert right-to-left range to left-to-right
const prepareRange = (aRange: SelectionRange): SelectionRange => {
    let range = { ...aRange }
    if (range.focusIndex < range.anchorIndex) {
        range = {
            anchorIndex: range.focusIndex,
            anchorOffset: range.focusOffset,
            focusIndex: range.anchorIndex,
            focusOffset: range.anchorOffset
        }
    }
    return range
}

/**
 * is used in highlightTextItems
 * simple case when selection range contains only one node
 */
const updateTextItemsInSingleNode = ({ textItems, range, color }: HighlightTextParams): TextItem[] => {
    const updatedTextItems = highlightTextItem({
        textItem: textItems[range.anchorIndex],
        range,
        color
    })
    textItems.splice(range.anchorIndex, 1, ...updatedTextItems)
    return textItems
}

/**
 * is used in highlightTextItems
 * complicated case when selection range contains more than one node
 */
const updateTextItemsInMultiNodes = ({ textItems, range, color }: HighlightTextParams): TextItem[] => {
    const focusTextItem = textItems[range.focusIndex]
    // skip replacing the focus node if it has the same color
    if (focusTextItem.color !== color) {
        const focusRange = {
            ...range,
            anchorOffset: 0
        }
        const focusTextItems = highlightTextItem({
            textItem: focusTextItem,
            range: focusRange,
            color
        })
        textItems.splice(range.focusIndex, 1, ...focusTextItems)
    }
    // get textItems between anchor and focus nodes in reverse order
    // and replace them with correct color
    const callbackFn = (item: TextItem, index: number) => {
        // skip item of the color is already the same
        if (item.color !== color) {
            const itemRange = {
                anchorOffset: 0,
                focusOffset: item.text.length,
                anchorIndex: 0,
                focusIndex: 0
            }
            const items = highlightTextItem({
                textItem: item,
                range: itemRange,
                color
            })
            // replace textItem in its position
            textItems.splice(range.focusIndex - 1 - index, 1, ...items)
        }
    }
    textItems
        .slice(range.anchorIndex + 1, range.focusIndex)
        .reverse()
        .forEach(callbackFn)
    const anchorTextItem = textItems[range.anchorIndex]
    // skip replacing the anchor node if it has the same color
    if (anchorTextItem.color !== color) {
        const anchorRange = {
            ...range,
            focusOffset: anchorTextItem.text.length
        }
        const anchorTextItems = highlightTextItem({
            textItem: anchorTextItem,
            range: anchorRange,
            color
        })

        textItems.splice(range.anchorIndex, 1, ...anchorTextItems)
    }
    return textItems
}
/**
 * main method for updating text items based on selection range and color
 */
export const highlightTextItems = ({
    textItems,
    range: aRange,
    color = Color.RED
}: HighlightTextParams): TextItem[] => {
    // early exit in case of incorrect range
    if (aRange.anchorIndex < 0 || aRange.focusIndex < 0) {
        return textItems
    }
    // do not mutate argument
    const result: TextItem[] = [...textItems]
    const range = prepareRange(aRange)
    // range within a single node
    if (range.anchorIndex === range.focusIndex) {
        updateTextItemsInSingleNode({ textItems: result, range, color })
    } else {
        updateTextItemsInMultiNodes({ textItems: result, range, color })
    }
    return result.reduce(combineReducer, [])
}
