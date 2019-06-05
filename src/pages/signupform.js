import React from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const signUpMutation = gql`
mutation signupmutation(
  $firstname: String!
  $lastname: String!
  $username: String!
  $password: String!
) {
  signup(
    data: {
      firstName: $firstname
      lastName: $lastname
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

class SignUpForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      password: ''
    }

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this)
    this.handleChangeLastName = this.handleChangeLastName.bind(this)
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeFirstName (event) {
    this.setState({ firstname: event.target.value })
  }
  handleChangeLastName (event) {
    this.setState({ lastname: event.target.value })
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
            <label className='FormField__Label' >First Name: </label>
            <input type='text' name='fistname' className='FormField__Input'
              placeholder='Enter your first name'
              value={this.state.firstname} onChange={this.handleChangeFirstName} />
          </div>
          <div className='FormField'>
            <label className='FormField__Label' >Last Name: </label>
            <input type='text' name='lastname' className='FormField__Input'
              placeholder='Enter your last name'
              value={this.state.lastname} onChange={this.handleChangeLastName} />
          </div>
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
            mutation={signUpMutation}
            variables={this.state}
            update={(cache, { data: { signup } }) => {
              if (signup.jwt) {
                cache.writeQuery({
                  query: GET_TOKEN,
                  data: { token: signup.jwt }
                })
              }
            }}
          >
            {(signupmutation, { loading, error, data }) => (
              <div>
                <button onClick={signupmutation} type='submit'>Sign up</button>
                {data && data.signup.authError && <p> Error </p>}
                {loading && <p>Loading...</p>}
                {error && <p>Error :( Please try again</p>}
                {data && data.signup.jwt &&
                <p>
                  Your account has been successfully created, <Link to='/auth/signin'>Sign In!</Link>
                </p>}
              </div>
            )
            }
          </Mutation>
        </form>
        <div>
          <Link to='/'> Home Page </Link>
        </div>
        <Link to='/auth/signin'> I have an account - Sign In </Link>
      </div>
    )
  }
}

export default SignUpForm
