import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import colors from './utils/style/color'

import Home from './pages/Home'
import Survey from './pages/Survey'
import Header from "./components/Header"
import Error from './components/Error'
import Results from './pages/Results'
import Freelances from './pages/Freelances'

const GlobalStyle = createGlobalStyle`
  html{
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 100vw;
  }
  body{
    margin: 100px 0px 0px 0px;
    overflow-x: hidden;
    padding: 0px;
    position: static;
    width: 100%;
  }

  div {
    font-family: 'Trebuchet MS', Helvetica, sans-serif;
  }

  .borderBoxSizing{
    border-box: border-box;
  }

  .navItem{
    padding: 15px;
    margin: 0px 10px 0px 10px;
    color: '#8186a0';
    text-decoration: none;
    font-size: 18px;
  }

  .fullLink{
    color: white; 
    border-radius:30px;
    background-color: ${colors.primary};
    padding: 15px 40px 15px 40px;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey/:questionNumber" element={<Survey />} />
        <Route path="/results" element={<Results />} />
        <Route path="/freelances" element={<Freelances />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
