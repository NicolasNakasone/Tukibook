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
}

export const routes: { [key in Routes]: string } = {
  home: '/',
  posts: '/posts',
  postDetail: '/posts/:id',
  comments: '/comments',
  login: '/auth/login',
  register: '/auth/register',
  me: '/auth/me',
  refreshToken: '/auth/refreshToken',
  logout: '/auth/logout',
  profile: '/profile',
  deleteUser: '/user/:id/delete',
  search: '/search',
  searchPosts: '/search/posts',
  searchUsers: '/search/users',
}
