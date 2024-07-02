import { FormEvent, useState } from 'react'

import { usePosts } from 'src/hooks/usePosts'

// TODO: Se crean pero no se muestran en pantalla sino hasta recargar,
// hay que actualizar el state posts
export const AddPostInput = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const { addPosts } = usePosts()

  const handleAddPost = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    event.preventDefault()

    const target = event.target as HTMLFormElement

    const username = target[0] as HTMLInputElement
    const content = target[1] as HTMLInputElement

    await addPosts({ username: username.value, content: content.value })

    username.value = ''
    content.value = ''

    setIsLoading(false)
  }

  return (
    <form
      style={{
        width: '60vw',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        border: '2px solid CanvasText',
        borderRadius: '0.5rem',
        padding: '2rem 1.5rem',
      }}
      onSubmit={handleAddPost}
    >
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
