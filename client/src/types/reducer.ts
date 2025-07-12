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
  UPDATE_AVATAR_IN_POSTS = 'posts/updateAvatarInPosts',
}

export enum CommentsActionTypes {
  GET_COMMENTS = 'comments/getComments',
  COMMENT_POST = 'comments/commentPost',
  EDIT_COMMENT = 'comments/editComment',
  DELETE_COMMENT = 'comments/deleteComment',
  LIKE_COMMENT = 'comments/likeComment',
  RESET_STATE = 'comments/resetState',
  // SET_FILTERS = 'comments/setFilters',
  SET_PARTIAL_STATE = 'comments/setPartialState',
}

export enum SearchActionTypes {
  SEARCH_ALL = 'search/searchAll',
  RESET_STATE = 'search/resetState',
}
