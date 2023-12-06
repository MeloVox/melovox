import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, API } from '../logs.js'
import querystring from 'querystring'
import { Buffer } from 'buffer/'

export const submitGoogle = (googleUser, setMessage, navigate) => {
  fetch(`${API}/api/handlegoogle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(googleUser),
  })
    .catch(err => {
      if (err instanceof TypeError)
        setMessage(`API offline: login not supported`)
      else setMessage(err.toString())
      return
    })
    .then(reponse => {
      if (!reponse) return
      reponse.json().then(response => {
        const { message, data } = response
        setMessage(message)
        if (data) {
          localStorage.setItem('user', JSON.stringify(response))
          navigate('/profile')
        }
      })
    })
}

export const submitLogin = (user, setMessage, navigate) => {
  const { mail, password } = user
  fetch(`${API}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: mail, password }),
  })
    .catch(err => {
      if (err instanceof TypeError)
        setMessage(`API offline: login not supported`)
      else setMessage(err.toString())
      return
    })
    .then(reponse => {
      if (!reponse) return
      reponse.json().then(response => {
        const { message, data } = response
        setMessage(message)
        if (data) {
          localStorage.setItem('user', JSON.stringify(response))
          navigate('/profile')
        }
      })
    })
}

export const submitRegister = (user, setMessage) => {
  const { mail, password } = user
  fetch(`${API}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: mail, password }),
  })
    .catch(err => {
      if (err instanceof TypeError)
        setMessage(`API offline: register not supported`)
      else setMessage(err.toString())
      return
    })
    .then(reponse => {
      if (!reponse) return
      reponse.json().then(data => {
        const { message } = data
        setMessage(message)
      })
    })
}

export const handleSpotify = () => {
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
      console.error('Error getting access token', error)
    })
    .then(response => {
      if (!response) return
      response.json().then(data => {
        localStorage.setItem('spotify-token', JSON.stringify(data))
      })
    })
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
      console.error('Error getting artist info', error)
    })
}
