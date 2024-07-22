import { FormEvent, useEffect, useState } from 'react'

import styles from 'src/features/posts/AddPostForm.module.css'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitNewPost, socket } from 'src/sockets'
import { Post } from 'src/types'
import { SocketEvents } from 'src/types/socket'

// TODO: Se crean pero no se muestran en pantalla sino hasta recargar,
// hay que actualizar el state posts
/* PD: Algo raro hay al crear componentes, como sospechaba 
  para que funcione tenes que mantener todo el codigo
  en el mismo componente (o sea HomePage), de lo contrario
  al mandar a componentes individuales deja de actualizarse
  en tiempo real. Paso lo mismo al borrar un post, con el 
  codigo en la misma page funcionaba bien, luego al crear
  PostCardHeader dejo de actualizarse en tiempo real
*/
/* PD2: Se arregla de dos formas, al crear un contexto y provider
  y sacar los valores de estados de ahi o al usar Redux o un 
  gestor de estados globales
*/
export const AddPostForm = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)

  const { addPost, addPostAfter } = usePosts()

  useEffect(() => {
    addPostAfter()

    return () => {
      // console.log('socket off')
      // No aparece nunca el log 👀
      socket.off(SocketEvents.NEW_POST)
    }
  }, [])

  const handleAddPost = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const username = (target[0] as HTMLInputElement).value
    const content = (target[1] as HTMLInputElement).value

    const response = await addPost({ username, content })

    if (response.payload) emitNewPost(response.payload as Post)

    target.reset()
    setIsLoading(false)
  }

  return (
    <form className={styles.addPostForm} onSubmit={handleAddPost}>
      <AddPostFormHeader {...{ isLoading }} />
      <textarea
        name="content"
        rows={4}
        required
        disabled={isLoading}
        placeholder="Escribe un post...*"
        style={{ margin: '0' }}
      />
      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: 'max-content',
          padding: '0.5rem 1rem',
          margin: '0 0 0 auto',
          fontSize: '1.25rem',
        }}
      >
        Crear
      </button>
    </form>
  )
}

const AddPostFormHeader = ({ isLoading }: { isLoading: boolean }): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <div
        style={{
          width: '2.5rem',
          height: '2.5rem',
          backgroundColor: 'CanvasText',
          borderRadius: '50%',
        }}
      />
      <input
        name="username"
        type="text"
        required
        disabled={isLoading}
        placeholder="📝 Tu nombre*"
        style={{ width: '40%', margin: '0' }}
      />
    </div>
  )
}
