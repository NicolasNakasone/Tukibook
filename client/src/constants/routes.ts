enum Routes {
  home = 'home',
  posts = 'posts',
  comments = 'comments',
  likes = 'likes',
  postDetail = 'postDetail',
  login = 'login',
  register = 'register',
  me = 'me',
}

export const routes: { [key in Routes]: string } = {
  home: '/',
  posts: '/posts',
  postDetail: '/posts/:id',
  comments: '/comments',
  likes: '/likes',
  login: '/auth/login',
  register: '/auth/register',
  me: '/auth/me',
}
