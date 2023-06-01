import React from "react";
import { Box } from "zmp-ui";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { ImageLazy } from "../../../components/ImagesLazy";


const Banner = () => {
  return (
    <Box className="bg-white">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        <SwiperSlide>
          <ImageLazy wrapperClassName="h-[450px]" effect="blur" src="https://cser.vn/images/zalo-banner/banner-01.png" />
        </SwiperSlide>
        <SwiperSlide>
          <ImageLazy effect="blur" src="https://cser.vn/images/zalo-banner/banner-02.png" />
        </SwiperSlide>
        <SwiperSlide>
          <ImageLazy effect="blur" src="https://cser.vn/images/zalo-banner/banner-03.png" />
        </SwiperSlide>
      </Swiper>
    </Box>
  )
}

export { Banner }