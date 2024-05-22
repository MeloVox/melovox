import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAlbumInfo, handleSpotify } from '../core.js'
import {
  PlayCircleOutline,
  PauseCircleOutline,
  ArrowBackCircleOutline,
} from 'react-ionicons'
import ModalRate from '../components/Modal/ModalRate'
import ModalList from '../components/Modal/ModalList'
import Rating from 'react-rating'
import { StarOutline, Star } from 'react-ionicons'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Link } from 'react-router-dom'

function Album() {
  const { albumId } = useParams()
  const [albumInfo, setAlbumInfo] = useState(null)
  const [status, setStatus] = useState('')
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPlayerVisible, setIsPlayerVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTrackPosition, setCurrentTrackPosition] = useState(0)
  const [albumReviews, setAlbumReviews] = useState([])
  const [averageRating, setAverageRating] = useState()
  const [openList, setOpenList] = useState(false)
  const [openModalRate, setOpenModalRate] = useState(false)

  const handleOpenModalRate = () => {
    setOpenModalRate(true)
  }

  const handleCloseModalRate = () => {
    setOpenModalRate(false)
  }

  const handleOpenList = () => {
    setOpenList(true)
  }

  const handleCloseList = () => {
    setOpenList(false)
  }

  const latestReview = albumReviews.length > 0 ? albumReviews[0] : null

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/api/getReviews?idAlbum=${albumId}`,
      )
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération des critiques de l'artiste",
        )
      }
      const responseData = await response.json()
      console.log(responseData)
      setAlbumReviews(responseData.reviews)
      setAverageRating(responseData.averageRating)
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des critiques de l'artiste :",
        error,
      )
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [albumId])

  useEffect(() => {
    const fetchData = async () => {
      await handleSpotify()
      const updatedResponse = await new Promise(resolve => {
        const intervalId = setInterval(() => {
          const response = sessionStorage.getItem('app-spotify-token')
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
    console.log(albumInfo),
    (
      <>
        <Navbar />
        <div className="flex flex-col h-screen md:flex-row w-full bg-black text-white font-Anton">
          <div className="flex h-screen pb-14 flex-col p-[15px] md:w-1/4 bg-[#1D2DB6]">
            <div className="flex flex-col items-center">
              <img
                className="rounded-[20px] w-[80%] h-[80%] object-cover"
                src={albumInfo.album.images[0].url}
                alt={albumInfo.album.name}
              />
              <div className="text-[25px] text-center">
                {albumInfo.album.name}
              </div>
              <div className="text-[20px] text-center">
                <Link
                  to={`/artist/${albumInfo.album.artists[0].id}`}
                  className="text-white underline hover:text-red-500"
                >
                  Artiste : {albumInfo.artistName}
                </Link>
              </div>
              {albumReviews.length > 0 && (
                <div>
                  <div className="text-[20px]">Note moyenne : </div>
                  <div className="flex flex-col text-[20px] text-center">
                    <div>{averageRating.toFixed(2)}/5</div>
                    <div>
                      <Rating
                        initialRating={averageRating}
                        emptySymbol={
                          <StarOutline
                            color={'#D1D5DB'}
                            height="20px"
                            width="20px"
                          />
                        }
                        fullSymbol={
                          <Star color={'#F59E0B'} height="20px" width="20px" />
                        }
                        readonly
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center mt-[15px] text-center">
              <div className="w-[100%] flex h-[15vh] justify-around">
                <div className="flex flex-col w-[40%] bg-white-45 justify-center">
                  <div className="text-[15px]">date de sortie</div>
                  <div className="text-[20px]">
                    {albumInfo.album.release_date}
                  </div>
                </div>
                <div className="flex w-[40%] flex-col bg-white-45 justify-center">
                  <div className="text-[20px]">
                    {albumInfo.album.total_tracks}
                  </div>
                  <div className="text-[15px]">titres</div>
                </div>
              </div>

              <div className="w-[100%] flex h-[15vh] justify-around mt-[15px] ">
                <div className="flex w-[40%] flex-col bg-white-45 justify-center">
                  <div className="text-[15px]">Label</div>
                  <div className="text-[10px] text-center">
                    {albumInfo.album.label ? albumInfo.album.label : 'N/A'}
                  </div>
                </div>
                <div className="flex w-[40%] flex-col bg-white-45 justify-center">
                  <div className="text-[15px]">Duree </div>
                  <div className="text-[20px]">
                    {formatDuration(
                      albumInfo.album.tracks.items.reduce(
                        (sum, track) => sum + track.duration_ms,
                        0,
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:w-3/4 p-[15px]">
            <div className="text-[25px] mb-3">Critiques sur l'album</div>
            <div className="flex justify-between border">
              <div className="flex flex-1 flex-col justify-center items-center h-[30vh] border-r border-white-1 bg-[#1D2DB6]">
                <div className="text-[25px]">Derniere critique :</div>
                {latestReview ? (
                  <>
                    <div className="flex flex-col w-[80%] border border-white-1 p-4">
                      <div className="text-[20px]">
                        Utilisateur: {latestReview.userId}
                      </div>
                      <div className="text-[16px]">
                        <Rating
                          initialRating={latestReview.rating}
                          emptySymbol={
                            <StarOutline
                              color={'#D1D5DB'}
                              height="20px"
                              width="20px"
                            />
                          }
                          fullSymbol={
                            <Star
                              color={'#F59E0B'}
                              height="20px"
                              width="20px"
                            />
                          }
                          readonly
                        />
                      </div>
                      <div className="text-[16px]">
                        Commentaire: {latestReview.comment}
                      </div>
                    </div>
                    <button
                      onClick={handleOpenList}
                      className="text-red-500 border border-red-500 px-4 py-2 rounded-md bg-white hover:bg-red-500 hover:text-white mt-4"
                    >
                      Voir plus
                    </button>
                  </>
                ) : (
                  <div className="text-[20px] italic">
                    Aucune critique pour le moment
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-center items-center h-[30vh] border-l border-white-1 bg-[#3c4bde]">
                <div className="text-[25px]">Poster une critique?</div>
                <button
                  onClick={handleOpenModalRate}
                  className="text-red-500 border border-red-500 px-4 py-2 rounded-md bg-white hover:bg-red-500 hover:text-white mt-4"
                >
                  Noter l'album
                </button>
                <ModalRate
                  open={openModalRate}
                  onClose={handleCloseModalRate}
                  albumCover={albumInfo.album.images[0].url}
                  albumName={albumInfo.album.name}
                  albumId={albumId}
                  fetchReviews={fetchReviews}
                />
              </div>
            </div>

            <ModalList
              open={openList}
              onClose={handleCloseList}
              comments={albumReviews}
              onDeleteComment={albumReviews.id}
            />
            <div className="text-[25px] mt-4">Titres</div>
            <ul className="overflow-y-auto">
              {albumInfo.tracks.map((track, index) => (
                <li key={index} className="mb-4">
                  <div
                    className="flex justify-between items-center p-4 border-b border-white-1 cursor-pointer hover:bg-[#1D2DB6]"
                    onClick={() => handlePreview(track.preview_url, track.name)}
                  >
                    {track.name}
                    <div>Duree : {formatDuration(track.duration_ms)}</div>
                  </div>
                </li>
              ))}
            </ul>
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
        <Footer />
      </>
    )
  )
}

function formatDuration(duration_ms) {
  const minutes = Math.floor(duration_ms / 60000)
  const seconds = ((duration_ms % 60000) / 1000).toFixed(0)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export default Album
