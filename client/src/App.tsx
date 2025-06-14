import { Routes, Route, Outlet } from 'react-router-dom'
import { ProtectedRoutes } from 'src/components/auth/ProtectedRoutes'
import { Footer } from 'src/components/common/Footer'
import { Header } from 'src/components/common/Header'
import { routes } from 'src/constants/routes'
import {
  HomePage,
  LoginPage,
  PostDetailPage,
  ProfilePage,
  RegisterPage,
  SearchPage,
} from 'src/pages'

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
        <Route path={routes.profile} element={<ProfilePage />} />
        <Route path={routes.search} element={<SearchPage />}>
          <Route path={routes.searchPosts} element={<SearchPage />} />
          <Route path={routes.searchUsers} element={<SearchPage />} />
        </Route>
      </Route>
      <Route path={routes.login} element={<LoginPage />} />
      <Route path={routes.register} element={<RegisterPage />} />
    </Routes>
  )
}
