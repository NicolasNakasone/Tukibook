enum Routes {
  home = 'home',
  posts = 'posts',
  comments = 'comments',
  likes = 'likes',
  auth = 'auth',
}

export const routes: { [key in Routes]: string } = {
  home: '/',
  posts: '/posts',
  comments: '/comments',
  likes: '/likes',
  auth: '/auth',
}
