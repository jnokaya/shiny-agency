import { createSlice } from "@reduxjs/toolkit";
import { selectResults } from "../../common/utils/selector";
import { API, setEndpoint, STATUS } from "../freelances/freelances.reducer";

const { actions, reducer } = createSlice({
    name: 'results',
    initialState: {
        status: STATUS[0],
        data: null,
        error: null
    },
    reducers: {
        fetching: (draft, action) => {
            const currentStatus = draft.status
            // status state must be on void or error or resolved
            // status is on void : set it to pending
            if (currentStatus === STATUS[0])
                draft.status = STATUS[1]
            // status is on error : reset error and set it to pending
            else if (currentStatus === STATUS[3]) {
                draft.error = null
                draft.status = STATUS[1]
            } //status is on resolved : set it to updating
            else if (currentStatus === STATUS[2])
                draft.status = STATUS[4]
            return
        },
        resolving: (draft, action) => {
            // status must be on pending or updating
            if ([STATUS[1], STATUS[4]].indexOf(draft.status) >= 0) {
                draft.status = STATUS[2]
                draft.data = action.payload
            }
            return
        },
        rejecting: (draft, action) => {
            // status must be on pending or updating
            if ([STATUS[1], STATUS[4]].indexOf(draft.status) >= 0) {
                draft.status = STATUS[2]
                draft.data = null
                draft.error = action.payload
            }
            return
        }
    }
})

const { fetching, resolving, rejecting } = actions
//thunk
export function fetchResults(queryParams) {
    return async (dispatch, getState) => {
        const status = selectResults(getState()).status
        if ([STATUS[1], STATUS[4]].indexOf(status) >= 0) return

        const endpoint = setEndpoint(API.SERVER, `/results?${queryParams}`)
        try {
            dispatch(fetching())
            const response = await fetch(endpoint)
            const data = await response.json()
            dispatch(resolving(data))
        } catch (error) {
            dispatch(rejecting(error))
        }
    }
}
export default reducer