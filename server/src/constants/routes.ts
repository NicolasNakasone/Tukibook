enum Routes {
  home = 'home',
  posts = 'posts',
}

export const routes: { [key in Routes]: string } = { home: '/', posts: '/posts' }
