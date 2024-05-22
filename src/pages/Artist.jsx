import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getArtistInfo, handleSpotify } from '../core.js'
import ModalRate from '../components/Modal/ModalRate'
import ModalList from '../components/Modal/ModalList'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Link } from 'react-router-dom'
import Rating from 'react-rating'
import { StarOutline, Star } from 'react-ionicons'

function Artist() {
  const { artistId } = useParams()
  const [artistInfo, setArtistInfo] = useState(null)
  const [albums, setAlbums] = useState([])
  const [status, setStatus] = useState('')
  const [artistReviews, setArtistReviews] = useState([])
  const [averageRating, setAverageRating] = useState()
  const [openList, setOpenList] = useState(false)
  const [openModalRate, setOpenModalRate] = useState(false)

  console.log(artistId)
  console.log(artistReviews)
  // console.log("artistInfo" + artistInfo)
  // console.log("album"  + albums)

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

  const latestReview = artistReviews.length > 0 ? artistReviews[0] : null

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/api/getReviews?idArtist=${artistId}`,
      )
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération des critiques de l'artiste",
        )
      }
      const responseData = await response.json()
      setArtistReviews(responseData.reviews)
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
  }, [artistId])

  const formatNumber = number => {
    let result
    switch (true) {
      case number >= 1000000:
        result =
          (number / 1000000).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) + ' M'
        break
      case number >= 10000:
        result =
          (number / 1000).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }) + ' K'
        break
      case number >= 1000:
        result =
          (number / 1000).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 1,
          }) + ' K'
        break
      default:
        result = number.toLocaleString()
    }
    return result
  }

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
        getArtistInfo(token, artistId, setStatus, setArtistInfo, setAlbums)
      }
    }

    fetchData()
  }, [artistId])

  if (!artistInfo) {
    return (
      <div className="w-full h-screen flex text-white justify-center items-center">
        <div>Status: {status}</div>
      </div>
    )
  }

  return (
    console.log(artistInfo),
    (
      <>
        <Navbar />
        <div className="flex flex-col h-screen md:flex-row w-full bg-black text-white font-Rollicker">
          <div className="flex h-screen pb-14 flex-col p-[15px] md:w-1/4 bg-[#1D2DB6]">
            <div className="flex flex-col items-center">
              <img
                className="rounded-[20px] w-[80%] h-[80%] object-cover"
                src={artistInfo.artist.images[0].url}
              />
              <div className="text-[25px] text-center">
                {artistInfo.artist.name}
              </div>
              {artistReviews.length > 0 && (
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
                <div className="flex w-[40%] flex-col bg-white-45 justify-center">
                  <div className="text-[20px]">
                    {formatNumber(artistInfo.artist.followers.total)}
                  </div>
                  <div className="text-[15px]">followers</div>
                </div>
                <div className="flex flex-col w-[40%] bg-white-45 justify-center">
                  <div className="text-[20px]">
                    {formatNumber(artistInfo.totalTracks)}
                  </div>
                  <div className="text-[15px]">titres</div>
                </div>
              </div>

              <div className="w-[100%] flex h-[15vh] justify-around mt-[15px] ">
                <div className="flex w-[40%] flex-col bg-white-45 justify-center">
                  <div className="text-[15px]">titre le plus ecoute</div>
                  <div className="text-[20px]">
                    <Link
                      to={`/album/${artistInfo.topTracks.tracks[0].album.id}`}
                      className="text-white underline hover:text-red-500"
                    >
                      {artistInfo.topTracks.tracks[0].name}
                    </Link>
                  </div>
                </div>
                <div className="flex w-[40%] flex-col bg-white-45 justify-center">
                  <div className="text-[20px]">{artistReviews.length}</div>
                  <div className="text-[15px]">critique(s)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:w-3/4 p-[15px]">
            <div className="text-[25px] mb-3">Critiques sur l'artiste</div>

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
                  Noter l'artiste
                </button>
                <ModalRate
                  open={openModalRate}
                  onClose={handleCloseModalRate}
                  albumCover={artistInfo.artist.images[1].url}
                  artistName={artistInfo.artist.name}
                  artistId={artistId}
                  fetchReviews={fetchReviews}
                />
              </div>
            </div>

            <ModalList
              open={openList}
              onClose={handleCloseList}
              comments={artistReviews}
              onDeleteComment={artistReviews.id}
            />

            <div className="text-[25px] mt-6 mb-3">Albums de l'artiste</div>
            <div className="overflow-y-auto h-[100vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {albums.map(album => (
                  <Link key={album.id} to={`/album/${album.id}`}>
                    <div className="flex flex-col items-center">
                      <img
                        className="rounded-[10px] w-[85%] h-[85%] object-cover"
                        src={album.images[0].url}
                        alt={album.name}
                      />
                      <div className="text-[12px] mt-2">{album.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  )
}

export default Artist
