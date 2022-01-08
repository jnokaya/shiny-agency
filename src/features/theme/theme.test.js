import * as themeAction from './theme'
//action creator
describe('Theme actions', () => {
    it('should create a theme setting action object', () => {
        expect(themeAction.set('light')).toEqual({
            type: 'theme/set',
            payload: 'light'
        })
        expect(themeAction.set('dark')).toEqual({
            type: 'theme/set',
            payload: 'dark'
        })
    })
})
//reducer
describe('Theme reducer', () => {
    it('should return the initial state when state is undefined', () => {
        expect(themeAction.default(undefined, { type: '@INIT' })).toEqual('light')
    })
    it('should set theme', () => {
        expect(themeAction.default('light', themeAction.set('light'))).toEqual('light')
        expect(themeAction.default('dark', themeAction.set('light'))).toEqual('light')
    })
    it('should return state on invalid action', () => {
        expect(themeAction.default('light', { type: 'INVALID' })).toEqual('light')
    })
})