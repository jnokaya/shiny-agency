import { createSlice } from "@reduxjs/toolkit"
import { selectFreelance } from "../../common/utils/selector"
import { STATUS, API, setEndpoint } from "../freelances/freelances.reducer"

//slice
const { actions, reducer } = createSlice({
    name: 'freelance',
    initialState: {},
    reducers: {
        fetching: {
            prepare: (freelanceId) => ({
                payload: { freelanceId }
            }),
            reducer: (draft, action) => {
                const { payload } = action
                if (!payload) return
                const currentFreelanceId = payload.freelanceId
                const currentStatus = draft[currentFreelanceId] ? draft[currentFreelanceId].status : STATUS[0]
                // status state must be on void or error or resolved
                // status is on void : set it to pending
                if (currentStatus === STATUS[0])
                    draft[currentFreelanceId] = { status: STATUS[1] }
                // status is on error : reset error and set it to pending
                else if (currentStatus === STATUS[3]) {
                    draft[currentFreelanceId].error = null
                    draft[currentFreelanceId].status = STATUS[1]
                } //status is on resolved : set it to updating
                else if (currentStatus === STATUS[2])
                    draft[currentFreelanceId].status = STATUS[4]
                return
            }
        },
        resolving: {
            // prepare allows to change the payload
            prepare: (freelanceId, data) => ({
                payload: { freelanceId, data }
            }),
            reducer: (draft, action) => {
                const { payload } = action
                if (!payload) return
                const currentFreelanceId = payload.freelanceId
                const currentStatus = draft[currentFreelanceId] ? draft[currentFreelanceId].status : STATUS[0]
                // status must be on pending or updating
                if ([STATUS[1], STATUS[4]].indexOf(currentStatus) >= 0) {
                    draft[currentFreelanceId].status = STATUS[2]
                    draft[currentFreelanceId] = action.payload
                }
                return
            }
        },
        rejecting: {
            prepare: (freelanceId, error) => ({
                payload: { freelanceId, error }
            }),
            reducer: (draft, action) => {
                const { payload } = action
                if (!payload) return
                const currentFreelanceId = payload.freelanceId
                const currentStatus = draft[currentFreelanceId] ? draft[currentFreelanceId].status : STATUS[0]
                // status must be on pending or updating
                if ([STATUS[1], STATUS[4]].indexOf(currentStatus) >= 0) {
                    draft[currentFreelanceId].status = STATUS[2]
                    draft[currentFreelanceId].data = null
                    draft[currentFreelanceId].error = action.payload
                }
                return
            }
        }
    }
})
//actions
const { fetching, resolving, rejecting } = actions
// thunk or functions that returns a thunk
export const fetchFreelance = (queryId) => {
    return (dispatch, getState) => {
        const status = selectFreelance(getState()).status
        if ([STATUS[1], STATUS[4]].indexOf(status) >= 0) return

        const endpoint = setEndpoint(API.SERVER, `/freelance?id=${queryId}`)
        dispatch(fetching(queryId))
        try {
            fetch(endpoint)
                .then(response => response.json())
                .then(data => dispatch(resolving(queryId, data)))
        } catch (error) {
            dispatch(rejecting(queryId, error))
        }
    }
}
//reducer
export default reducer