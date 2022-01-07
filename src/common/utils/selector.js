export const selectTheme = states => states.theme
export const selectFreelances = state => state.freelances

const voidFreelance = { status: 'void' }
export const selectFreelance = (freelanceId) => (state) => {
    return state.freelance[freelanceId] ?? voidFreelance
}