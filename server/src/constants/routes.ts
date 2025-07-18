enum Routes {
  home = 'home',
  posts = 'posts',
  comments = 'comments',
  users = 'users',
  search = 'search',
  auth = 'auth',

  // Auth routes
  login = 'login',
  register = 'register',
  me = 'me',
  refreshToken = 'refreshToken',
  logout = 'logout',
}

export const routes: { [key in Routes]: string } = {
  home: '/',
  posts: '/posts',
  comments: '/comments',
  users: '/users',
  search: '/search',

  // Auth routes
  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  me: '/auth/me',
  refreshToken: '/auth/refreshToken',
  logout: '/auth/logout',
}
