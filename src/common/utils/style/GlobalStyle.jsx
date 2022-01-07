import { createGlobalStyle } from "styled-components"
import { useSelector } from "react-redux"

import colors from "./colors"
import { DARK_THEME, selectTheme } from "../../../features/darkMode/theme"

const StyledGlobalStyle = createGlobalStyle`
  html{
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 100vw;
  }
  body{
    margin: 0;
    min-height: 100vh;
    overflow-x: hidden;
    padding: 0px;
    position: static;
    width: 100%;
    background-color: ${({ $isDarkMode }) => $isDarkMode ? colors.backgroundDark : colors.backgroundLight};
    color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : 'black'};
    font-family: 'Trebuchet MS', Helvetica, sans-serif;
  }

  #root{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
  }
  
  .page {
    top: 100px;
    left: 0px;
    margin: 0px 35px 0px 35px;
}

  .borderBoxSizing {
    border-box: border-box;
}

  .navItem {
    padding: 15px;
    margin: 0px 10px 0px 10px;
    color: ${({ $isDarkMode }) => $isDarkMode ? 'white' : colors.subTitleGrey};
    text-decoration: none;
    font-size: 18px;
}

  .fullLink {
    color: white;
    border-radius: 30px;
    background-color: ${colors.primary};
    padding: 15px 40px 15px 40px;
}
`

export default function GlobalStyle() {
  const theme = useSelector(selectTheme)
  return <StyledGlobalStyle $isDarkMode={theme === DARK_THEME} />
}