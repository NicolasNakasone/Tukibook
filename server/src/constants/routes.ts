enum Routes {
  home = 'home',
  posts = 'posts',
  comments = 'comments',
  auth = 'auth',
  login = 'login',
  register = 'register',
  me = 'me',
  refreshToken = 'refreshToken',
  logout = 'logout',
  user = 'user',
  search = 'search',
}

export const routes: { [key in Routes]: string } = {
  home: '/',
  posts: '/posts',
  comments: '/comments',
  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  me: '/auth/me',
  refreshToken: '/auth/refreshToken',
  logout: '/auth/logout',
  user: '/user',
  search: '/search',
}
