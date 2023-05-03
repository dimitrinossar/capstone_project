import { useState } from 'react'
import { fetchFile } from '@ffmpeg/ffmpeg'
import { filesystem } from '@neutralinojs/lib'
import { useNavigate } from 'react-router-dom'

import List from '../components/List'

import { Button } from 'react-desktop/macOs'

export default function TranscodePage({
  ffmpeg,
  status,
  uploads,
  setUploads,
  setDownloads,
  addCheckMark,
}) {
  const [option, setOption] = useState('')

  const navigate = useNavigate()

  const handleChange = ({ target }) => {
    setOption(target.value)
  }

  const handleTranscode = async () => {
    setOption('')

    let commands
    let extension
    switch (option) {
      // case 'WAV':
      //   commands = []
      //   extension = '.wav'
      //   break
      // case 'FLAC':
      //   commands = [
      //     '-sample_fmt',
      //     's16',
      //     '-ar',
      //     '44100',
      //     '-compression_level',
      //     '8',
      //   ]
      //   extension = '.flac'
      //   break
      case 'MP3 320':
        commands = ['-b:a', '320k']
        extension = '.mp3'
        break
      case 'MP3 V0':
        commands = ['-q:a', '0']
        extension = ['.mp3']
        break
    }

    for (let [index, upload] of uploads.entries()) {
      const fileName = upload.split('/').slice(-1)[0]
      const inputName = `ORIGINAL-${fileName}`
      const outputName = fileName.split('.').slice(0, -1).join('')
      const input = await filesystem.readBinaryFile(upload)
      console.log(inputName, outputName)
      ffmpeg.FS('writeFile', inputName, await fetchFile(input))
      await ffmpeg.run('-i', inputName, ...commands, outputName + extension)
      setDownloads((downloads) => [...downloads, `${outputName}${extension}`])
      addCheckMark(index, setUploads)
    }
    navigate('/tag')
  }

  return (
    <>
      <List title={'Transcode Files...'} items={uploads} status={status} />
      <footer className="actions">
        <select name="format" onChange={handleChange}>
          <option value="">Select a format...</option>
          {/* <option value="WAV">WAV</option> */}
          {/* <option value="FLAC">FLAC</option> */}
          <option value="MP3 320">MP3 320</option>
          <option value="MP3 V0">MP3 V0</option>
        </select>
        <Button
          color="blue"
          size="16"
          disabled={!option}
          onClick={handleTranscode}
        >
          Transcode
        </Button>
      </footer>
    </>
  )
}
