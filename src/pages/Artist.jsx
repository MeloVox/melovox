import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getArtistInfo, handleSpotify } from '../core.js'
import ModalRate from '../components/Modal/ModalRate'
import ModalList from '../components/Modal/ModalList'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Link } from 'react-router-dom'

function Artist() {
  const { artistId } = useParams()
  const [artistInfo, setArtistInfo] = useState(null)
  const [albums, setAlbums] = useState([])
  const [status, setStatus] = useState('')
  const [artistReviews, setArtistReviews] = useState([])
  const [averageRating, setAverageRating] = useState()

  // console.log(artistId)
  console.log(artistReviews)
  console.log(artistInfo)
  console.log(albums)

  const [open, setOpen] = useState(false)

  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  const latestReview = artistReviews.length > 0 ? artistReviews[0] : null

  const fetchArtistReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/api/getReviews?artist=${artistId}`,
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
    fetchArtistReviews()
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
              <div className="text-[25px]">{artistInfo.artist.name}</div>
              <div>
                <div className="text-[20px]">Note moyenne : </div>
                <div className="text-[25px] text-center">{averageRating}⭐</div>
              </div>
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
                  <div className="text-[20px]"></div>
                  <div className="text-[15px]">le plus ecoute</div>
                </div>
                <div className="flex w-[40%] flex-col bg-white-45 justify-center">
                  <div className="text-[20px]">{artistReviews.length}</div>
                  <div className="text-[15px]">critique(s)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:w-3/4 p-[15px]">
            <div className="text-[25px] mb-4">Critiques sur l'artiste</div>

            <div className="flex flex-row items-left mt-[15px]">
              <div
                className="flex flex-col items-left mt-[15px]"
                style={{ border: '2px solid red' }}
              >
                <div className="text-[20px]">Poster une critique?</div>
                <button
                  onClick={handleOpenModal}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    color: 'red',
                    width: 'fit-content',
                    justifyContent: 'center',
                    padding: '10px',
                    border: '1px solid red',
                  }}
                >
                  Noter l'artiste
                </button>
                <ModalRate
                  open={open}
                  onClose={handleCloseModal}
                  albumCover={artistInfo.artist.images[1].url}
                  albumName={artistInfo.artist.name}
                  artistId={artistId}
                  fetchArtistReviews={fetchArtistReviews}
                />
              </div>
              <div
                className="flex flex-col items-left mt-[15px]"
                style={{ border: '2px solid red' }}
              >
                <div className="text-[20px]">Derniere critique :</div>
                {latestReview && (
                  <div key={latestReview.id} className="review">
                    <p>Rating: {latestReview.rating}</p>
                    <p>Commentaire: {latestReview.comment}</p>
                  </div>
                )}
                <button onClick={handleOpenModal}>Voir plus</button>
              </div>
            </div>

            <ModalList
              open={open}
              onClose={handleCloseModal}
              comments={artistReviews}
              onDeleteComment={artistReviews.id}
            />

            <div className="text-[25px] mt-8 mb-4">Albums de l'artiste</div>
            <div
              className="overflow-y-auto max-h-[70vh]"
              style={{ border: '2px solid red' }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {albums.map(album => (
                  <Link key={album.id} to={`/album/${album.id}`}>
                    <div className="flex flex-col items-center">
                      <img
                        className="rounded-[10px] w-full h-[auto] object-cover"
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
