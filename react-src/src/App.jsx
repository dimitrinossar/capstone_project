import './css/App.css'

import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { app, window } from '@neutralinojs/lib'

import UploadPage from './pages/UploadPage'
import TranscodePage from './pages/TranscodePage'
import TagPage from './pages/TagPage'

import { TitleBar } from 'react-desktop/macOs'

function App({ ffmpeg }) {
  const [status, setStatus] = useState('')
  const [uploads, setUploads] = useState([])
  const [downloads, setDownloads] = useState([])

  useEffect(() => {
    async function setDraggable() {
      await window.setDraggableRegion('title-bar')
    }
    setDraggable()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      ffmpeg.setLogger(({ message }) => {
        setStatus(message)
      })
    }, 500)

    return () => clearInterval(interval)
  }, [ffmpeg])

  const handleClose = async () => await app.exit()
  const handleMinimize = async () => await window.minimize()

  const addCheckMark = (updateIndex, setFunction) =>
    setFunction(
      uploads.map((upload, index) =>
        updateIndex === index ? upload + '✅' : upload,
      ),
    )

  return (
    <div className="App">
      <TitleBar
        title="Music Normaliser"
        controls
        onCloseClick={handleClose}
        onMinimizeClick={handleMinimize}
        disableResize
        id="title-bar"
      />
      <Routes>
        <Route
          path="/upload"
          element={<UploadPage status={status} onUpload={setUploads} />}
        />
        <Route
          path="/transcode"
          element={
            <TranscodePage
              ffmpeg={ffmpeg}
              status={status}
              uploads={uploads}
              setUploads={setUploads}
              setDownloads={setDownloads}
              addCheckMark={addCheckMark}
            />
          }
        />
        <Route
          path="/tag"
          element={
            <TagPage
              ffmpeg={ffmpeg}
              status={status}
              downloads={downloads}
              setUploads={setUploads}
              setDownloads={setDownloads}
              addCheckMark={addCheckMark}
            />
          }
        />
        <Route path="*" element={<Navigate to="/upload" />} />
      </Routes>
    </div>
  )
}

export default App
