import { Color, FilterPanelSortBy } from './enums'

export interface TextItem {
    color: string
    text: string
}

export interface InitialState {
    filterColors: Set<string>
    filterPanelSortBy: FilterPanelSortBy
    highlightColor: Color
    textItems: TextItem[]
}

export interface SelectionRange {
    anchorIndex: number
    anchorOffset: number
    focusIndex: number
    focusOffset: number
}
