enum Routes {
  home = 'home',
  posts = 'posts',
  comments = 'comments',
  likes = 'likes',
  postDetail = 'postDetail',
}

export const routes: { [key in Routes]: string } = {
  home: '/',
  posts: '/posts',
  postDetail: '/posts/:id',
  comments: '/comments',
  likes: '/likes',
}
