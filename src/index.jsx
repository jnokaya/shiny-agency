import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './app/App'
import { default as store } from './app/store'

const queryClient = new QueryClient()
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </QueryClientProvider>,
  document.getElementById('root')
)
