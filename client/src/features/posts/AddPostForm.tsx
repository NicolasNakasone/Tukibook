import { FormEvent, useRef, useState } from 'react'

import { FileInput, FileInputHandle } from 'src/components/form/FileInput'
import styles from 'src/features/posts/AddPostForm.module.css'
import { useAuth } from 'src/hooks/useAuth.hook'
import { usePosts } from 'src/hooks/usePosts.hook'
import { emitNewPost } from 'src/sockets'
import { Post } from 'tukibook-helper'

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
  const formRef = useRef<FileInputHandle>(null)

  const { addPost } = usePosts()

  const handleAddPost = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(event.currentTarget)

    const response = await addPost(formData)

    if (response.payload) emitNewPost(response.payload as Post)

    form.reset()
    formRef.current?.resetFileInput()
    setIsLoading(false)
  }

  return (
    <form className={styles.addPostForm} onSubmit={handleAddPost}>
      <AddPostFormHeader />
      <textarea
        name="content"
        rows={4}
        required
        disabled={isLoading}
        placeholder="Escribi un post..."
      />
      <FileInput ref={formRef} showOptional />
      <button type="submit" disabled={isLoading} className={styles.addPostButton}>
        Crear
      </button>
    </form>
  )
}

const AddPostFormHeader = (): JSX.Element => {
  const { user } = useAuth()

  return (
    <div className={styles.addPostFormHeader}>
      <div className={styles.addPostFormImage} />
      <h2 /* className={styles.postCardUsername} */>{user?.username}</h2>
    </div>
  )
}
