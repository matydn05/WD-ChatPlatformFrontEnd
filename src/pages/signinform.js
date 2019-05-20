import React from 'react'
import { Link } from 'react-router-dom'

class SignInForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeUsername (event) {
    this.setState({ username: event.target.value })
  }
  handleChangePassword (event) {
    this.setState({ password: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    console.log(this.state)
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className='FormFields'>
          <div className='FormField'>
            <label className='FormField__Label' >Username: </label>
            <input type='text' name='username' className='FormField__Input'
              placeholder='Enter your username'
              value={this.state.username} onChange={this.handleChangeUsername} />
          </div>
          <div className='FormField'>
            <label className='FormField__Label' >Password: </label>
            <input type='text' name='username' className='FormField__Input'
              placeholder='Enter your password'
              value={this.state.password} onChange={this.handleChangePassword} />
          </div>
          <button type='submit'>Sign In</button>
        </form>
        <div>
          <Link to='/'> Home Page </Link>
        </div>
        <Link to='/auth/signup'> I don't have an account - Sign Up </Link>      </div>
    )
  }
}

export default SignInForm
