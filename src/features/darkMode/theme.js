export const DARK_THEME = 'dark'
export const LIGHT_THEME = 'light'

// actions
export const setTheme = (theme) => {
    if (theme !== DARK_THEME
        && theme !== LIGHT_THEME) theme = LIGHT_THEME
    return { type: 'theme', payload: theme }
}

// selectors
export const selectTheme = state => state.darkMode.theme ? state.darkMode.theme : LIGHT_THEME 

// initial state
const initialState = {
    theme: LIGHT_THEME
}
// reducer
export function darkThemeReducer(state = initialState, action) {
    if (action.type = 'theme')
        return { ...state, theme: action.payload }
    return state
}