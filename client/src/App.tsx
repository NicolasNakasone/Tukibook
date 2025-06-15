import { Routes, Route, Outlet } from 'react-router-dom'
import { ProtectedRoutes } from 'src/components/auth/ProtectedRoutes'
import { Footer } from 'src/components/common/Footer'
import { Header } from 'src/components/common/Header'
import { routes } from 'src/constants/routes'
import { FirstResults } from 'src/features/search/FirstResults'
import { MoreResults } from 'src/features/search/MoreResults'
import {
  HomePage,
  LoginPage,
  PostDetailPage,
  ProfilePage,
  RegisterPage,
  SearchPage,
} from 'src/pages'
import { SearchType } from 'tukibook-helper'

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
          <Route index element={<FirstResults />} />
          <Route path={routes.searchPosts} element={<MoreResults type={SearchType.POSTS} />} />
          <Route path={routes.searchUsers} element={<MoreResults type={SearchType.USERS} />} />
        </Route>
      </Route>
      <Route path={routes.login} element={<LoginPage />} />
      <Route path={routes.register} element={<RegisterPage />} />
    </Routes>
  )
}
