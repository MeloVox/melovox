import { useState } from 'react'
import { spotifySearchArtists, handleSpotify } from '../core'
import SwiperDisk from '../components/Swiper/SwiperDisk'
import SwiperList from '../components/Swiper/SwiperList'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import useMediaQuery from '../hooks/useMediaQuery'
import Background from '../components/Background/Background'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)

  const isMobile = useMediaQuery('(max-width: 768px)')

  const search = async () => {
    handleSpotify()
    const response = sessionStorage.getItem('app-spotify-token')

    if (!searchInput.trim()) {
      setError('Veuillez saisir quelque chose dans le champ de recherche.')
      return
    }

    if (response) {
      const { token_type, access_token } = JSON.parse(response)
      const token = `${token_type} ${access_token}`
      const items = await spotifySearchArtists({ token, searchInput })
      setItems(items)
      setError(null)
    }
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      search()
    }
  }

  return (
    <>
      <Background />
      <Navbar />
      <div className="flex w-full h-[80vh]">
        <div className="flex flex-col w-full h-full items-center">
          <div className="flex w-3/4 flex-col items-center justify-start p-3">
            <p className="text-xl my-5 font-Anton">
              Recherchez votre artiste préféré !
            </p>

            <div className="flex w-full md:w-1/2">
              <input
                id="searchInput"
                placeholder="Chercher un artiste"
                className="block w-full px-3 py-2 text-black border-neutral-300 rounded-full focus:outline-none focus:border-primary"
                onChange={event => setSearchInput(event.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button
                type="submit"
                onClick={search}
                className="px-6 py-2 text-white"
              >
                Rechercher
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          {isMobile ? (
            <SwiperList images={items} />
          ) : (
            <SwiperDisk images={items} />
          )}
          {/* <p className="text-white text-2xl font-Rollicker">Artiste : </p> */}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
