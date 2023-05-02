import { useState } from 'react'
import { fetchFile } from '@ffmpeg/ffmpeg'
import { filesystem } from '@neutralinojs/lib'
import { useNavigate } from 'react-router-dom'

export default function TranscodePage({ ffmpeg, uploads, onTranscode }) {
  const [option, setOption] = useState('')
  const navigate = useNavigate()

  const handleChange = ({ target }) => {
    setOption(target.value)
  }

  const handleTranscode = async (event) => {
    event.preventDefault()

    let commands
    let extension
    switch (option) {
      case 'FLAC':
        commands = [
          '-sample_fmt',
          's16',
          '-ar',
          '44100',
          '-compression_level',
          '8',
        ]
        extension = '.flac'
        break
      case 'MP3 320':
        commands = ['-b:a', '320k']
        extension = '.mp3'
        break
      case 'MP3 V0':
        commands = ['-q:a', '0']
        extension = ['.mp3']
        break
    }

    for (let upload of uploads) {
      const fileName = upload.split('/').slice(-1)[0]
      const inputName = `ORIGINAL-${fileName}`
      const outputName = fileName.split('.').slice(0, -1).join('')
      const input = await filesystem.readBinaryFile(upload)
      console.log(inputName, outputName)
      ffmpeg.FS('writeFile', inputName, await fetchFile(input))
      await ffmpeg.run('-i', inputName, ...commands, outputName + extension)
      onTranscode(outputName + extension)
    }
    navigate('/tag')
  }

  return (
    <>
      <h2>Select a format</h2>
      <form onSubmit={handleTranscode}>
        <select name="format" onChange={handleChange}>
          <option value="">Select a format...</option>
          <option value="FLAC">FLAC</option>
          <option value="MP3 320">MP3 320</option>
          <option value="MP3 V0">MP3 V0</option>
        </select>
        <button disabled={!option}>Transcode</button>
      </form>
    </>
  )
}
