import { createSlice } from '@reduxjs/toolkit'
import { selectFreelances } from '../../common/utils/selector'

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
//slice
const { actions, reducer } = createSlice({
    name: 'freelances',
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
//actions
const { fetching, resolving, rejecting } = actions
//thunk
export const fetchFreelances = (dispatch, getState) => {
    const status = selectFreelances(getState()).status
    if ([STATUS[1], STATUS[4]].indexOf(status) >= 0) return
    const endpoint = setEndpoint(API.SERVER, '/freelances')
    try {
        dispatch(fetching())
        fetch(endpoint)
            .then(response => response.json())
            .then(data => dispatch(resolving(data)))
    } catch (error) {
        dispatch(rejecting(error))
    }
}
export const setEndpoint = (server, uri) => `${server.PROTOCOL}://${server.DOMAIN}${server.PORT ? `:${server.PORT}` : ''}${uri}`

export default reducer