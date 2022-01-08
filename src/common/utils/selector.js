export const selectTheme = states => states.theme
export const selectFreelances = state => state.freelances
export const selectSurvey = state => state.survey
export const selectAnswers = state => state.answers
export const selectResults = state => state.results
const voidFreelance = { status: 'void' }
export const selectFreelance = (freelanceId) => (state) => {
    return state.freelance[freelanceId] ?? voidFreelance
}