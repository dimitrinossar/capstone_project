import { useEffect } from 'react'
import './App.css'

import { filesystem } from '@neutralinojs/lib'

function App() {
  useEffect(() => {
    filesystem
      .readDirectory('./')
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return <div>My Neutralino App testing</div>
}

export default App
