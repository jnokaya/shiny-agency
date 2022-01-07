import { API, STATUS, setEndpoint } from "../freelances/freelances.reducer"
import { produce } from 'immer'
//constants
const ACTIONS = {
    FETCHING: 'survey/fetching',
    RESOLVE: 'survey/resolve',
    REJECT: 'survey/reject'
}
//actions
const fetchingSurvey = () => ({ type: ACTIONS.FETCHING })
const resolveSurvey = (data) => ({ type: ACTIONS.RESOLVE, payload: data })
const rejectSurvey = (error) => ({ type: ACTIONS.REJECT, payload: error })
export const fetchSurvey = (store) => {
    const endpoint = setEndpoint(API.SERVER, '/survey')
    store.dispatch(fetchingSurvey())
    try {
        fetch(endpoint)
            .then(response => response.json())
            .then(data => store.dispatch(resolveSurvey(data)))
    } catch (error) {
        store.dispatch(rejectSurvey(error))
    }
}
//reducer
export default function surveyReducer(state = {
    status: STATUS[0],
    data: null,
    error: null
}, action) {
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
            case ACTIONS.RESOLVE:
                // status must be on pending or updating
                if ([STATUS[1], STATUS[4]].indexOf(currentStatus) >= 0) {
                    draft.status = STATUS[2]
                    draft.data = action.payload
                }
                return
            case ACTIONS.REJECT:
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