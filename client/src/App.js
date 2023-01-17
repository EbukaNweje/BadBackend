import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/Store'

import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Verify from './components/Verify'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="/users/verifyuser/:id" element={<Verify />} />
        </Routes>
      </Router>
    </Provider>
  )
}
export default App
