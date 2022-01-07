export const DARK_THEME = 'dark'
export const LIGHT_THEME = 'light'

// actions
export const setTheme = (theme) => {
    if (theme !== DARK_THEME
        && theme !== LIGHT_THEME) theme = LIGHT_THEME
    return { type: 'theme', payload: theme }
}

// selectors
export const selectTheme = state => state.darkMode.theme

// initial state
const initialState = {
    theme: LIGHT_THEME
}
// reducer
export const darkThemeReducer = (state = initialState, action) => {
    if (action.type = 'theme' && action.payload)
        return { ...state, theme: action.payload }
    return state
}