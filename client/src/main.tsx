import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from 'src/App'
import { PostsProvider } from 'src/providers/PostsProvider'

import 'src/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    {/* <StrictMode> */}
    <PostsProvider>
      <App />
    </PostsProvider>
    {/* </StrictMode> */}
  </BrowserRouter>
)
