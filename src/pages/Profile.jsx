import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'
import { getSpotifyArtistsFollowed } from '../core'
import Background from './Background'

const Profile = () => {
  const [user, setUser] = useState([])
  const [spotify_data, setData] = useState([])
  const navigate = useNavigate()
  const [image, setImage] = useState([])

  useEffect(() => {
    const response = sessionStorage.getItem('user')
    const token = sessionStorage.getItem('spotify-token')
    const spotify = sessionStorage.getItem('spotify-user')

    if (response) {
      const { data } = JSON.parse(response)
      setUser(data)
      console.log(data)
    }

    if (spotify) {
      const spotify_user = JSON.parse(spotify)
      setUser(spotify_user)
      const list_images = spotify_user.images
      list_images.forEach(image => {
        setImage(image.url)
        return
      })

      getSpotifyArtistsFollowed(token, setData)
    }

    if (!response && !spotify) {
      navigate('/login')
      return
    }
  }, [navigate])

  const logout = () => {
    googleLogout()
    sessionStorage.clear()
    const event = new CustomEvent('userDisconnected')
    window.dispatchEvent(event)
    navigate('/login')
  }
  return (
    <div className="bgcolor flex justify-center w-full h-screen text-white">
      <Background />
      <section className="w-[50%] h-full">
        <div className="h-[50%] flex justify-center items-center">
          <div className="h-full w-full flex justify-center items-center">
            <img
              className="rounded-full size-32	bg-cover	"
              src={user?.picture || image}
              alt=""
            />
          </div>
        </div>
        <div>
          <div className="w-full flex justify-center items-center flex-col">
            <h1 className="text-xl font-Rollicker">
              {user?.followers?.total} - Followers
            </h1>
          </div>
        </div>
      </section>
      <section className="w-[50%] h-full">
        <div className="h-[50%] w-[80%] flex justify-center items-center">
          <div className="w-full bgbox rounded-lg p-5 space-y-5">
            <h1 className="text-xl font-Rollicker">User Informations</h1>
            <div className="font-Anton flex flew-col space-x-5">
              <span>{user?.display_name}</span>
              <span>{user?.email}</span>
            </div>
            <button
              className="hover:text-slate-300 hover:border-slate-300 border rounded-md p-2"
              onClick={logout}
            >
              Disconnect
            </button>
          </div>
        </div>
        <div>
          {spotify_data ? (
            <>
              <h1 className="text-xl font-Rollicker">Followed Artists</h1>
              <div className="font-Anton text-white flex flex-wrap mt-5">
                {spotify_data.map((artist, index) => {
                  return (
                    <>
                      <img
                        key={index}
                        className="rounded-full pt-5 pl-5"
                        src={artist.images[0].url}
                        width={100}
                      />
                    </>
                  )
                })}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
    </div>
  )
}

export default Profile
