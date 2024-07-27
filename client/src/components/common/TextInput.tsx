import { useState } from 'react'

import styles from 'src/components/common/TextInput.module.css'

interface TextInputProps {
  placeholder?: string | undefined
}

// Test para probar si podia lograr el efecto del label en la esquina como los inputs de MUI
// PD: Se logro, faltan detalles pero funciona
export const TextInput = ({ placeholder }: TextInputProps): JSX.Element => {
  const [isClicked, setIsClicked] = useState(false)

  return (
    <div
      className={styles.inputContainer}
      onClick={() => setIsClicked(true)}
      onBlur={() => setIsClicked(false)}
    >
      {isClicked && <label>{placeholder}</label>}
      <input type="text" placeholder={!isClicked ? placeholder : ''} />
    </div>
  )
}
