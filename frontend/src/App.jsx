import React from 'react'
import LandingPage from './Components/LandingPage/LandingPage'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import UrlForm from './Components/LandingPage/UrlForm/UrlForm'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/urlform' element={<UrlForm/>}/>
        </Routes>
        {/* <LandingPage/> */}
      </BrowserRouter>
      
    </div>
  )
}

export default App
