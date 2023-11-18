import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Callback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const loginCode = searchParams.get('code')
    if (loginCode) {
      sessionStorage.setItem('spotify-login', loginCode)
      navigate('/profile')
      return
    }
    const event = new CustomEvent('userLoggedIn')
    window.dispatchEvent(event)
    navigate('/login')
  }, [navigate, searchParams])
  return <></>
}

export default Callback
