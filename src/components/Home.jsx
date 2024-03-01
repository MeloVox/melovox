import { useState } from 'react'
import { spotifySearch, handleSpotify } from '../core'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [items, setItems] = useState([])

  const search = async () => {
    handleSpotify()
    const response = sessionStorage.getItem('spotify-token')
    if (response) {
      const { token_type, access_token } = JSON.parse(response)
      const token = `${token_type} ${access_token}`
      const items = await spotifySearch({ token, searchInput })
      setItems(items)
      console.log(items)
    }
  }

  return (
    <div className="flex mt-10 ">
      {/* <div className="w-64 h-screen px-4 py-8 overflow-y-auto border-r bg-gradient-to-t from-gray-600 ">
        <h2 className="text-3xl font-semibold text-center text-gray-400">
          Menu
        </h2>
        <div className="flex flex-col justify-between mt-6">
          <aside>
            <ul>
              <li>
                <a className="flex items-center px-4 py-2 text-white" href="#">
                  <span className="mx-4 font-medium">Podcasts</span>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center px-4 py-2 mt-5 text-white"
                  href="#"
                >
                  <span className="mx-4 font-medium">Albums</span>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center px-4 py-2 mt-5 text-white"
                  href="#"
                >
                  <span className="mx-4 font-medium">Artistes</span>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center px-4 py-2 mt-5 text-white"
                  href="#"
                >
                  <span className="mx-4 font-medium">Genres</span>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center px-4 py-2 mt-5 text-white"
                  href="#"
                >
                  <span className="mx-4 font-medium">Concerts</span>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center px-4 py-2 mt-5 text-white"
                  href="#"
                >
                  <span className="mx-4 font-medium">Commentaires</span>
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div> */}

      <div className="flex flex-col w-full h-full p-4 m-8 overflow-y-auto items-center">
        <div className="flex justify-between gap-6 mb-6 mt-10">
          <div className="flex gap-6 w-full">
            <input
              id="searchInput"
              placeholder="Chercher un album"
              className="relative block w-1/3 px-3 py-[0.25rem] text-base border border-solid border-neutral-300 rounded-l focus:outline-none focus:border-primary h-8"
              onChange={event => setSearchInput(event.target.value)}
            />
            <button
              onClick={search}
              className="border border-solid border-black px-6 py-2.5 bg-primary text-white rounded-r hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Rechercher
            </button>
          </div>
          <p className="text-white text-2xl font-Rollicker">Artiste</p>
        </div>

        <div className="flex justify-center flex-wrap gap-4 mt-30">
          {items.slice(0, 5).map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {item.images !== undefined ? (
                <div className="cd-image">
                  <img
                    className="rounded-full"
                    src={
                      item.images.length > 0
                        ? item.images[0].url
                        : 'URL_PAR_DEFAUT_SI_AUCUNE_IMAGE'
                    }
                    alt={item.name}
                  />
                  <div className="cd-hole"></div>
                </div>
              ) : (
                ''
              )}
              <a className="text-center text-white">{item.name}</a>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 w-full mt-36 h-60">
          <div>
            <p className="text-white text-2xl font-Rollicker">Pop</p>
          </div>
          <div>
            <div>
              <div className="flex justify-center gap-4">
                {items.slice(0, 7).map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center bg-stone-900  w-40"
                  >
                    {item.images !== undefined ? (
                      <div>
                        <img
                          className="object-scale-down h-24 w-20"
                          src={
                            item.images.length > 0
                              ? item.images[0].url
                              : 'URL_PAR_DEFAUT_SI_AUCUNE_IMAGE'
                          }
                          alt={item.name}
                        />
                        <div></div>
                      </div>
                    ) : (
                      ''
                    )}
                    <a className="text-center text-white">{item.name}</a>
                    <a className="text-center ">⭐⭐⭐⭐⭐</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
