import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getAccessToken, getSpotifyProfile } from '../core'

const Callback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function gettoken() {
      const data = await getAccessToken(code)
      if (!data) return
      await getSpotifyProfile(data.access_token)
      const event = new CustomEvent('userLoggedIn')
      window.dispatchEvent(event)
      navigate('/genre')
    }
    const error = searchParams.get('error')
    const code = searchParams.get('code')

    if (error) {
      const event = new CustomEvent('userDisconnected')
      window.dispatchEvent(event)
      navigate('/login')
      return
    }

    if (code) {
      gettoken()
      return
    }
  }, [navigate, searchParams])
  return <></>
}

export default Callback
