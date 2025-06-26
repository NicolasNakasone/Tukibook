enum Routes {
  home = 'home',
  posts = 'posts',
  comments = 'comments',
  postDetail = 'postDetail',
  login = 'login',
  register = 'register',
  me = 'me',
  refreshToken = 'refreshToken',
  logout = 'logout',
  profile = 'profile',
  deleteUser = 'deleteUser',
  search = 'search',
  searchPosts = 'searchPosts',
  searchUsers = 'searchUsers',
  userDetail = 'userDetail',
}

export const routes: { [key in Routes]: string } = {
  home: '/',
  posts: '/posts',
  postDetail: '/posts/:id',
  comments: '/comments',
  profile: '/profile',
  search: '/search',
  searchPosts: '/search/posts',
  searchUsers: '/search/users',
  userDetail: '/users/:id',
  deleteUser: '/users/:id/delete',

  // Auth routes
  login: '/auth/login',
  register: '/auth/register',
  me: '/auth/me',
  refreshToken: '/auth/refreshToken',
  logout: '/auth/logout',
}
