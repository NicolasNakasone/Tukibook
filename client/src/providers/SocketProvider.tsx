import { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { socket } from 'src/sockets'
import { registerPostListeners } from 'src/sockets/listeners'

interface Props {
  children: JSX.Element
}

export const SocketProvider = ({ children }: Props): JSX.Element => {
  const dispatch = useDispatch()

  useEffect(() => {
    registerPostListeners(dispatch)

    return () => {
      socket.removeAllListeners()
    }
  }, [dispatch])

  return children
}
