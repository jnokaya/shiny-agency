import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import colors from '../../common/utils/style/colors'
import { set, THEMES } from './theme'
import { selectTheme } from '../../common/utils/selector'

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
            onClick={() => { dispatch(set(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK)) }}
            $isDarkMode={theme === THEMES.LIGHT ? false : true}>
            Changer de mode à <strong>{theme === THEMES.LIGHT ? `nuit` : `jour`}</strong>
        </Button>
    )
}