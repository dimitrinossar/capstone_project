import './App.css'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { toBlobURL } from '@ffmpeg/util'
import { useRef, useState } from 'react'

function App() {
  const [loaded, setLoaded] = useState(false)
  const ffmpegRef = useRef(new FFmpeg())

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.2/dist/esm'
    const ffmpeg = ffmpegRef.current
    ffmpeg.on('log', ({ message }) => {
      // if (messageRef.current) messageRef.current.innerHTML = message
      console.log(message)
    })
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        'application/wasm',
      ),
      workerURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.worker.js`,
        'text/javascript',
      ),
    })
    setLoaded(true)
  }

  return loaded ? (
    <>
      <h1>Loaded!</h1>
    </>
  ) : (
    <button onClick={load}>Load ffmpeg/core</button>
  )
}

export default App
