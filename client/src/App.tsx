import { Routes, Route, Outlet } from 'react-router-dom'
import { ProtectedRoutes } from 'src/components/auth/ProtectedRoutes'
import { Footer } from 'src/components/common/Footer'
import { Header } from 'src/components/common/Header'
import { routes } from 'src/constants/routes'
import { HomePage, LoginPage, PostDetailPage, RegisterPage } from 'src/pages'

export const App = () => {
  return (
    <Routes>
      <Route
        path={routes.home}
        element={
          <ProtectedRoutes>
            <>
              <Header />
              <Outlet />
              <Footer />
            </>
          </ProtectedRoutes>
        }
      >
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.postDetail} element={<PostDetailPage />} />
      </Route>
      <Route path={routes.login} element={<LoginPage />} />
      <Route path={routes.register} element={<RegisterPage />} />
    </Routes>
  )
}
