enum Routes {
  home = 'home',
  posts = 'posts',
  comments = 'comments',
  likes = 'likes',
  postDetail = 'postDetail',
  // auth = 'auth',
  login = 'login',
  me = 'me',
}

export const routes: { [key in Routes]: string } = {
  home: '/',
  posts: '/posts',
  postDetail: '/posts/:id',
  comments: '/comments',
  likes: '/likes',
  login: '/auth/login',
  me: '/auth/me',
}
