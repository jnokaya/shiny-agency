import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import colors from '../../common/utils/style/colors'
import { selectTheme, setTheme, DARK_THEME, LIGHT_THEME } from './theme'

const Button = styled.button`
background-color: transparent;
border: none;
cursor: pointer;
color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : colors.secondary};
`

export default function DarkModeButton() {
    const theme = useSelector(selectTheme)
    const dispatch = useDispatch()
    return (
        <Button
            onClick={() => { dispatch(setTheme(theme === DARK_THEME ? LIGHT_THEME : DARK_THEME)) }}
            $isDarkMode={theme === 'light' ? false : true}>
            Changer de mode à <strong>{theme === 'light' ? `nuit` : `jour`}</strong>
        </Button>
    )
}