import React, { FormEvent } from 'react'
import styled from '@emotion/styled'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../../../data/reducers'
import { FilterPanelSortBy } from '../../../ts/enums'
import { InitialState } from '../../../ts/interfaces'

const StyledSortingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    height: 100%;
    label {
        padding: 0 10px;
    }
`

export const SortingContainer = () => {
    const dispatch = useDispatch()

    const filterPanelSortBy = useSelector((state: InitialState) => state.filterPanelSortBy)

    const changeHandler = (e: FormEvent<HTMLInputElement>) => {
        const enumValue: FilterPanelSortBy = FilterPanelSortBy[e.currentTarget.value]
        dispatch(actions.updateFilterPanelSortBy(enumValue))
    }
    return (
        <StyledSortingContainer>
            <span>Sort: </span>
            <label>
                <input
                    type="radio"
                    value={FilterPanelSortBy.BY_APPEARANCE}
                    onChange={changeHandler}
                    checked={filterPanelSortBy === FilterPanelSortBy.BY_APPEARANCE}
                />
                By Appearance
            </label>
            <label>
                <input
                    type="radio"
                    value={FilterPanelSortBy.BY_NAME}
                    onChange={changeHandler}
                    checked={filterPanelSortBy === FilterPanelSortBy.BY_NAME}
                />
                By Name
            </label>
        </StyledSortingContainer>
    )
}
