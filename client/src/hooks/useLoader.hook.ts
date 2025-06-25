import { useState, useEffect } from 'react'

export interface UseLoaderProps {
  maxLength?: number
  delayMs?: number
  loaderType?: 'dot' | 'spin'
}

// TODO: Crear una prop para definir este array
const spinDots = ['⠇', '⠋', '⠙', '⠸', '⠴', '⠦']

export const useLoader = (props?: UseLoaderProps) => {
  const maxLength = props?.maxLength || 4
  const delayMs = props?.delayMs || props?.loaderType === 'dot' ? 500 : 125
  const loaderType = props?.loaderType || 'dot'

  /* // loaderType = 'dot' */

  const [loader, setLoader] = useState(loaderType === 'dot' ? '.' : spinDots[0])
  const [flag, setFlag] = useState(true)

  useEffect(() => {
    if (loaderType === 'spin') return

    const changeContent = setInterval(() => {
      if ((loader.length === 1 && !flag) || (loader.length < maxLength && flag)) {
        setFlag(true)
        increaseContent()
        return
      }
      flag && setFlag(false)
      decreaseContent()
    }, delayMs)

    return () => {
      clearInterval(changeContent)
    }
  }, [loader.length, flag])

  const increaseContent = () => setLoader(prev => `${prev}.`)
  const decreaseContent = () => setLoader(prev => prev.slice(1))

  /* // loaderType = 'spin' */

  const [step, setStep] = useState(0)

  useEffect(() => {
    if (loaderType === 'dot') return

    const changeContent = setInterval(() => {
      if (step === 5) {
        setStep(0)
        setLoader(spinDots[5])
        return
      }
      setLoader(spinDots[step])
      setStep(prev => prev + 1)
    }, delayMs)

    return () => {
      clearInterval(changeContent)
    }
  }, [step])

  return { loader }
}
