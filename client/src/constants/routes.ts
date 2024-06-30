enum Routes {
  home = 'home',
  posts = 'posts',
  comments = 'comments',
  likes = 'likes',
}

export const routes: { [key in Routes]: string } = {
  home: '/',
  posts: '/posts',
  comments: '/comments',
  likes: '/likes',
}
