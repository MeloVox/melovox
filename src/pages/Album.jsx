import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAlbumInfo, handleSpotify } from '../core.js'
import {
  PlayCircleOutline,
  PauseCircleOutline,
  ArrowBackCircleOutline,
} from 'react-ionicons'

function Album() {
  const { albumId } = useParams()
  const [albumInfo, setAlbumInfo] = useState(null)
  const [status, setStatus] = useState('')
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPlayerVisible, setIsPlayerVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTrackPosition, setCurrentTrackPosition] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      await handleSpotify()
      const updatedResponse = await new Promise(resolve => {
        const intervalId = setInterval(() => {
          const response = sessionStorage.getItem('spotify-token')
          if (response) {
            clearInterval(intervalId)
            resolve(response)
          }
        }, 100)
      })

      if (updatedResponse) {
        const { token_type, access_token } = JSON.parse(updatedResponse)
        const token = `${token_type} ${access_token}`
        getAlbumInfo(token, albumId, setStatus, setAlbumInfo)
      }
    }

    fetchData()
  }, [albumId])

  const handlePreview = (previewUrl, trackName) => {
    if (previewUrl) {
      if (currentTrack && currentTrack.audio) {
        if (currentTrack.name === trackName && isPlaying) {
          handlePlay()
          return
        } else {
          currentTrack.audio.pause()
        }
      }

      const audio = new Audio(previewUrl)
      audio.currentTime = 0
      audio.addEventListener('timeupdate', () => {
        if (audio.currentTime > 30) {
          audio.pause()
          setIsPlaying(false)
          setProgress(0)
        } else {
          setProgress((audio.currentTime / 30) * 100)
        }
      })
      audio.addEventListener('ended', () => {
        setCurrentTrack(null)
        setIsPlaying(false)
        setIsPlayerVisible(false)
        setProgress(0)
        setCurrentTrackPosition(0)
      })
      audio.play()
      setCurrentTrack({ audio, name: trackName })
      setIsPlaying(true)
      setIsPlayerVisible(true)
    }
  }

  const handlePause = () => {
    if (currentTrack && currentTrack.audio) {
      setCurrentTrackPosition(currentTrack.audio.currentTime)
      currentTrack.audio.pause()
      setIsPlaying(false)
    }
  }

  const handlePlay = () => {
    if (currentTrack && currentTrack.audio) {
      currentTrack.audio.currentTime = currentTrackPosition
      currentTrack.audio.play()
      setIsPlaying(true)
    }
  }

  const handleRestart = () => {
    if (currentTrack && currentTrack.audio) {
      currentTrack.audio.currentTime = 0
    }
  }

  const handleProgressClick = e => {
    const clickedPosition = (e.nativeEvent.offsetX / e.target.offsetWidth) * 30
    if (currentTrack && currentTrack.audio) {
      currentTrack.audio.currentTime = clickedPosition
      setProgress((clickedPosition / 30) * 100)
    }
  }

  const remainingSeconds =
    isPlaying && currentTrack && currentTrack.audio
      ? Math.ceil((30 - (currentTrack.audio.currentTime % 30)) % 30)
      : 0

  if (!albumInfo) {
    return (
      <div className="w-full h-screen flex text-white justify-center items-center">
        <div>Status: {status}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row w-full bg-black text-white font-Rollicker">
      <div className="md:w-1/2 bg-[#188481]">
        <div className="text-center text-4xl mb-4">{albumInfo.album.name}</div>
        <div className="text-center mb-4">
          <img
            className="rounded-[20px] border-4 border-white mx-auto"
            src={albumInfo.album.images[0].url}
            alt={albumInfo.album.name}
          />
        </div>
        <div className="text-center text-2xl mb-4">{albumInfo.artistName}</div>
      </div>
      <div className="md:w-1/2 bg-[#188481]">
        <div className="p-4">
          <div className="text-xl mb-2">Liste des pistes :</div>
          <ul>
            {albumInfo.tracks.map((track, index) => (
              <li key={index} className="mb-4">
                <div
                  className="text-lg font-bold cursor-pointer"
                  onClick={() => handlePreview(track.preview_url, track.name)}
                >
                  {track.name}
                </div>
                <div>Durée : {formatDuration(track.duration_ms)}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isPlayerVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 text-center">
          {currentTrack && (
            <>
              <button
                className="text-blue-500 underline hover:text-blue-700 mr-2"
                onClick={isPlaying ? handlePause : handlePlay}
              >
                {isPlaying ? (
                  <PauseCircleOutline color="currentColor" />
                ) : (
                  <PlayCircleOutline color="currentColor" />
                )}
              </button>
              <button
                className="text-blue-500 underline hover:text-blue-700 mr-2"
                onClick={handleRestart}
              >
                <ArrowBackCircleOutline color="currentColor" />
              </button>
              <div className="text-white">
                En cours de lecture : {currentTrack.name}{' '}
                {isPlaying && <span>({remainingSeconds} s restants)</span>}
              </div>
              <progress
                value={progress}
                max="100"
                className="w-full mt-2"
                onClick={handleProgressClick}
              />
            </>
          )}
        </div>
      )}
    </div>
  )
}

function formatDuration(duration_ms) {
  const minutes = Math.floor(duration_ms / 60000)
  const seconds = ((duration_ms % 60000) / 1000).toFixed(0)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export default Album
