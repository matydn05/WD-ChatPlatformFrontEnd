import React from 'react'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import ApolloClient, { InMemoryCache, gql } from 'apollo-boost'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'

const GET_TOKEN = gql`
query getToken {
  token @client
}
`

const cache = new InMemoryCache()

cache.writeData({ data: { token: null } })

const client = new ApolloClient(
  {
    uri: 'http://localhost:3001/graphql',
    cache,
    request: (operation) => {
      const { token } = cache.readQuery({ query: GET_TOKEN })
      operation.setContext({ headers: { Authorization: 'Bearer ' + token } })
    }
  })

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
