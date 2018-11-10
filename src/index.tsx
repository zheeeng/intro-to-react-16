import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Keynote } from './Keynote'
import * as serviceWorker from './serviceWorker'

const fileContext = require.context('./Slides/', false, /\.md$/)

const files = fileContext.keys().reduce(
  (acc, key) => acc.concat(fileContext(key)),
  [] as string [],
)

const App: React.SFC = () => {
  const [slides, setSlides] = React.useState<string[]>([])
  React.useEffect(
    () => {
      Promise.all(files.map(file => fetch(file).then(response => response.text())))
        .then(fileContents => fileContents.flatMap(content => content.split(/\n{3,}/)))
        .then(setSlides)
    },
    [],
  )

  return <Keynote slides={slides} />
}

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
