import { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getCommentsByPostId, initialValues } from 'src/states/slices/commentsSlice'
import { AppDispatch, RootState } from 'src/states/store'
import { GetCommentsParams, Post } from 'tukibook-helper'

export const useComments = ({ postId }: { postId: Post['id'] }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { commentsByPostId } = useSelector(({ comments }: RootState) => comments)

  const commentState = commentsByPostId[postId] || initialValues
  const { comments, page, hasMore, isLoading, error, totalItems } = commentState

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

  return {
    comments,
    page,
    error,
    hasMore,
    isLoading,
    totalItems,
    getComments: handleGetComments,
    getMoreComments: handleGetMoreComments,
  }
}
