import React from 'react'
import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/themes/prism.css'
import './styles.css'

export const Template: React.SFC<{ children: string }> = React.memo(({ children }) => {
  React.useEffect(() => {
    Prism.highlightAll()
  })

  return (
    <article className="article">
      <ReactMarkdown>{children}</ReactMarkdown>
    </article>
  )
})
