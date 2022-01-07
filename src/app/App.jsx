import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GlobalStyle from '../common/utils/style/GlobalStyle'

import Home from '../common/pages/Home'
import Survey from '../common/pages/Survey'
import Header from "../common/components/Header"
import Error from '../common/pages/Error'
import Results from '../common/pages/Results'
import Freelances from '../common/pages/Freelances'
import Profile from '../common/pages/Profile'
import Footer from '../common/components/Footer'
import { SurveyProvider } from '../common/utils/context'

export default function App() {
    return (
        <Router>
            <SurveyProvider>
                <GlobalStyle />
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/survey/:questionNumber" element={<Survey />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/freelances" element={<Freelances />} />
                    <Route path="/profile/:id" element={<Profile />} render={props => <Profile {...props} />} />
                    <Route path="*" element={<Error />} />
                </Routes>
                <Footer />
            </SurveyProvider>
        </Router>
    )
}