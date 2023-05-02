import { os } from '@neutralinojs/lib'
import { useNavigate } from 'react-router-dom'

export default function UploadPage({ onUpload }) {
  const navigate = useNavigate()

  const handleUpload = async () => {
    const entries = await os.showOpenDialog('Select files', {
      filters: [{ name: 'Audio Files', extensions: ['wav', 'flac', 'mp3'] }],
      multiSelections: true,
    })
    onUpload(entries)
    navigate('/transcode')
  }

  return (
    <>
      <h2>Upload Audio Files</h2>
      <button onClick={handleUpload}>Upload</button>
    </>
  )
}
