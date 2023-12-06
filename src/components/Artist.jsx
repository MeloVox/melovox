import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getArtistInfo, handleSpotify } from '../core.js'

function Artist() {
  const { artistId } = useParams()
  const [artistInfo, setArtistInfo] = useState(null)
  const [status, setStatus] = useState('')

  useEffect(() => {
    handleSpotify()
    const response = localStorage.getItem('spotify-token')
    if (response) {
      const { token_type, access_token } = JSON.parse(response)
      const token = `${token_type} ${access_token}`
      getArtistInfo(token, artistId, setStatus, setArtistInfo)
    }
  }, [artistId])

  if (!artistInfo) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div>Status: {status}</div>
      </div>
    )
  }

  // TODO: clean the html :)
  return (
    console.log(artistInfo),
    (
      <div className="w-full h-screen flex justify-center items-center bg-black"></div>
    )
  )
}

export default Artist
