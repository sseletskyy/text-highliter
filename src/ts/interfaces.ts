import { Color } from './enums'

export interface TextItem {
    color: string
    text: string
}

export interface InitialState {
    highlightColor: Color
    textItems: TextItem[]
}

export interface SelectionRange {
    textContent: string
    anchorOffset: number
    focusOffset: number
}
