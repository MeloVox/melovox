import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import { Navigation, EffectCoverflow, Pagination } from 'swiper/modules'
import TestSpotify from '../assets/logo_spotify.png'
import Dua from '../assets/dua.webp'
import { ArrowBackOutline, ArrowForwardOutline } from 'react-ionicons'

const SwiperInfinite = () => {
  const images = [
    TestSpotify,
    Dua,
    Dua,
    Dua,
    Dua,
    TestSpotify,
    TestSpotify,
    Dua,
  ]
  const middleIndex = Math.floor(images.length / 2)

  return (
    <>
      <Swiper
        effect="coverflow"
        centeredSlides={true}
        slidesPerView={5}
        spaceBetween={30}
        className="swiper-container"
        initialSlide={middleIndex}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        grabCursor={true}
        modules={[Navigation, EffectCoverflow, Pagination]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="swiper-infiniteslide">
            <div className="imageContainer-infiniteslide">
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          </SwiperSlide>
        ))}

        <div className="slider-controller">
          <div className="swiper-button-prev slider-arrow">
            <ArrowBackOutline color={'#222224'} height="30px" width="30px" />
          </div>
          <div className="swiper-button-next slider-arrow">
            <ArrowForwardOutline color={'#222224'} height="30px" width="30px" />
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </>
  )
}

export default SwiperInfinite
