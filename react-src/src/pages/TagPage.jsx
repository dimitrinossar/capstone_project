import { os, filesystem } from '@neutralinojs/lib'
import { useNavigate } from 'react-router-dom'
// import MP3Tag from 'mp3tag.js'

import List from '../components/List'
import { Button } from 'react-desktop/macOs'
import { useState } from 'react'

export default function TagPage({
  ffmpeg,
  status,
  downloads,
  setUploads,
  setDownloads,
  addCheckMark,
}) {
  const [isDownloadDisabled, setIsDownloadDisabled] = useState(false)
  const navigate = useNavigate()

  const handleDownload = async () => {
    setIsDownloadDisabled(true)
    const saveLocation = await os.showFolderDialog('Select destination')
    for (let [index, download] of downloads.entries()) {
      const output = ffmpeg.FS('readFile', download)
      // const mp3tag = new MP3Tag(output.buffer, true)
      // mp3tag.read()
      // mp3tag.remove()
      // console.log(mp3tag.tags)
      await filesystem.writeBinaryFile(`${saveLocation}/${download}`, output)
      addCheckMark(index, setDownloads)
    }
    ffmpeg.exit()
    await ffmpeg.load()
    setUploads([])
    setDownloads([])
    navigate('/')
  }

  return (
    <>
      <List title={'Download Files...'} items={downloads} status={status} />
      <footer className="actions">
        <div></div>
        <Button
          color="blue"
          size="16"
          disabled={isDownloadDisabled}
          onClick={handleDownload}
        >
          Download
        </Button>
      </footer>
    </>
  )
}
