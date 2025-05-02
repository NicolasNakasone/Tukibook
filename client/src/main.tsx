import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { App } from 'src/App'
import { AuthProvider } from 'src/contexts/AuthContext'
import { SocketProvider } from 'src/providers/SocketProvider'
import { store } from 'src/states/store'

import 'src/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <SocketProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SocketProvider>
    </Provider>
  </BrowserRouter>
)
