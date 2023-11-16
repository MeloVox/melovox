import { useParams } from 'react-router-dom'
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../../logs.js'
import { useState, useEffect } from 'react'
import querystring from 'querystring'
import { Buffer } from 'buffer/'

function Artist() {
  const { artistId } = useParams()
  const [artistInfo, setArtistInfo] = useState(null)
  const [token, setToken] = useState(null)
  function getAccessToken() {
    const authUrl = 'https://accounts.spotify.com/api/token'

    const auth = Buffer.from(
      `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
    ).toString('base64')
    const headers = {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    const data = querystring.stringify({
      grant_type: 'client_credentials',
    })

    fetch(authUrl, {
      method: 'POST',
      headers: headers,
      body: data,
    })
      .catch(error => {
        console.error('Error getting access token', error)
      })
      .then(response => {
        response.json().then(data => {
          setToken(data.access_token)
        })
      })
  }

  function getArtistInfo(spotifyArtistId, accessToken) {
    const artistUrl = `https://api.spotify.com/v1/artists/${spotifyArtistId}`

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }

    fetch(artistUrl, {
      method: 'GET',
      headers: headers,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        response.json().then(data => {
          setArtistInfo(data)
        })
      })
      .catch(error => {
        console.error('Error getting artist info', error)
      })
  }

  useEffect(() => {
    async function fetchData() {
      getAccessToken()
      getArtistInfo(artistId, token)
    }

    fetchData()
  }, [])

  if (!artistInfo) {
    return <div>Erreur</div>
  }

  return (
    console.log(artistInfo),
    (
      <div className="w-[1512px] h-[1326px] relative bg-white">
        <div className="w-[1512px] h-[1326px] left-0 top-0 absolute bg-neutral-900" />
        <div className="w-[1508px] h-[220px] p-[60px] left-[4px] top-[1106px] absolute justify-center items-center gap-[60px] inline-flex">
          <div className="w-[606px] justify-center items-center gap-[60px] flex">
            <div className="w-[82px] self-stretch text-center text-white text-xl font-normal font-['Anton'] leading-7">
              About Us
            </div>
            <div className="w-[70px] self-stretch text-center text-white text-xl font-normal font-['Anton'] leading-7">
              Contact
            </div>
            <div className="w-[124px] self-stretch text-center text-white text-xl font-normal font-['Anton'] leading-7">
              Privacy Policy
            </div>
            <div className="w-[150px] self-stretch text-center text-white text-xl font-normal font-['Anton'] leading-7">
              Terms of Service
            </div>
          </div>
        </div>
        <div className="w-[119px] h-[83px] left-[40px] top-[21px] absolute">
          <div className="w-[73.71px] h-[73.97px] left-[45.29px] top-[4.51px] absolute">
            <div className="w-[55.14px] h-[55.34px] left-[9.28px] top-[9.32px] absolute"></div>
          </div>
          <div className="w-[73.34px] h-[33.83px] left-[4.68px] top-[24.24px] absolute"></div>
        </div>
        <img
          className="w-[302px] h-[302px] left-[157px] top-[214px] absolute rounded-[220px]"
          src={artistInfo.images[0].url}
        />
        <div className="w-[790px] h-[325px] left-[632px] top-[759px] absolute">
          <div className="w-[790px] h-[325px] left-0 top-0 absolute bg-neutral-600 bg-opacity-30 rounded-[23px]" />
          <div className="pl-[30px] pb-[18px] left-[-102px] top-[-17px] absolute justify-end items-center inline-flex">
            <div className="w-[1428px] self-stretch pb-[16.56px] flex-col justify-start items-start inline-flex">
              <div className="self-stretch h-[46px] pb-[22px] justify-center items-center gap-[1152.57px] inline-flex">
                <div className="w-[220.45px] h-6 relative" />
                <div className="w-[55.18px] h-5 text-zinc-400 text-sm font-bold font-['Roboto']">
                  Show all
                </div>
              </div>
              <div className="self-stretch h-[261.44px] justify-center items-start gap-6 inline-flex">
                <div className="grow shrink basis-0 self-stretch px-4 py-4 bg-neutral-900 rounded-lg flex-col justify-center items-start gap-4 inline-flex">
                  <div className="self-stretch h-[151.42px] bg-zinc-800 rounded-md shadow justify-center items-center inline-flex">
                    <img
                      className="w-[151.42px] h-[151.42px] relative rounded-md"
                      src="https://via.placeholder.com/151x151"
                    />
                  </div>
                  <div className="self-stretch h-[62px] pt-[0.16px] pb-[15.84px] flex-col justify-start items-start inline-flex">
                    <div className="h-[26px] pb-1 justify-center items-center inline-flex">
                      <div className="w-[109.92px] h-[22px] text-white text-base font-bold font-['Roboto']">
                        Now And Then
                      </div>
                    </div>
                    <div className="self-stretch h-5 pr-[77.88px] justify-start items-center inline-flex">
                      <div className="w-[73.54px] h-5 text-zinc-400 text-sm font-thin font-['Roboto']">
                        The Beatles
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grow shrink basis-0 self-stretch px-4 py-4 bg-neutral-900 rounded-lg flex-col justify-center items-start gap-4 inline-flex">
                  <div className="self-stretch h-[151.42px] bg-zinc-800 rounded-md shadow justify-center items-center inline-flex">
                    <img
                      className="w-[151.42px] h-[151.42px] relative rounded-md"
                      src="https://via.placeholder.com/151x151"
                    />
                  </div>
                  <div className="self-stretch h-[62px] pt-[0.16px] pb-[15.84px] flex-col justify-start items-start inline-flex">
                    <div className="h-[26px] pb-1 justify-center items-center inline-flex">
                      <div className="w-[67.81px] h-[22px] text-white text-base font-bold font-['Roboto']">
                        GOLDEN
                      </div>
                    </div>
                    <div className="self-stretch h-5 pr-[83.95px] justify-start items-center inline-flex">
                      <div className="w-[67.47px] h-5 text-zinc-400 text-sm font-thin font-['Roboto']">
                        Jung Kook
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grow shrink basis-0 self-stretch p-4 bg-neutral-900 rounded-lg flex-col justify-center items-start gap-4 inline-flex">
                  <div className="self-stretch h-[151.44px] bg-zinc-800 rounded-md shadow justify-center items-center inline-flex">
                    <img
                      className="w-[151.44px] h-[151.44px] relative rounded-md"
                      src="https://via.placeholder.com/151x151"
                    />
                  </div>
                  <div className="self-stretch h-[62px] pt-[0.15px] pb-[15.85px] flex-col justify-start items-start inline-flex">
                    <div className="h-[26px] pb-1 justify-center items-center inline-flex">
                      <div className="w-[46.42px] h-[22px] text-white text-base font-bold font-['Roboto']">
                        Cobra
                      </div>
                    </div>
                    <div className="self-stretch h-5 pr-[22.22px] justify-start items-center inline-flex">
                      <div className="w-[129.22px] h-5 text-zinc-400 text-sm font-thin font-['Roboto']">
                        Megan Thee Stallion
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grow shrink basis-0 self-stretch px-4 py-4 bg-neutral-900 rounded-lg flex-col justify-center items-start gap-4 inline-flex">
                  <div className="self-stretch h-[151.42px] bg-zinc-800 rounded-md shadow justify-center items-center inline-flex">
                    <img
                      className="w-[151.42px] h-[151.42px] relative rounded-md"
                      src="https://via.placeholder.com/151x151"
                    />
                  </div>
                  <div className="self-stretch h-[62px] pt-[0.16px] pb-[15.84px] flex-col justify-start items-start inline-flex">
                    <div className="h-[26px] pb-1 justify-center items-center inline-flex">
                      <div className="w-[109.34px] h-[22px] text-white text-base font-bold font-['Roboto']">
                        AT THE PARTY
                      </div>
                    </div>
                    <div className="self-stretch h-5 pr-[96.75px] justify-start items-center inline-flex">
                      <div className="w-[54.67px] h-5 text-zinc-400 text-sm font-thin font-['Roboto']">
                        Kid Cudi
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grow shrink basis-0 self-stretch p-4 bg-neutral-900 rounded-lg flex-col justify-center items-start gap-4 inline-flex">
                  <div className="self-stretch h-[151.44px] bg-zinc-800 rounded-md shadow justify-center items-center inline-flex">
                    <img
                      className="w-[151.44px] h-[151.44px] relative rounded-md"
                      src="https://via.placeholder.com/151x151"
                    />
                  </div>
                  <div className="self-stretch h-[62px] pt-[0.15px] pb-[15.85px] flex-col justify-start items-start inline-flex">
                    <div className="h-[26px] pb-1 justify-center items-center inline-flex">
                      <div className="w-[79.26px] h-[22px] text-white text-[15.12px] font-bold font-['Roboto']">
                        Sugar Papi
                      </div>
                    </div>
                    <div className="self-stretch h-5 pr-[76.76px] justify-start items-center inline-flex">
                      <div className="w-[74.68px] h-5 text-zinc-400 text-sm font-thin font-['Roboto']">
                        Marshmello
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grow shrink basis-0 self-stretch px-4 py-4 bg-neutral-900 rounded-lg flex-col justify-center items-start gap-4 inline-flex">
                  <div className="self-stretch h-[151.42px] bg-zinc-800 rounded-md shadow justify-center items-center inline-flex">
                    <img
                      className="w-[151.42px] h-[151.42px] relative rounded-md"
                      src="https://via.placeholder.com/151x151"
                    />
                  </div>
                  <div className="self-stretch h-[62px] pt-[0.16px] pb-[15.84px] flex-col justify-start items-start inline-flex">
                    <div className="h-[26px] pb-1 justify-center items-center inline-flex">
                      <div className="w-[38.50px] h-[22px] text-white text-base font-bold font-['Roboto']">
                        .mp3
                      </div>
                    </div>
                    <div className="self-stretch h-5 pr-[113.61px] justify-start items-center inline-flex">
                      <div className="w-[37.81px] h-5 text-zinc-400 text-sm font-thin font-['Roboto']">
                        Emilia
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grow shrink basis-0 self-stretch p-4 bg-neutral-900 rounded-lg flex-col justify-center items-start gap-4 inline-flex">
                  <div className="self-stretch h-[151.44px] bg-zinc-800 rounded-md shadow justify-center items-center inline-flex">
                    <img
                      className="w-[151.44px] h-[151.44px] relative rounded-md"
                      src="https://via.placeholder.com/151x151"
                    />
                  </div>
                  <div className="self-stretch h-[62px] pt-[0.15px] pb-[15.85px] flex-col justify-start items-start inline-flex">
                    <div className="h-[26px] pb-1 justify-center items-center inline-flex">
                      <div className="w-[40.86px] h-[22px] text-white text-base font-bold font-['Roboto']">
                        alone
                      </div>
                    </div>
                    <div className="self-stretch h-5 pr-[92.54px] justify-start items-center inline-flex">
                      <div className="w-[58.90px] h-5 text-zinc-400 text-sm font-thin font-['Roboto']">
                        WILLOW
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[790px] h-[438px] left-[637px] top-[192px] absolute">
          <div className="left-0 top-0 absolute text-white text-4xl font-normal font-['Rollicker'] leading-none">
            {artistInfo.name}
          </div>
        </div>
        <div className="left-[632px] top-[703px] absolute text-white text-4xl font-normal font-['Rollicker'] leading-none">
          Favorite songs
        </div>
        <div className="w-[214px] left-[201px] top-[572px] absolute text-white text-4xl font-normal font-['Rollicker'] leading-none">
          Followers
        </div>
        <div className="w-[445px] h-[467px] left-[85px] top-[617px] absolute">
          <div className="w-[445px] h-[467px] left-0 top-0 absolute bg-neutral-600 bg-opacity-30 rounded-[23px]" />
          <div className="w-[184px] h-[69px] p-4 left-[21px] top-[7px] absolute bg-white bg-opacity-20 rounded-md flex-col justify-center items-center gap-4 inline-flex">
            <div className="w-44 justify-start items-center gap-1 inline-flex">
              <div className="grow shrink basis-0 h-[60px] justify-start items-center gap-2 flex">
                <img
                  className="w-[60px] h-[60px] relative rounded-[30px]"
                  src="https://via.placeholder.com/60x60"
                />
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-5 text-white text-sm font-normal font-['Anton'] leading-tight">
                    User1
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[184px] h-[69px] p-4 left-[240px] top-[7px] absolute bg-white bg-opacity-20 rounded-md flex-col justify-center items-center gap-4 inline-flex">
            <div className="w-44 justify-start items-center gap-1 inline-flex">
              <div className="grow shrink basis-0 h-[60px] justify-start items-center gap-2 flex">
                <img
                  className="w-[60px] h-[60px] relative rounded-[30px]"
                  src="https://via.placeholder.com/60x60"
                />
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-5 text-white text-sm font-normal font-['Anton'] leading-tight">
                    User1
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[184px] h-[69px] p-4 left-[240px] top-[103px] absolute bg-white bg-opacity-20 rounded-md flex-col justify-center items-center gap-4 inline-flex">
            <div className="w-44 justify-start items-center gap-1 inline-flex">
              <div className="grow shrink basis-0 h-[60px] justify-start items-center gap-2 flex">
                <img
                  className="w-[60px] h-[60px] relative rounded-[30px]"
                  src="https://via.placeholder.com/60x60"
                />
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-5 text-white text-sm font-normal font-['Anton'] leading-tight">
                    User1
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[184px] h-[69px] p-4 left-[240px] top-[199px] absolute bg-white bg-opacity-20 rounded-md flex-col justify-center items-center gap-4 inline-flex">
            <div className="w-44 justify-start items-center gap-1 inline-flex">
              <div className="grow shrink basis-0 h-[60px] justify-start items-center gap-2 flex">
                <img
                  className="w-[60px] h-[60px] relative rounded-[30px]"
                  src="https://via.placeholder.com/60x60"
                />
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-5 text-white text-sm font-normal font-['Anton'] leading-tight">
                    User1
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[184px] h-[69px] p-4 left-[240px] top-[295px] absolute bg-white bg-opacity-20 rounded-md flex-col justify-center items-center gap-4 inline-flex">
            <div className="w-44 justify-start items-center gap-1 inline-flex">
              <div className="grow shrink basis-0 h-[60px] justify-start items-center gap-2 flex">
                <img
                  className="w-[60px] h-[60px] relative rounded-[30px]"
                  src="https://via.placeholder.com/60x60"
                />
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-5 text-white text-sm font-normal font-['Anton'] leading-tight">
                    User1
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[184px] h-[69px] p-4 left-[240px] top-[391px] absolute bg-white bg-opacity-20 rounded-md flex-col justify-center items-center gap-4 inline-flex">
            <div className="w-44 justify-start items-center gap-1 inline-flex">
              <div className="grow shrink basis-0 h-[60px] justify-start items-center gap-2 flex">
                <img
                  className="w-[60px] h-[60px] relative rounded-[30px]"
                  src="https://via.placeholder.com/60x60"
                />
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-5 text-white text-sm font-normal font-['Anton'] leading-tight">
                    User1
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[184px] h-[69px] p-4 left-[21px] top-[103px] absolute bg-white bg-opacity-20 rounded-md flex-col justify-center items-center gap-4 inline-flex">
            <div className="w-44 justify-start items-center gap-1 inline-flex">
              <div className="grow shrink basis-0 h-[60px] justify-start items-center gap-2 flex">
                <img
                  className="w-[60px] h-[60px] relative rounded-[30px]"
                  src="https://via.placeholder.com/60x60"
                />
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-5 text-white text-sm font-normal font-['Anton'] leading-tight">
                    User1
                  </div>
                </div>
              </div>
              <div className="w-[58.26px] h-[9.81px] relative" />
            </div>
          </div>
          <div className="w-[184px] h-[69px] p-4 left-[21px] top-[199px] absolute bg-white bg-opacity-20 rounded-md flex-col justify-center items-center gap-4 inline-flex">
            <div className="w-44 justify-start items-center gap-1 inline-flex">
              <div className="grow shrink basis-0 h-[60px] justify-start items-center gap-2 flex">
                <img
                  className="w-[60px] h-[60px] relative rounded-[30px]"
                  src="https://via.placeholder.com/60x60"
                />
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-5 text-white text-sm font-normal font-['Anton'] leading-tight">
                    User1
                  </div>
                </div>
              </div>
              <div className="w-[58.26px] h-[9.81px] relative" />
            </div>
          </div>
          <div className="w-[184px] h-[69px] p-4 left-[21px] top-[295px] absolute bg-white bg-opacity-20 rounded-md flex-col justify-center items-center gap-4 inline-flex">
            <div className="w-44 justify-start items-center gap-1 inline-flex">
              <div className="grow shrink basis-0 h-[60px] justify-start items-center gap-2 flex">
                <img
                  className="w-[60px] h-[60px] relative rounded-[30px]"
                  src="https://via.placeholder.com/60x60"
                />
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-5 text-white text-sm font-normal font-['Anton'] leading-tight">
                    User1
                  </div>
                </div>
              </div>
              <div className="w-[58.26px] h-[9.81px] relative" />
            </div>
          </div>
          <div className="w-[184px] h-[69px] p-4 left-[21px] top-[391px] absolute bg-white bg-opacity-20 rounded-md flex-col justify-center items-center gap-4 inline-flex">
            <div className="w-44 justify-start items-center gap-1 inline-flex">
              <div className="grow shrink basis-0 h-[60px] justify-start items-center gap-2 flex">
                <img
                  className="w-[60px] h-[60px] relative rounded-[30px]"
                  src="https://via.placeholder.com/60x60"
                />
                <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-5 text-white text-sm font-normal font-['Anton'] leading-tight">
                    User1
                  </div>
                </div>
              </div>
              <div className="w-[58.26px] h-[9.81px] relative" />
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Artist
