import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
import SignUpForm from './pages/signupform'

function App () {
  return (
    <Router>
      <Route exact path='/' render={() => (
        <ul>
          <li>
            <Link to='/auth/signup'>Sign Up</Link>
          </li>
        </ul>
      )} />
      <Route path='/auth/signup' component={SignUpForm} />
    </Router>
  )
}

export default App
