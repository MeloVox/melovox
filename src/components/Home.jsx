import { useState } from 'react'
import { spotifySearch } from '../core'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [items, setItems] = useState({})

  const search = async () => {
    const searchType = document.getElementById('select').value
    const response = await spotifySearch({ searchType, searchInput })
    setItems(response)
  }


  return (
    <div className="mt-4 pt-72 w-full  text-white bg-black ">
      <div className="flex justify-center gap-6">
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

      <div className="flex-col gap-6 flex mt-8">
        <div className="flex justify-center items-center gap-8 w-full">
          <div className="bg-gradient-to-r from-red-400 to-red-300 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            <div className="m-auto">Rap</div>
          </div>
          <div className="bg-gradient-to-r from-yellow-200 to-yellow-300 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            Techno
          </div>
          <div className="bg-gradient-to-r from-green-200 to-green-300 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            <div className="m-auto">Disco</div>
          </div>
          <div className="bg-gradient-to-r from-blue-700 to-blue-200 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            Jazz
          </div>

          <div className="bg-gradient-to-r from-red-400 to-red-300 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            <div className="m-auto">Metal</div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-8 w-full ">
          <div className="bg-gradient-to-r from-green-200 to-blue-300 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            <div className="m-auto">Raggae</div>
          </div>
          <div className="bg-gradient-to-r from-green-200 to-green-400 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            Chill
          </div>
          <div className="bg-gradient-to-r from-red-400 to-red-200 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            <div className="m-auto">K-Pop</div>
          </div>
          <div className="bg-gradient-to-r from-orange-200 to-orange-400 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            <div className="m-auto">Lo-Fi</div>
          </div>
          <div className="bg-gradient-to-r from-green-200 to-green-400 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            Movies
          </div>
          <div className="bg-gradient-to-r from-green-200 to-blue-400 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            Funk
          </div>
        </div>

        <div className="flex justify-center items-center gap-8 w-full ">
          <div className="bg-gradient-to-r from-green-200 to-green-300 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            <div className="m-auto">RnB</div>
          </div>
          <div className="bg-gradient-to-r from-blue-700 to-blue-200 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            Alternatif
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-yellow-200 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            <div className="m-auto">Dub</div>
          </div>
          <div className="bg-gradient-to-r from-pink-400 to-pink-200 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            Funk
          </div>
          <div className="bg-gradient-to-r from-blue-700 to-blue-200 w-36 h-36 rounded-full text-center items-center justify-center flex text-white text-xl font-bold">
            Electro
          </div>
        </div>
      </div>
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
  //     <Container>
  //       <h4>Artistes</h4>
  //       <Row className="mx-5 row row-cols-6">
  //         {artist &&
  //           artist.length > 0 &&
  //           artist.slice(0, 6).map((singleArtist, index) => (
  //             <Card key={index}>
  //               <CardBody>
  //                 <CardImg
  //                   style={{ width: '2em' }}
  //                   src={
  //                     singleArtist.images.length > 0
  //                       ? singleArtist.images[0].url
  //                       : 'URL_PAR_DEFAUT_SI_AUCUNE_IMAGE'
  //                   }
  //                 />
  //                 <CardTitle style={{ fontSize: '15px' }}>
  //                   {singleArtist.name}
  //                 </CardTitle>
  //                 <CardText style={{ fontSize: '15px' }}>
  //                   {singleArtist.followers.total ??
  //                     'Nombre de followers non disponible'}
  //                 </CardText>
  //               </CardBody>
  //             </Card>
  //           ))}
  //       </Row>
  //       <h4>Albums du premier Artiste</h4>
  //       <Row className="mx-2 row row-cols-6">
  //         {albums.slice(0, 6).map((album, i) => {
  //           return (
  //             <Card key={i}>
  //               <Card.Img style={{ width: '2em' }} src={album.images[0].url} />
  //               <CardBody>
  //                 <CardTitle style={{ fontSize: '15px' }}>
  //                   {album.name}
  //                 </CardTitle>
  //                 <CardText style={{ fontSize: '15px' }}>
  //                   Sortie le: {album.release_date}
  //                 </CardText>
  //                 <CardSubtitle style={{ fontSize: '15px' }}>
  //                   Tracks: {album.total_tracks}
  //                 </CardSubtitle>
  //               </CardBody>
  //             </Card>
  //           )
  //         })}
  //       </Row>
  //       <h4>Chansons du premier albums</h4>
  //       <Row className="mx-2 row row-cols-6">
  //         {songs.slice(0, 6).map((song, i) => {
  //           return (
  //             <Card key={i}>
  //               <CardBody>
  //                 <CardTitle style={{ fontSize: '15px' }}>
  //                   {song.name}
  //                 </CardTitle>
  //               </CardBody>
  //             </Card>
  //           )
  //         })}
  //       </Row>
  //     </Container>
  //   </div>
  )
}

export default App
