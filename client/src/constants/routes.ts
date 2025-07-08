enum Routes {
  home = 'home',
  posts = 'posts',
  postDetail = 'postDetail',
  comments = 'comments',
  profile = 'profile',
  search = 'search',
  searchPosts = 'searchPosts',
  searchUsers = 'searchUsers',
  userDetail = 'userDetail',
  deleteUser = 'deleteUser',
  editUser = 'editUser',

  // Auth routes
  login = 'login',
  register = 'register',
  me = 'me',
  refreshToken = 'refreshToken',
  logout = 'logout',
  changePassword = 'changePassword',
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
  editUser: '/users/:id',

  // Auth routes
  login: '/auth/login',
  register: '/auth/register',
  me: '/auth/me',
  refreshToken: '/auth/refreshToken',
  logout: '/auth/logout',
  changePassword: '/auth/changePassword',
}
