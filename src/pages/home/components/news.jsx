import React from "react";
import { Icon } from "zmp-ui";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";

const News = () => {
  return (
    <div className="bg-white mb-2.5">
      <div className="p-3 font-semibold text-app uppercase flex justify-between items-center">
        Blog Spa
        <Icon className="text-muted" icon="zi-chevron-right" />
      </div>
      <div className="px-3 pb-3">
        <Swiper
          spaceBetween={10}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          slidesPerView="auto"
        >
          <SwiperSlide style={{ width: "40%" }}>
            <div className="bg-white">
              <div>
                <img className="h-[13.4375rem] object-cover" src="https://lavenderbychang.com/static//Resources/Upload/Images/News/1/2021-06/6635a777-9d2f-493f-917c-13336d8ae5da.png.480.0.cache" />
              </div>
              <div className="absolute left-0 bottom-0 w-full h-3/6 bg-pattern"></div>
              <div className="absolute w-full bottom-0 left-0 p-2 uppercase text-white font-semibold text-xs">
                <div className="line-clamp-2">Trắng da, sạch mụn, dưỡng ẩm tất tật chỉ trong 1 phương pháp</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ width: "40%" }}>
            <div className="bg-white">
              <div>
                <img className="h-[13.4375rem] object-cover" src="https://lavenderbychang.com/static//Resources/Upload/Images/News/1/2019-07/b372a9ef-0620-408f-9789-1ca424ec348a.png.480.0.cache" />
              </div>
              <div className="absolute left-0 bottom-0 w-full h-3/6 bg-pattern"></div>
              <div className="absolute w-full bottom-0 left-0 p-2 uppercase text-white font-semibold text-xs">
                <div className="line-clamp-2">Hoa hậu Đỗ Mỹ Linh: "Linh không giấu chuyện mình tắm trắng"</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ width: "40%" }}>
            <div className="bg-white">
              <div>
                <img className="h-[13.4375rem] object-cover" src="https://lavenderbychang.com/static//Resources/Upload/Images/News/1/2021-06/99fbe2d5-aa1b-4029-904e-0be37cd36076.png.480.0.cache" />
              </div>
              <div className="absolute left-0 bottom-0 w-full h-3/6 bg-pattern"></div>
              <div className="absolute w-full bottom-0 left-0 p-2 uppercase text-white font-semibold text-xs">
                <div className="line-clamp-2">Nhan sắc mỹ nhân Việt thách thức thời gian nhờ 45 phút trẻ hóa</div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export { News }