import { useState } from 'react'
import { spotifySearch, handleSpotify } from '../core'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [items, setItems] = useState({})

  const search = async () => {
    handleSpotify()
    const searchType = document.getElementById('select').value
    const response = await spotifySearch({ searchType, searchInput })
    setItems(response)
  }

  return (
    <div className="flex">
      <div class="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto border-r mt-36 bg-gradient-to-t from-gray-600">
        <h2 class="text-3xl font-semibold text-center text-gray-400">Menu</h2>


        <div class="flex flex-col justify-between mt-6">
          <aside>
            <ul>
              <li>
                <a class="flex items-center px-4 py-2 text-white" href="#">
                  <span class="mx-4 font-medium">Podcasts</span>
                </a>
              </li>

              <li>
                <a class="flex items-center px-4 py-2 mt-5 text-white" href="#">
                  <span class="mx-4 font-medium">Albums</span>
                </a>
              </li>

              <li>
                <a class="flex items-center px-4 py-2 mt-5 text-white" href="#">
                  <span class="mx-4 font-medium">Artistes</span>
                </a>
              </li>

              <li>
                <a class="flex items-center px-4 py-2 mt-5 text-white" href="#">
                  <span class="mx-4 font-medium">Genres</span>
                </a>
              </li>

              <li>
                <a class="flex items-center px-4 py-2 mt-5 text-white" href="#">
                <span class="mx-4 font-medium">Concerts</span>
                </a>
              </li>

              <li>
                <a class="flex items-center px-4 py-2 mt-5 text-white" href="#">
                  <span class="mx-4 font-medium">Commentaires</span>
                </a>
              </li>

            </ul>

          </aside>
          
        </div>
      </div>
      <div class="w-full h-full p-4 m-8 overflow-y-auto">
        <div class="grid items-center justify-center p-40 ">
        <div className=" sticky flex justify-center gap-3">
        <input
          placeholder="Chercher un album"
          className="relative m-0 -mr-0.5 block min-w-0  rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          onKeyUp={event => {
            if (event.key === 'Enter') {
              search()
            }
          }}
          onChange={event => setSearchInput(event.target.value)}
        ></input>
        <select
          defaultValue={''}
          id="select"
          name="select"
          className="block py-2.5 text-center px-0 w-36 text-sm bg-transparent border-b-2 border-gray-200 appearance-none border-black focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option defaultValue={true} value="art" className="text-black">
            {'<'} -Selectionner-{'>'}
          </option>
          <option value="artist" className="text-black">
            Artist
          </option>
          <option value="album" className="text-black">
            Album
          </option>
          <option value="track" className="text-black">
            Chanson
          </option>
        </select>

        <button
          onClick={search}
          className="relative border-2 text-white z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight  shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
        >
          Rechercher{' '}
        </button>
      </div>
      <p class="text-white text-2xl font-Rollicker">Artiste</p>
      <div className="flex space-x-20 justify-center">
        {items &&
          items.length > 0 &&
          items.slice(0, 6).map((item, index) => (
            <div key={index}>
              <a>{item.name}</a>
              {item.images !== undefined ? (
                <img
                  className="rounded-full"
                  style={{ width: '5em' }}
                  src={
                    item.images.length > 0
                      ? item.images[0].url
                      : 'URL_PAR_DEFAUT_SI_AUCUNE_IMAGE'
                  }
                />
              ) : (
                ''
              )}
            </div>
          ))}
      </div>
        </div>
     
    </div>
</div>
  )
}

export default App
