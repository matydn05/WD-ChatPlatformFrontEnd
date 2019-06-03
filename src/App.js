import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import SignUpForm from './pages/signupform'
import SignInForm from './pages/signinform'

function App () {
  return (
    <Router>
      <Route exact path='/' render={() => (
        <div>
          <h1> Welcome </h1>
          <ul>
            <li>
              <Link to='/auth/signup'>Sign Up</Link>
            </li>
            <li>
              <Link to='/auth/signin'>Sign In</Link>
            </li>
          </ul>
        </div>
      )} />
      <Route path='/auth/signup' component={SignUpForm} />
      <Route path='/auth/signin' component={SignInForm} />
    </Router>
  )
}

export default App
