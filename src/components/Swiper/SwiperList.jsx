import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation, Mousewheel } from 'swiper/modules'
import noimage from '../../assets/noimage.png'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function SwiperList({ images }) {
  const swiperRef = useRef(null)
  const [hoveredSlideIndex, setHoveredSlideIndex] = useState(null)

  const handleImageHover = index => {
    setHoveredSlideIndex(index)
  }

  const handleImageClick = index => {
    console.log("Clic sur l'image " + index)
  }

  console.log(images)

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
          mousewheel={{ invert: true }}
        >
          {images.map((item, index) => (
            <SwiperSlide
              key={index}
              onMouseEnter={() => handleImageHover(index)}
              onMouseLeave={() => handleImageHover(null)}
            >
              <div className="imageContainer">
                <img
                  src={
                    item.images && item.images.length > 0
                      ? item.images[0].url
                      : noimage
                  }
                  alt={`Slide ${index + 1}`}
                  onClick={() => handleImageClick(index)}
                  className="swiperImage"
                />
                {hoveredSlideIndex === index && (
                  <div className="infoOverlay">
                    <p>{item.name}</p>
                    <p>{item.artists[0].name}</p>
                    <Link to={`/album/${item.id}`}>Voir plus</Link>
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

// Définition des PropTypes
SwiperList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      images: PropTypes.array.isRequired,
      name: PropTypes.string.isRequired,
      artists: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
}

export default SwiperList
