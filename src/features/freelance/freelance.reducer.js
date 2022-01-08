import produce from "immer"
import { createAction, createReducer } from "@reduxjs/toolkit"
import { STATUS, API, setEndpoint } from "../freelances/freelances.reducer"
//constants
const ACTIONS = {
    FETCHING: 'freelance/fetching',
    RESOLVED: 'freelance/resolved',
    REJECTED: 'freelance/rejected'
}
//actions
const fetchingFreelance = createAction(ACTIONS.FETCHING, (freelanceId) => ({ payload: { freelanceId } }))
const resolveFreelance = createAction(ACTIONS.RESOLVED, (freelanceId, data) => ({ payload: { freelanceId, data } }))
const rejectFreelance = createAction(ACTIONS.REJECTED, (freelanceId, error) => ({ payload: { freelanceId, error } }))
export const fetchFreelance = (store, queryId) => {
    const endpoint = setEndpoint(API.SERVER, `/freelance?id=${queryId}`)
    store.dispatch(fetchingFreelance(queryId))
    try {
        fetch(endpoint)
            .then(response => response.json())
            .then(data => store.dispatch(resolveFreelance(queryId, data)))
    } catch (error) {
        store.dispatch(rejectFreelance(queryId, error))
    }
}
//initial state
const initialState = {
}
//reducer
export default createReducer(initialState, builder => {
    return builder.addCase(fetchingFreelance, (draft, action) => {
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
    })
        .addCase(resolveFreelance, (draft, action) => {
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
        })
        .addCase(rejectFreelance, (draft, action) => {
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
        })
})
