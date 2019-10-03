import { TextItem } from '../ts/interfaces'

export const textItemsToString = (text: TextItem[]): string => {
    return text.map((item: TextItem) => item.text).join('')
}
