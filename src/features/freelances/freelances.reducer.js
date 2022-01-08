import { createAction, createReducer } from '@reduxjs/toolkit'
import { selectFreelances } from '../../common/utils/selector'

//constants
const ACTIONS = {
    FETCHING: 'freelances/fetching',
    RESOLVED: 'freelances/resolved',
    REJECTED: 'freelances/rejected'
}
export const STATUS = {
    0: 'void',
    1: 'pending',
    2: 'resolved',
    3: 'rejected',
    4: 'updating',
}
export const API = {
    SERVER: {
        PROTOCOL: 'http',
        DOMAIN: 'localhost',
        PORT: 8000
    }
}

//actions
const fetchingFreelances = createAction(ACTIONS.FETCHING)
const resolveFreelances = createAction(ACTIONS.RESOLVED, (data) => ({ payload: data }))
const rejectFreelances = createAction(ACTIONS.REJECTED, (error) => ({ payload: error }))
export const fetchFreelances = (dispatch, getState) => {
    const status = selectFreelances(getState()).status
    if ([STATUS[1], STATUS[4]].indexOf(status) >= 0) return
    const endpoint = setEndpoint(API.SERVER, '/freelances')
    try {
        dispatch(fetchingFreelances())
        fetch(endpoint)
            .then(response => response.json())
            .then(data => dispatch(resolveFreelances(data)))
    } catch (error) {
        dispatch(rejectFreelances(error))
    }
}
export const setEndpoint = (server, uri) => `${server.PROTOCOL}://${server.DOMAIN}${server.PORT ? `:${server.PORT}` : ''}${uri}`

//initial state
const initialState = {
    status: 'void',
    data: null,
    error: null
}

//reducer
export default createReducer(initialState, builder => {
    return builder.addCase(fetchingFreelances, (draft) => {
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
    })
        .addCase(resolveFreelances, (draft, action) => {
            // status must be on pending or updating
            if ([STATUS[1], STATUS[4]].indexOf(draft.status) >= 0) {
                draft.status = STATUS[2]
                draft.data = action.payload
            }
            return
        })
        .addCase(rejectFreelances, (draft, action) => {
            // status must be on pending or updating
            if ([STATUS[1], STATUS[4]].indexOf(draft.status) >= 0) {
                draft.status = STATUS[2]
                draft.data = null
                draft.error = action.payload
            }
            return
        })
})