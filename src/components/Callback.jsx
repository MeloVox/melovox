import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getAuthToken, getSpotifyProfile } from '../core'

const Callback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const loginCode = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      const event = new CustomEvent('userDisconnected')
      window.dispatchEvent(event)
      navigate('/login')
      return
    }

    if (loginCode) {
      console.log(loginCode)
      sessionStorage.setItem('spotify-login', loginCode)
      getAuthToken(loginCode)
      const userSpotify = getSpotifyProfile()
      console.log(userSpotify)
      const event = new CustomEvent('userLoggedIn')
      window.dispatchEvent(event)
      navigate('/profile')
      return
    }
    navigate('/login')
  }, [navigate, searchParams])
  return <></>
}

export default Callback
