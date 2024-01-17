import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, API } from '../logs.js'
import querystring from 'querystring'
import { Buffer } from 'buffer/'

export const authMelovoxAPI = ({ url, props, callback }) => {
  const { navigate, setMessage } = callback
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  }
  fetch(`${API}/${url}`, params)
    .catch(err => {
      if (err instanceof TypeError)
        return setMessage(`API offline: login not supported`)
      return setMessage(err.toString())
    })
    .then(reponse => {
      if (!reponse.ok) return setMessage(`API offline: login not supported`)
      reponse.json().then(response => {
        const { message, data } = response
        setMessage(message)
        if (data) {
          sessionStorage.setItem('user', JSON.stringify(response))
          const event = new CustomEvent('userLoggedIn')
          window.dispatchEvent(event)
          navigate('/profile')
          return
        }
      })
    })
}

export const handleSpotify = setStatus => {
  const authUrl = 'https://accounts.spotify.com/api/token'
  const spotify = `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`

  fetch(authUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(spotify).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'client_credentials',
    }),
  })
    .catch(error => {
      return setStatus(error.message)
    })
    .then(response => {
      if (!response) return setStatus(`fetch error: check your connexion`)
      response
        .json()
        .then(data =>
          localStorage.setItem('spotify-token', JSON.stringify(data)),
        )
    })
}

export const spotifyLogin = () => {
  const scope = 'user-read-private user-read-email'
  const client_id = SPOTIFY_CLIENT_ID

  window.location.href =
    'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri: 'http://localhost:5173/callback',
    })
}

export const fetchData = (url, headers) => {
  return fetch(url, headers)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
    .catch(error => {
      console.error('Error fetching data', error)
    })
}

export const getArtistInfo = (token, artistId, setStatus, setArtistInfo) => {
  const artistInfo = { artist: null, lastAlbum: null, topTracks: null }
  const headers = {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  }
  const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`
  const albumUrl = `https://api.spotify.com/v1/artists/${artistId}/albums?limit=1`
  const topTracksUrl = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=FR`

  setStatus(`getting data...`)

  Promise.all([
    fetchData(artistUrl, headers),
    fetchData(albumUrl, headers),
    fetchData(topTracksUrl, headers),
  ])
    .then(([artist, lastAlbum, topTracks]) => {
      artistInfo.artist = artist
      artistInfo.lastAlbum = lastAlbum
      artistInfo.topTracks = topTracks
      setArtistInfo(artistInfo)
    })
    .catch(error => {
      return setStatus(error.message)
    })
}
