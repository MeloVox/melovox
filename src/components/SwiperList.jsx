import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation, Mousewheel } from 'swiper/modules'
import TestSpotify from '../assets/logo_spotify.png'
import Dua from '../assets/dua.webp'

function SwiperList() {
  const swiperRef = useRef(null)
  const [hoveredSlideIndex, setHoveredSlideIndex] = useState(null)

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

  const handleImageHover = index => {
    setHoveredSlideIndex(index)
  }

  const handleImageClick = index => {
    console.log("Clic sur l'image " + index)
  }

  return (
    <>
      <div className="swiperListContainer">
        <Swiper
          loop={true}
          ref={swiperRef}
          slidesPerView={5}
          spaceBetween={2}
          // navigation={{
          //   nextEl: '.swiper-button-next',
          //   prevEl: '.swiper-button-prev',
          // }}
          modules={[Navigation, Mousewheel]}
          mousewheel={{ invert: true }} // invert pour inverser la direction de la molette
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              onMouseEnter={() => handleImageHover(index)}
              onMouseLeave={() => handleImageHover(null)}
            >
              <div className="imageContainer">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  onClick={() => handleImageClick(index)}
                />
                {hoveredSlideIndex === index && (
                  <div className="infoOverlay">
                    <p>Nom de l'album {index + 1}</p>
                    <p>Artiste</p>
                    <a href="https://www.google.com">Voir plus</a>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div> */}
      </div>
    </>
  )
}

export default SwiperList