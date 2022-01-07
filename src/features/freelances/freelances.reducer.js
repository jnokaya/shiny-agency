import { produce } from 'immer'

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
const freelancesFetching = () => ({ type: ACTIONS.FETCHING })
const freelancesResolved = (data) => ({ type: ACTIONS.RESOLVED, payload: data })
const freelancesRejected = (error) => ({ type: ACTIONS.REJECTED, payload: error })
export const fetchFreelances = (store) => {
    const endpoint = setEndpoint(API.SERVER, '/freelances')
    try {
        store.dispatch(freelancesFetching())
        fetch(endpoint)
            .then(response => response.json())
            .then(data => store.dispatch(freelancesResolved(data)))
    } catch (error) {
        store.dispatch(freelancesRejected(error))
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
export default function freelancesReducer(state = initialState, action) {
    return produce(state, draft => {
        const currentStatus = draft.status
        switch (action.type) {
            case ACTIONS.FETCHING:
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
            case ACTIONS.RESOLVED:
                // status must be on pending or updating
                if ([STATUS[1], STATUS[4]].indexOf(currentStatus) >= 0) {
                    draft.status = STATUS[2]
                    draft.data = action.payload
                }
                return
            case ACTIONS.REJECTED:
                // status must be on pending or updating
                if ([STATUS[1], STATUS[4]].indexOf(currentStatus) >= 0) {
                    draft.status = STATUS[2]
                    draft.data = null
                    draft.error = action.payload
                }
                return
            default:
                return
        }
    })
}