import React from 'react'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import ApolloClient from 'apollo-boost'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { gql } from 'apollo-boost'

const client = new ApolloClient({ uri: 'http://localhost:3001/graphql' })

client
  .query({
    query: gql`
      {
        user(id: "e89f5165-1fb6-4f41-a573-993b7712d745") {
          username
        }
      }
    `
  })
  .then(result => console.log(result))

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
