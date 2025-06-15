export enum PostsActionTypes {
  GET_POSTS = 'posts/fetchPosts',
  GET_POST_DETAIL = 'posts/getPostById',
  ADD_POST = 'posts/addPost',
  DELETE_POST = 'posts/deletePost',
  LIKE_POST = 'posts/likePost',
  EDIT_POST = 'posts/editPost',
  COMMENT_POST = 'posts/commentPost',
  EDIT_COMMENT = 'posts/editComment',
  DELETE_COMMENT = 'posts/deleteComment',
  LIKE_COMMENT = 'posts/likeComment',
  RESET_STATE = 'posts/resetState',
  SET_FILTERS = 'posts/setFilters',
  SET_PARTIAL_STATE = 'posts/setPartialState',
}

export enum SearchActionTypes {
  SEARCH_ALL = 'search/searchAll',
  RESET_STATE = 'search/resetState',
}
