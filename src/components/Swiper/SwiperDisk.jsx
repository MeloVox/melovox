import { Swiper, SwiperSlide } from 'swiper/react'
import { useState } from 'react'
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
import {
  ArrowBackOutline,
  ArrowForwardOutline,
  AddCircleOutline,
} from 'react-ionicons'
import noimage from '../../assets/noimage.png'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ModalRate from '../Modal/ModalRate'

const SwiperDisk = ({ images }) => {
  const middleIndex = Math.floor(images.length / 2)
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [open, setOpen] = useState(false)

  const handleOpenModal = album => {
    setSelectedAlbum(album)
    setOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedAlbum(null)
    setOpen(false)
  }

  console.log(selectedAlbum)

  return (
    <>
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
            </div>
            <div
              className=""
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '10px',
              }}
            >
              <button onClick={() => handleOpenModal(item)}>
                <AddCircleOutline
                  color={'#222224'}
                  height="30px"
                  width="30px"
                />
              </button>
              <Link to={`/album/${item.id}`}></Link>
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
      {selectedAlbum && (
        <ModalRate
          open={open}
          onClose={handleCloseModal}
          albumCover={selectedAlbum.images[0].url}
          albumName={selectedAlbum.name}
          artistId={selectedAlbum.id}
        />
      )}
    </>
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
