import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getArtistInfo, handleSpotify } from '../core.js'
import ModalRate from '../components/Modal/ModalRate'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

function Artist() {
  const { artistId } = useParams()
  const [artistInfo, setArtistInfo] = useState(null)
  const [status, setStatus] = useState('')
  const [artistReviews, setArtistReviews] = useState([])
  const [averageRating, setAverageRating] = useState()

  // console.log(artistId)
  console.log(artistReviews)

  const [open, setOpen] = useState(false)

  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

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
        getArtistInfo(token, artistId, setStatus, setArtistInfo)
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
        <div
          className="flex flex-col md:flex-row w-full bg-black text-white font-Rollicker"
          style={{ border: '2px solid red' }}
        >
          <div className="md:w-2/6 bg-[#1D2DB6]">
            <div
              className="p-[15px]"
              style={{
                border: '2px solid red',
              }}
            >
              <img
                className="rounded-[20px] border-4 border-white mr-auto ml-auto w-[40%]"
                src={artistInfo.artist.images[0].url}
              />
              <div className="text-center text-[35px]">
                {artistInfo.artist.name}
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-[100%] flex justify-around text-center">
                <div
                  className="w-[40%] min-h-[15vh] max-h-[15vh]"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.45)' }}
                >
                  <div>{formatNumber(artistInfo.artist.followers.total)}</div>
                  <div>Followers</div>
                </div>
                <div
                  className="w-[40%] min-h-[15vh] max-h-[15vh]"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.45)' }}
                >
                  <div>TODO</div>
                  <div>De commentaires</div>
                </div>
              </div>
              <div className="w-[100%] flex justify-around mt-[2vh] text-center ">
                <div
                  className="w-[40%] min-h-[15vh] max-h-[15vh]"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.45)' }}
                >
                  <div>
                    {artistInfo.topTracks.tracks[0].name.split('(')[0].trim()}
                  </div>
                  <div>PAS LINFO</div>
                </div>
                <div
                  className="w-[40%] min-h-[15vh] max-h-[15vh]"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.45)' }}
                >
                  <div>{artistInfo.totalTracks}</div>
                  <div className="reviews">
                    <h2>Critiques de l'artiste</h2>
                    <p>Note moyenne : {averageRating}</p>
                    {artistReviews.map(review => (
                      <div key={review.id} className="review">
                        <p>Rating: {review.rating}</p>
                        <p>Commentaire: {review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">2</div>
          <button
            onClick={handleOpenModal}
            style={{
              display: 'flex',
              flexDirection: 'row',
              color: 'red',
              width: 'fit-content',
              padding: '3px',
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
        <Footer />
      </>
    )
  )
}

export default Artist
