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

export const getArtistInfo = (token, artistId, setStatus, setArtistInfo) => {
  const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`
  setStatus(`getting data...`)
  fetch(artistUrl, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
    .then(response => {
      if (!response.ok) {
        if (response.status == 429) return setStatus('Too many request (429)')
        return setStatus(`fetch error ${response.status}`)
      }
      response.json().then(response => setArtistInfo(response))
    })
    .catch(error => {
      return setStatus(error.message)
    })
}
