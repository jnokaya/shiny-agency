import { createAction, createReducer } from "@reduxjs/toolkit"

//constants
export const THEMES = {
    DARK: 'dark',
    LIGHT: 'light'
}

// actions
export const setTheme = createAction('setTheme')

export default createReducer('light', builder => {
    return builder.addCase(setTheme, (state, action) => {
        return action.payload
    })
})