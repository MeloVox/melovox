import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getArtistInfo, handleSpotify } from '../core.js'

function Artist() {
  const { artistId } = useParams()
  const [artistInfo, setArtistInfo] = useState(null)
  const [status, setStatus] = useState('')

  useEffect(() => {
    handleSpotify()
    const response = sessionStorage.getItem('spotify-token')
    if (response) {
      const { token_type, access_token } = JSON.parse(response)
      const token = `${token_type} ${access_token}`
      getArtistInfo(token, artistId, setStatus, setArtistInfo)
    }
  }, [artistId])

  if (!artistInfo) {
    return (
      <div className="w-full h-screen flex text-white justify-center items-center">
        <div>Status: {status}</div>
      </div>
    )
  }

  return (
    console.log(artistInfo),
    (
      <div className="w-full bg-black text-white">
        <div className='pt-72'>
            <img className="rounded-[97px] border-4 border-white mr-auto ml-auto" src={artistInfo.artist.images[1].url} />
        </div>
        <div className="flex mt-10 m-auto justify-center content-center">
            <div className='relative w-[320px]'>
                <img className="rounded-[30px] w-[160px] z-10 absolute" src={artistInfo.lastAlbum.items[0].images[1].url} />
                <svg className="absolute left-20 z-0 top-[10px]" xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 310 310" fill="none">
                    <path d="M155 103.333C161.88 103.178 168.723 104.398 175.125 106.923C181.527 109.449 187.36 113.227 192.282 118.038C197.204 122.848 201.115 128.594 203.786 134.936C206.456 141.279 207.833 148.092 207.835 154.974C207.836 161.856 206.463 168.669 203.796 175.013C201.128 181.358 197.22 187.105 192.3 191.918C187.381 196.731 181.55 200.512 175.149 203.041C168.748 205.569 161.906 206.793 155.026 206.641C141.526 206.342 128.68 200.771 119.237 191.119C109.794 181.467 104.505 168.503 104.501 155C104.498 141.497 109.781 128.529 119.219 118.873C128.657 109.216 141.501 103.639 155 103.333ZM155 180.833C148.149 180.833 141.578 178.112 136.733 173.267C131.888 168.422 129.167 161.851 129.167 155C129.167 148.149 131.888 141.578 136.733 136.733C141.578 131.888 148.149 129.167 155 129.167C161.851 129.167 168.422 131.888 173.267 136.733C178.112 141.578 180.833 148.149 180.833 155C180.833 161.851 178.112 168.422 173.267 173.267C168.422 178.112 161.851 180.833 155 180.833ZM155 0C134.645 -3.03311e-07 114.49 4.00919 95.6841 11.7987C76.8786 19.5882 59.7915 31.0054 45.3985 45.3984C31.0054 59.7915 19.5882 76.8786 11.7987 95.6841C4.00919 114.49 0 134.645 0 155C0 175.355 4.00919 195.51 11.7987 214.316C19.5882 233.121 31.0054 250.208 45.3985 264.602C59.7915 278.995 76.8786 290.412 95.6841 298.201C114.49 305.991 134.645 310 155 310C196.109 310 235.533 293.67 264.602 264.602C293.67 235.533 310 196.109 310 155C310 113.891 293.67 74.4666 264.602 45.3984C235.533 16.3303 196.109 6.12565e-07 155 0Z" fill="#CCCCCC"/>
                </svg>
            </div>
            <div className='w-[60%]'>
                <div className='flex mt-3'>
                    {artistInfo.lastAlbum.items[0].artists.map((artist, index) => (
                        <div key={index}>{index > 0 ? `- ${artist.name}` : artist.name}</div>
                    ))}
                </div>
                <div className='font-bold'>{artistInfo.lastAlbum.items[0].name}</div>
                <div className='flex'>
                    <div>
                        <img className="rounded-full w-[70px]" src="https://previews.123rf.com/images/yupiramos/yupiramos1610/yupiramos161007352/64369849-jeune-homme-avatar-ic%C3%B4ne-isol%C3%A9-illustration-vectorielle-conception.jpg" />
                    </div>
                    <div className='ml-2'>Lorem ipsum dolor sit amet consectetur. Id eget convallis donec pellentesque sagittis. Lacus ultricies ac turpis eu. Habitasse dui pellentesque pellentesque odio viverra. Mattis quis vitae egestas ac imperdiet lorem.</div>
                </div>
            </div>
        </div>
        <div className='flex mt-3 flex-col w-[50%]'>
            {artistInfo.topTracks.tracks.map((tracks, index) => (
                <div key={index} className='flex'>
                    <div className="font-bold">{index + 1}</div>
                    <div className=''>{tracks.name}</div>
                </div>
            ))}
        </div>
        <div className="">
            <div className="">
                <img className="rounded-[14px]" src="https://via.placeholder.com/52x52" />
            </div>
            most commented songs
        </div>
        <div className="">
            <div className="">
                {/* <img className="rounded-[14px]" src="https://via.placeholder.com/52x52" /> */}
            </div>
            Description
        </div>
    </div>
    )
  )
}

export default Artist
