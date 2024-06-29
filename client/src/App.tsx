import { Routes, Route } from 'react-router-dom'
import { routes } from 'src/constants/routes'
import { HomePage } from 'src/pages'

export const App = () => {
  return (
    <Routes>
      <Route path={routes.home} element={<HomePage />} />
    </Routes>
  )
}
