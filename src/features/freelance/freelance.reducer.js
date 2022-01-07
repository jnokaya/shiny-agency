import produce from "immer"
import { STATUS, API, setEndpoint } from "../freelances/freelances.reducer"
//constants
const ACTIONS = {
    FETCHING: 'freelance/fetching',
    RESOLVED: 'freelance/resolved',
    REJECTED: 'freelance/rejected'
}
//actions
const fetchingFreelance = (freelanceId) => ({ type: ACTIONS.FETCHING, payload: { freelanceId } })
const resolveFreelance = (freelanceId, data) => ({ type: ACTIONS.RESOLVED, payload: { freelanceId, data } })
const rejectFreelance = (freelanceId, error) => ({ type: ACTIONS.REJECTED, payload: { freelanceId, error } })
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
export default function freelanceReducer(state = initialState, action) {
    return produce(state, draft => {
        const { type, payload } = action
        if (!payload) return
        const currentFreelanceId = payload.freelanceId
        const currentStatus = draft[currentFreelanceId] ? draft[currentFreelanceId].status : STATUS[0]
        switch (type) {
            case ACTIONS.FETCHING:
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
            case ACTIONS.RESOLVED:
                // status must be on pending or updating
                if ([STATUS[1], STATUS[4]].indexOf(currentStatus) >= 0) {
                    draft[currentFreelanceId].status = STATUS[2]
                    draft[currentFreelanceId] = action.payload
                }
                return
            case ACTIONS.REJECTED:
                // status must be on pending or updating
                if ([STATUS[1], STATUS[4]].indexOf(currentStatus) >= 0) {
                    draft[currentFreelanceId].status = STATUS[2]
                    draft[currentFreelanceId].data = null
                    draft[currentFreelanceId].error = action.payload
                }
                return
            default:
                return
        }
    })
}