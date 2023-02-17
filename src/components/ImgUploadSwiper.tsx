import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface Props {
  img: string[]
}

export default function ImgUploadSwiper({ img }: Props) {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation={true}
      pagination={true}
      modules={[Pagination, Navigation]}
    >
      {img.map((item, idx) => (
        <SwiperSlide key={idx}>
          <div className="w-full">
            <img
              alt=""
              className="w-full bg-cover"
              src={`${item}`}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
