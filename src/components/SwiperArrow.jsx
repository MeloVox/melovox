import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import TestSpotify from '../assets/logo_spotify.png'
import Dua from '../assets/dua.webp'

function SwiperArrow() {
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
      <Swiper
        loop={true}
        ref={swiperRef}
        slidesPerView={5}
        spaceBetween={2}
        className="mySwiper"
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Navigation]}
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
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </>
  )
}

export default SwiperArrow
