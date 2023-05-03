import '../css/UploadPage.css'

import { os } from '@neutralinojs/lib'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-desktop/macOs'
import { useState } from 'react'

import List from '../components/List'

export default function UploadPage({ status, onUpload }) {
  const [isDisabled, setIsDisabled] = useState(false)
  const navigate = useNavigate()

  const handleUpload = async () => {
    if (isDisabled) return
    setIsDisabled(true)
    const entries = await os.showOpenDialog('Select files', {
      filters: [{ name: 'Audio Files', extensions: ['wav', 'flac', 'mp3'] }],
      multiSelections: true,
    })
    setIsDisabled(false)
    if (entries.length === 0) return
    onUpload(entries)
    navigate('/transcode')
  }

  return (
    <>
      <List title={'Add Files...'} items={[]} status={status} />
      <footer className="actions">
        <div></div>
        <Button color="blue" size="16" onClick={handleUpload}>
          Upload
        </Button>
      </footer>
    </>
  )
}
