import './App.css'

import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import UploadPage from './pages/UploadPage'
import TranscodePage from './pages/TranscodePage'
import TagPage from './pages/TagPage'

function App({ ffmpeg }) {
  const [uploads, setUploads] = useState([])
  const [downloads, setDownloads] = useState([])

  const onTranscode = (filename) => setDownloads([...downloads, filename])

  return (
    <div className="App">
      <Routes>
        <Route path="/upload" element={<UploadPage onUpload={setUploads} />} />
        <Route
          path="/transcode"
          element={
            <TranscodePage
              ffmpeg={ffmpeg}
              uploads={uploads}
              onTranscode={onTranscode}
            />
          }
        />
        <Route
          path="/tag"
          element={
            <TagPage
              ffmpeg={ffmpeg}
              downloads={downloads}
              setUploads={setUploads}
              setDownloads={setDownloads}
            />
          }
        />
        <Route path="*" element={<Navigate to="/upload" />} />
      </Routes>
    </div>
  )
}

export default App
