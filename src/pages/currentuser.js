import React from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const GET_USER = gql`
query getcurrentuser {
  currentUser{
    username
    firstName
    lastName
  }
}
`
class currentUserPage extends React.Component {

  render () {
    return (
      <div>
        <Query query={GET_USER} fetchPolicy='network-only'>
          {({ loading, error, data: { currentUser } }) => (
            <div>
              {loading && <p>Loading...</p>}
              {error && <p>Error :( Please try again</p>}
              {currentUser &&
                <div>
                  <h1> Welcome, {currentUser.username} </h1>
                  <h2> Your information: </h2>
                  <h3> First name: {currentUser.firstName} </h3>
                  <h3> Last name: {currentUser.lastName} </h3>
                </div>
              }
            </div>
          )}
        </Query>
        <div><Link to='/'> Home Page </Link></div>
      </div>
    )
  }
}

export default currentUserPage
