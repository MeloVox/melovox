import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, API } from '../logs.js'
import querystring from 'querystring'
import { Buffer } from 'buffer'

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
      if (err instanceof TypeError) {
        return setMessage('API offline: login not supported')
      }
      return setMessage(err.toString())
    })
    .then(reponse => {
      if (!reponse.ok) return setMessage('API offline: login not supported')
      reponse.json().then(response => {
        const { message, data } = response
        setMessage(message)
        if (data) {
          sessionStorage.setItem('user', JSON.stringify(response))
          const event = new CustomEvent('userLoggedIn')
          window.dispatchEvent(event)
          navigate('/profile')
        }
      })
    })
}

export async function spotifySearch({ token, searchInput }) {
  const searchParameters = {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  }

  return fetch(
    `https://api.spotify.com/v1/search?q=${searchInput}&type=artist,album,track`,
    searchParameters,
  ).then(response =>
    response.json().then(data => {
      const items = ['artists', 'albums', 'tracks'].flatMap(
        type => data[type].items,
      )
      return items
    }),
  )
}

export const getSpotifyProfile = () => {
  const spotify = sessionStorage.getItem('spotify-auth')
  fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${spotify}`,
    },
  }).then(async response => {
    if (!response) return
    return await response.json()
  })
}

export const handleSpotify = setStatus => {
  const storedToken = JSON.parse(sessionStorage.getItem('spotify-token'))
  if (storedToken && storedToken.expires_at > Date.now()) {
    return Promise.resolve()
  }

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
      response.json().then(data => {
        if (data) {
          data.expires_at = Date.now() + data.expires_in * 1000
          sessionStorage.setItem('spotify-token', JSON.stringify(data))
        } else {
          setStatus('No data received from Spotify API')
        }
      })
    })
}

export const getAuthToken = loginCode => {
  const authUrl = 'https://accounts.spotify.com/api/token'
  const spotify = `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`

  fetch(authUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(spotify).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      code: loginCode,
      redirect_uri: 'http://localhost:5173/callback',
      grant_type: 'authorization_code',
    },
    body: querystring.stringify({
      grant_type: 'client_credentials',
    }),
  }).then(response => {
    if (!response) return
    response.json().then(data => {
      console.log(data)
      localStorage.setItem('spotify-auth', JSON.stringify(data))
    })
  })
}

export const spotifyLogin = () => {
  const scope = 'user-read-private user-read-email'
  const client_id = SPOTIFY_CLIENT_ID

  const generateRandomString = length => {
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const values = crypto.getRandomValues(new Uint8Array(length))
    return values.reduce((acc, x) => acc + possible[x % possible.length], '')
  }

  const codeVerifier = generateRandomString(64)

  const sha256 = async plain => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }

  const base64encode = input => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  }

  const hashed = sha256(codeVerifier)
  const codeChallenge = base64encode(hashed)
  const authUrl = new URL('https://accounts.spotify.com/authorize')

  // generated in the previous step
  window.localStorage.setItem('code_verifier', codeVerifier)

  const params = {
    response_type: 'code',
    client_id,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: 'http://localhost:5173/callback',
  }

  authUrl.search = new URLSearchParams(params).toString()
  window.location.href = authUrl.toString()
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
  const albumsUrl = `https://api.spotify.com/v1/artists/${artistId}/albums?limit=50`

  setStatus('getting data...')

  Promise.all([
    fetchData(artistUrl, headers),
    fetchData(albumUrl, headers),
    fetchData(topTracksUrl, headers),
    fetchData(albumsUrl, headers),
  ])
    .then(([artist, lastAlbum, topTracks, albums]) => {
      artistInfo.artist = artist
      artistInfo.lastAlbum = lastAlbum
      artistInfo.topTracks = topTracks

      const totalTracks = albums.items.reduce(
        (sum, album) => sum + album.total_tracks,
        0,
      )
      artistInfo.totalTracks = totalTracks

      setArtistInfo(artistInfo)
    })
    .catch(error => {
      return setStatus(error.message)
    })
}
