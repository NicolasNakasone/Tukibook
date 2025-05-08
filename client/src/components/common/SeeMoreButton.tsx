import { useState } from 'react'

export const SeeMoreButton = ({ content }: { content: string }): JSX.Element | string => {
  const [showMore, setShowMore] = useState(false)

  if (showMore) return content

  return (
    <span style={{ cursor: 'pointer' }} onClick={() => setShowMore(true)}>
      {`${content?.slice(0, 90)}... `}
      <span style={{ fontWeight: 600 }}>Ver más</span>
    </span>
  )
}
