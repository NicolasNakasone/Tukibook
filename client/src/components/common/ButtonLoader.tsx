import { useState, useEffect } from 'react'

interface ButtonLoaderProps {
  maxLength?: number
}

export const ButtonLoader = ({ maxLength = 4 }: ButtonLoaderProps): JSX.Element => {
  const [content, setContent] = useState('.')
  const [flag, setFlag] = useState(true)

  useEffect(() => {
    const changeContent = setTimeout(() => {
      if ((content.length === 1 && !flag) || (content.length < maxLength && flag)) {
        setFlag(true)
        increaseContent()
        return
      }
      flag && setFlag(false)
      decreaseContent()
    }, 500)

    return () => {
      clearTimeout(changeContent)
    }
  }, [content.length, flag])

  const increaseContent = () => setContent(prev => `${prev}.`)
  const decreaseContent = () => setContent(prev => prev.slice(1))

  return <span>{content}</span>
}
