//constants
export const THEMES = {
    DARK: 'dark',
    LIGHT: 'light'
}

// actions
export const setTheme = (theme) => {
    return { type: 'setTheme', payload: theme }
}

// reducer : the substate here is the theme (string)
const themeReducer = (state = THEMES.LIGHT, action) => {
    if (action.type === 'setTheme' && (action.payload || Object.values(THEMES).indexOf(action.payload) >= 0))
        return action.payload
    return state
}

export default themeReducer