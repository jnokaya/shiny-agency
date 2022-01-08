import { createSlice } from '@reduxjs/toolkit'
const { actions, reducer } = createSlice({
    name: 'answers',
    initialState: {},
    reducers: {
        set: {
            prepare: (questionNumber, answer) => ({
                payload: { questionNumber, answer }
            }),
            reducer: (draft, action) => {
                const { questionNumber, answer } = action.payload
                draft[questionNumber] = answer
            }
        }
    }
})

export const { set } = actions
export default reducer