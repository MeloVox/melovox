import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getSpotifyProfile } from '../core'

const Callback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const loginCode = searchParams.get('code')
    if (loginCode) {
      sessionStorage.setItem('spotify-login', loginCode)
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
