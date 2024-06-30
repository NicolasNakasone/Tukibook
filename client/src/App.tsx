import { Routes, Route, Outlet } from 'react-router-dom'
import { Footer } from 'src/components/common/Footer'
import { Header } from 'src/components/common/Header'
import { routes } from 'src/constants/routes'
import { HomePage } from 'src/pages'

export const App = () => {
  return (
    <Routes>
      <Route
        path={routes.home}
        element={
          <>
            <Header />
            <Outlet />
            <Footer />
          </>
        }
      >
        <Route path={routes.home} element={<HomePage />} />
      </Route>
    </Routes>
  )
}
