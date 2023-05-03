import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/index.css'

import { init } from '@neutralinojs/lib'
import { BrowserRouter } from 'react-router-dom'
import { createFFmpeg } from '@ffmpeg/ffmpeg'

const ffmpeg = createFFmpeg({ log: true })
ffmpeg.load()

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App ffmpeg={ffmpeg} />
  </BrowserRouter>,
)

init()
