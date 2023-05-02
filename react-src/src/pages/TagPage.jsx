import { os, filesystem } from '@neutralinojs/lib'
import { useNavigate } from 'react-router-dom'

export default function TagPage({
  ffmpeg,
  downloads,
  setUploads,
  setDownloads,
}) {
  const navigate = useNavigate()
  const handleDownload = async () => {
    const saveLocation = await os.showFolderDialog('Select destination')
    for (let download of downloads) {
      const output = ffmpeg.FS('readFile', download)
      console.log(saveLocation + '/' + download, output)
      await filesystem.writeBinaryFile(`${saveLocation}/${download}`, output)
      console.log('done!')
    }
    ffmpeg.exit()
    await ffmpeg.load()
    setUploads([])
    setDownloads([])
    navigate('/')
  }

  return (
    <>
      <h2>Set Tags</h2>
      <button onClick={handleDownload}>Download</button>
    </>
  )
}
