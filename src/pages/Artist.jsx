import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getArtistInfo, handleSpotify } from '../core.js'
import ModalRate from '../components/Modal/ModalRate'

function Artist() {
  const { artistId } = useParams()
  const [artistInfo, setArtistInfo] = useState(null)
  const [status, setStatus] = useState('')

  const [open, setOpen] = useState(false)

  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

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
      <div className="flex w-full bg-black text-white font-Rollicker">
        <div className="w-[40%] bg-[#188481]">
          <div className="p-[15px]">
            <img
              className="rounded-[20px] border-4 border-white mr-auto ml-auto"
              src={artistInfo.artist.images[0].url}
            />
          </div>
          <div className="text-center text-[60px]">
            {artistInfo.artist.name}
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
                <div>Titre le plus populaire</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[60%]">2</div>
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
        />
      </div>
    )
  )
}

export default Artist
