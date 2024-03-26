import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import {
  Navigation,
  EffectCoverflow,
  Pagination,
  Mousewheel,
} from 'swiper/modules'
import { ArrowBackOutline, ArrowForwardOutline } from 'react-ionicons'
import noimage from '../assets/noimage.png'
import PropTypes from 'prop-types'

const SwiperDisk = ({ images }) => {
  const middleIndex = Math.floor(images.length / 2)

  return (
    <Swiper
      effect="coverflow"
      centeredSlides={true}
      slidesPerView={5}
      spaceBetween={15}
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
      modules={[Navigation, EffectCoverflow, Pagination, Mousewheel]}
      mousewheel={{ invert: true }}
    >
      {images.slice(0, 15).map((item, index) => (
        <SwiperSlide key={index} className="swiper-infiniteslide">
          <div className="imageContainer-infiniteslide">
            <img
              src={
                item.images && item.images.length > 0
                  ? item.images[0].url
                  : noimage
              }
              alt={item.name}
            />

            {/* <a className="text-center text-white">{item.name}</a> */}
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
  )
}

// Définition des PropTypes
SwiperDisk.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        }),
      ),
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default SwiperDisk
