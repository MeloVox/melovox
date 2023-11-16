import { useParams } from 'react-router-dom'
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../../logs.js'
import { useState, useEffect } from 'react'
import querystring from 'querystring'
import { Buffer } from 'buffer/'

function Artist() {
  const { artistId } = useParams()
  const [artistInfo, setArtistInfo] = useState(null)
  const [token, setToken] = useState(null)
  function getAccessToken() {
    const authUrl = 'https://accounts.spotify.com/api/token'

    const auth = Buffer.from(
      `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
    ).toString('base64')
    const headers = {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    const data = querystring.stringify({
      grant_type: 'client_credentials',
    })

    fetch(authUrl, {
      method: 'POST',
      headers: headers,
      body: data,
    })
      .catch(error => {
        console.error('Error getting access token', error)
      })
      .then(response => {
        response.json().then(data => {
          setToken(data.access_token)
        })
      })
  }

  function getArtistInfo(spotifyArtistId, accessToken) {
    const artistUrl = `https://api.spotify.com/v1/artists/${spotifyArtistId}`

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }

    fetch(artistUrl, {
      method: 'GET',
      headers: headers,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        response.json().then(data => {
          setArtistInfo(data)
        })
      })
      .catch(error => {
        console.error('Error getting artist info', error)
      })
  }

  useEffect(() => {
    async function fetchData() {
      getAccessToken()
      getArtistInfo(artistId, token)
    }

    fetchData()
  }, [])

  if (!artistInfo) {
    return <div>Erreur</div>
  }

  return (
    console.log(artistInfo),
    (
      <div className="bgcolor flex justify-center w-full h-full text-white">
        <section className="w-[50%] h-full mt-50">
          <div className="h-[50%] flex justify-center items-center">
            <div className="h-full w-full flex justify-center items-center">
              <img
                className="rounded-full w-[250px] h-[250px]"
                src={artistInfo.images[0].url}
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="w-full flex justify-center items-center flex-col">
              <h1 className="text-xl font-Rollicker">Followers</h1>
              <div className="font-Anton">
                <span>{artistInfo.name}</span>
                <span>{artistInfo.name}</span>
              </div>
            </div>
          </div>
        </section>
        <section className="w-[50%] h-screen">
          <div className="h-[50%] w-[80%] flex justify-center items-center">
            <div className="w-full bgbox rounded-lg p-5 space-y-5">
              <h1 className="text-xl font-Rollicker">User Informations</h1>
              <div className="font-Anton flex flew-col">
                <span>email</span>
              </div>
              <button className="hover:text-slate-300 hover:border-slate-300 border rounded-md p-2">
                Disconnect
              </button>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-Rollicker">Favorite Songs</h1>
            <div className="font-Anton">
              <span>Song 1</span>
            </div>
          </div>
        </section>
      </div>
    )
  )
}

export default Artist
