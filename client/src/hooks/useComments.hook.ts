import { useCallback, useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  addComment,
  CommentsState,
  deleteComment,
  editComment,
  getCommentsByPostId,
  initialValues,
  likeComment,
} from 'src/states/slices/commentsSlice'
import { AppDispatch, RootState } from 'src/states/store'
import { CommentsActionTypes } from 'src/types/reducer'
import {
  Comment,
  CommentInput,
  GetCommentsParams,
  PAGE_LIMIT,
  Post,
  UpdateCommentInput,
} from 'tukibook-helper'

export const useComments = ({ postId }: { postId: Post['id'] }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { commentsByPostId } = useSelector(({ comments }: RootState) => comments)

  const commentState = useMemo(
    () => commentsByPostId[postId] || initialValues,
    [commentsByPostId, postId]
  )
  const { comments, page, hasMore, isLoading, error, totalItems } = commentState
  const remainingComments = totalItems - PAGE_LIMIT * (page - 1)

  const handleGetComments = useCallback(({ postId, page }: GetCommentsParams) => {
    return dispatch(getCommentsByPostId({ postId, page }))
  }, [])

  const handleGetMoreComments = useCallback(
    ({ postId }: GetCommentsParams) => {
      if (!isLoading && hasMore) {
        dispatch(getCommentsByPostId({ postId, page }))
      }
    },
    [page, hasMore, isLoading, dispatch]
  )

  const handleAddComment = (newComment: CommentInput) => dispatch(addComment(newComment))

  const handleEditComment = (updatedComment: UpdateCommentInput) =>
    dispatch(editComment(updatedComment))

  const handleDeleteComment = (commentId: Comment['id']) => dispatch(deleteComment(commentId))

  const handleLikeComment = (commentId: Comment['id']) => dispatch(likeComment(commentId))

  const handleResetState = () => dispatch({ type: CommentsActionTypes.RESET_STATE })

  const handleSetPartialState = (payload: Partial<CommentsState>) =>
    dispatch({ type: CommentsActionTypes.SET_PARTIAL_STATE, payload })

  return {
    comments,
    page,
    error,
    hasMore,
    isLoading,
    totalItems,
    isSlotCreated: !!commentsByPostId[postId],
    remainingComments,
    getComments: handleGetComments,
    getMoreComments: handleGetMoreComments,
    addComment: handleAddComment,
    editComment: handleEditComment,
    deleteComment: handleDeleteComment,
    likeComment: handleLikeComment,
    resetState: handleResetState,
    setPartialState: handleSetPartialState,
  }
}
