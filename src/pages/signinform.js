import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const signInMutation = gql`
mutation signinmutation(
  $username: String!
  $password: String!
) {
  signin(
    data: {
      username: $username
      password: $password
    }
  ){
    authError
    jwt
  }
}`

const GET_TOKEN = gql`
query getToken {
  token @client
}
`

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
          <Mutation
            mutation={signInMutation}
            variables={this.state}
            update={(cache, { data: { signin } }) => {
              if (signin.jwt) {
                cache.writeQuery({
                  query: GET_TOKEN,
                  data: { token: signin.jwt }
                })
              }
            }}
          >
            {(signinmutation, { loading, error, data }) => {
              if (data && data.signin.jwt) {
                return <Redirect to='/currentuser' />
              }
              return (
                <div>
                  <button onClick={signinmutation} type='submit'>Sign in</button>
                  {data && data.signin.authError && <p> Error</p>}
                  {loading && <p>Loading...</p>}
                  {error && <p>Error :( Please try again</p>}
                </div>
              )
            }}
          </Mutation>
        </form>
        <div>
          <Link to='/'> Home Page </Link>
        </div>
        <Link to='/auth/signup'> I don't have an account - Sign Up </Link>      </div>
    )
  }
}

export default SignInForm
