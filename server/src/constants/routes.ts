enum Routes {
  home = 'home',
  posts = 'posts',
  comments = 'comments',
}

export const routes: { [key in Routes]: string } = {
  home: '/',
  posts: '/posts',
  comments: '/comments',
}
