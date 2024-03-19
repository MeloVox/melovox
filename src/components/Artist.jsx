import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getArtistInfo, handleSpotify } from '../core.js'

function Artist() {
  const { artistId } = useParams()
  const [artistInfo, setArtistInfo] = useState(null)
  const [status, setStatus] = useState('')

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
    handleSpotify()
    const response = sessionStorage.getItem('spotify-token')
    if (response) {
      const { token_type, access_token } = JSON.parse(response)
      const token = `${token_type} ${access_token}`
      getArtistInfo(token, artistId, setStatus, setArtistInfo)
    }
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
      <div className="flex w-full mt-[30rem] bg-black text-white">
        <div className="w-[40%] bg-[#1D2DB6]">
          <div className="p-[15px]">
            <img
              className="rounded-[20px] mr-auto ml-auto mt-10"
              src={artistInfo.artist.images[1].url}
            />
          </div>
          <div className="text-center text-[60px] font-Rollicker">
            {artistInfo.artist.name}
          </div>
          <div className="flex flex-wrap">
            <div className="w-[100%] flex justify-center text-center">
              <div
                className="w-[37%] min-h-[15vh] max-h-[15vh] flex justify-center flex-col"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.45)' }}
              >
                <div className="font-Anton">
                  {formatNumber(artistInfo.artist.followers.total)}
                </div>
                <div className="text-black text-[10px] font-Roboto font-bold">
                  Followers
                </div>
              </div>
              <div
                className="w-[37%] min-h-[15vh] max-h-[15vh] flex justify-center flex-col ml-[2vh]"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.45)' }}
              >
                <div className="font-Anton">TODO</div>
                <div className="text-black text-[10px] font-Roboto font-bold">
                  Commentaires
                </div>
              </div>
            </div>
            <div className="w-[100%] flex justify-center mt-[2vh] text-center items-center">
              <div
                className="w-[37%] min-h-[15vh] max-h-[15vh] flex justify-center flex-col"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.45)' }}
              >
                <div className="font-Anton">
                  {artistInfo.topTracks.tracks[0].name.split('(')[0].trim()}
                </div>
                <div className="text-black text-[10px] font-Roboto font-bold">
                  Titre le plus écouté
                </div>
              </div>
              <div
                className="w-[37%] min-h-[15vh] max-h-[15vh] flex justify-center flex-col ml-[2vh]"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.45)' }}
              >
                <div className="font-Anton">{artistInfo.totalTracks}</div>
                <div className="text-black text-[10px] font-Roboto font-bold">
                  Titres
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="font-Anton text-[22px] mt-5 mb-3 ml-12">
              Commentaires récents{' '}
            </div>
          </div>
          <div className="h-[25vh]">
            <div className="bg-bubble-comment bg-no-repeat bg-cover w-[286px] h-[105px] m-auto text-[12px] font-Roboto flex items-center justify-center">
              <div className="w-[80%] h-[60%] leading-[17px]">
                Lorem ipsum dolor sit amet consectetur. Id eget convallis donec
                pellentesque sagittis. Lacus ultricies ...
              </div>
            </div>
            <div className="flex justify-between w-[80%] m-auto">
              <img
                className="rounded-full w-[40px] h-[40px]"
                src={artistInfo.artist.images[1].url}
              />
              <div className="text-[10px] mt-6">Voir plus</div>
            </div>
          </div>
        </div>
        <div className="w-[60%]">
          <div className="font-Rollicker text-[40px] ml-5">Sons populaires</div>
          <div className="flex flex-wrap">
            <div className="w-[100%] flex justify-center text-center">
              <div className="w-[45%] h-[400px] flex flex-col">
                <img
                  className="rounded-full h-[250px] w-[250px] border-4 border-[#0DD940]"
                  src={artistInfo.topTracks.tracks[0].album.images[1].url}
                />
                <div className="text-left font-Anton text-2xl mt-5">
                  {artistInfo.topTracks.tracks[0].name.split('(')[0].trim()}
                </div>
              </div>
              <div className="w-[45%] h-[400px] flex flex-col">
                <img
                  className="rounded-full h-[250px] w-[250px] border-4 border-[#0DD940]"
                  src={artistInfo.topTracks.tracks[1].album.images[1].url}
                />
                <div className="text-left font-Anton text-2xl mt-5">
                  {artistInfo.topTracks.tracks[1].name.split('(')[0].trim()}
                </div>
              </div>
            </div>
            <div className="w-[100%] flex justify-center mt-[2vh] text-center items-center">
              <div className="w-[45%] h-[400px] flex flex-col">
                <img
                  className="rounded-full h-[250px] w-[250px] border-4 border-[#0DD940]"
                  src={artistInfo.topTracks.tracks[2].album.images[1].url}
                />
                <div className="text-left font-Anton text-2xl mt-5">
                  {artistInfo.topTracks.tracks[2].name.split('(')[0].trim()}
                </div>
              </div>
              <div className="w-[45%] h-[400px] flex flex-col">
                <img
                  className="rounded-full h-[250px] w-[250px] border-4 border-[#0DD940]"
                  src={artistInfo.topTracks.tracks[3].album.images[1].url}
                />
                <div className="text-left font-Anton text-2xl mt-5">
                  {artistInfo.topTracks.tracks[3].name.split('(')[0].trim()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Artist
