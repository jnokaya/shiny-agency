import { createSlice } from "@reduxjs/toolkit"

//constants
export const THEMES = {
    DARK: 'dark',
    LIGHT: 'light'
}

const { actions, reducer } = createSlice({
    name: 'theme',
    initialState: THEMES.LIGHT,
    reducers: {
        set: (state, action) => {
            return action.payload
        }
    }
})

export const { set } = actions

export default reducer