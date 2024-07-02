import { FormEvent, useState } from 'react'

import tukibookLogo from 'public/tuki.webp'
import { SeeMoreButton } from 'src/components/common/SeeMoreButton'
// import { PostCardHeader } from 'src/features/home/PostCardHeader'
// import { AddPostInput } from 'src/features/posts/AddPostInput'
import { PostSkeleton } from 'src/features/posts/PostSkeleton'
import { usePosts } from 'src/hooks/usePosts'
import styles from 'src/pages/home/Home.module.css'

export const HomePage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const { posts, addPosts, deletePost } = usePosts()

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
    <main
      style={{
        padding: '4rem 8vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4rem',
      }}
    >
      {!posts.length ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : (
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
      )}
      {posts.map(post => {
        return (
          <div
            key={post.id}
            style={{
              width: '40vw',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              border: '1px solid CanvasText',
              borderRadius: '0.25rem',
              padding: '2rem 1.5rem',
            }}
          >
            {/* Cambiar mas adelante a un menu tipo tooltip con tres puntos
              para mostrar opciones como borrar el post o cosas asi
            */}
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <h2
                style={{
                  margin: '1rem 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <img
                  src={tukibookLogo}
                  alt={`${post.username}'s profile picture`}
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    backgroundColor: 'CanvasText',
                    borderRadius: '50%',
                  }}
                />
                {post.username}
              </h2>
              <button
                style={{ width: 'max-content', padding: '0.25rem', margin: '0 0 0 auto' }}
                onClick={() => deletePost(post.id)}
              >
                ❌
              </button>
            </div>
            {post.content.length <= 200 ? (
              <p style={{ padding: '1rem 0', margin: '1rem 0' }}>{post.content}</p>
            ) : (
              <SeeMoreButton content={post.content} />
            )}
            <button
              style={{ width: 'max-content', padding: '0.25rem 0.5rem' }}
            >{`👍 ${post.likes || ''} ${post.likes ? (post.likes > 1 ? 'tukis' : 'tuki') : 'Tuki'}`}</button>
            {Boolean(post.comments.length) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {post.comments.map(comment => {
                  return (
                    <div key={comment.id} style={{ display: 'flex', gap: '0.5rem' }}>
                      <img
                        src={tukibookLogo}
                        alt={`${post.username}'s profile picture`}
                        style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          backgroundColor: 'CanvasText',
                          borderRadius: '50%',
                        }}
                      />
                      <p
                        style={{
                          margin: '0.25rem 0 0',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.25rem',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        }}
                      >
                        <span>{comment.username}</span>
                        <span style={{ fontWeight: 400 }}>
                          {comment.content.length <= 100 ? (
                            comment.content
                          ) : (
                            <SeeMoreButton content={comment.content} />
                          )}
                        </span>
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
            <input type="text" placeholder="Comentar..." className={styles.commentInput} />
          </div>
        )
      })}
    </main>
  )
}
