import { API, STATUS, setEndpoint } from "../freelances/freelances.reducer"
import { createAction, createReducer } from "@reduxjs/toolkit"
import { selectSurvey } from "../../common/utils/selector"
//constants
const ACTIONS = {
    FETCHING: 'survey/fetching',
    RESOLVE: 'survey/resolve',
    REJECT: 'survey/reject'
}
//actions
const fetchingSurvey = createAction(ACTIONS.FETCHING)
const resolveSurvey = createAction(ACTIONS.RESOLVE, data => ({ payload: data }))
const rejectSurvey = createAction(ACTIONS.REJECT, error => ({ payload: error }))
// thunk
export const fetchSurvey = (dispatch, getState) => {
    const status = selectSurvey(getState()).status
    if ([STATUS[1], STATUS[4]].indexOf(status) >= 0) return
    const endpoint = setEndpoint(API.SERVER, '/survey')
    dispatch(fetchingSurvey())
    try {
        fetch(endpoint)
            .then(response => response.json())
            .then(data => dispatch(resolveSurvey(data)))
    } catch (error) {
        dispatch(rejectSurvey(error))
    }
}
//reducer
export default createReducer({
    status: STATUS[0],
    data: null,
    error: null
}, builder => {
    return builder.addCase(fetchingSurvey, (draft) => {
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
        .addCase(resolveSurvey, (draft, action) => {
            // status must be on pending or updating
            if ([STATUS[1], STATUS[4]].indexOf(draft.status) >= 0) {
                draft.status = STATUS[2]
                draft.data = action.payload
            }
            return
        })
        .addCase(rejectSurvey, (draft, action) => {
            // status must be on pending or updating
            if ([STATUS[1], STATUS[4]].indexOf(draft.status) >= 0) {
                draft.status = STATUS[2]
                draft.data = null
                draft.error = action.payload
            }
            return
        })
})
// export default function surveyReducer(state = {
//     status: STATUS[0],
//     data: null,
//     error: null
// }, action) {
//     return produce(state, draft => {
//         const currentStatus = draft.status
//         switch (action.type) {
//             case ACTIONS.FETCHING:
//                 // status state must be on void or error or resolved
//                 // status is on void : set it to pending
//                 if (currentStatus === STATUS[0])
//                     draft.status = STATUS[1]
//                 // status is on error : reset error and set it to pending
//                 else if (currentStatus === STATUS[3]) {
//                     draft.error = null
//                     draft.status = STATUS[1]
//                 } //status is on resolved : set it to updating
//                 else if (currentStatus === STATUS[2])
//                     draft.status = STATUS[4]
//                 return
//             case ACTIONS.RESOLVE:
//                 // status must be on pending or updating
//                 if ([STATUS[1], STATUS[4]].indexOf(currentStatus) >= 0) {
//                     draft.status = STATUS[2]
//                     draft.data = action.payload
//                 }
//                 return
//             case ACTIONS.REJECT:
//                 // status must be on pending or updating
//                 if ([STATUS[1], STATUS[4]].indexOf(currentStatus) >= 0) {
//                     draft.status = STATUS[2]
//                     draft.data = null
//                     draft.error = action.payload
//                 }
//                 return
//             default:
//                 return
//         }
//     })
// }