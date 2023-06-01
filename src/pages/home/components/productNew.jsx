import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";

const ProductsNew = () => {
  return (
    <div className="bg-white mb-2.5">
      <div className="p-3 font-semibold text-app">
        <span className="uppercase font-cherry text-xl">FLASH</span> SALES
      </div>
      <div className="px-3">
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
            <img src="https://cser.vn/Upload/image/2022/06/12/2_2022-06-12-121341.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://cser.vn/Upload/image/2022/06/12/123_2022-06-12-121032.jpg" />
          </SwiperSlide>
        </Swiper>
        <div className="py-3">
          <Swiper
            spaceBetween={10}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            slidesPerView="auto"
          >
            <SwiperSlide style={{ width: window.innerWidth / 3 - 6 + 'px' }}>
              <div className="bg-white border border-separator">
                <div>
                  <img src="https://mykella.vn/wp-content/uploads/2023/03/Sua-Tam-Duong-Am-Da-scaled-512x512.jpg" />
                </div>
                <div className="p-2">
                  <div className="line-clamp-2 text-xs leading-4 mb-2 min-h-[32px]">
                    Sữa Tắm Dưỡng Ẩm Da.
                  </div>
                  <div className="text-danger font-semibold text-sm">1.488.000đ</div>
                  <div>
                    <span className="text-muted text-xs line-through">135.000đ</span>
                    <span className="text-danger text-xs pl-2 font-semibold">-42%</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide style={{ width: window.innerWidth / 3 - 6 + 'px' }}>
              <div className="bg-white border border-separator">
                <div>
                  <img src="https://mykella.vn/wp-content/uploads/2023/03/NUOC-HOA-HONG-A-1.jpg" />
                </div>
                <div className="p-2">
                  <div className="line-clamp-2 text-xs leading-4 mb-2 min-h-[32px]">
                    Nước hoa hồng - hàng chính hãng
                  </div>
                  <div className="text-danger font-semibold text-sm">1.392.000đ</div>
                  <div>
                    <span className="text-muted text-xs line-through">135.000đ</span>
                    <span className="text-danger text-xs pl-2 font-semibold">-42%</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide style={{ width: window.innerWidth / 3 - 6 + 'px' }}>
              <div className="bg-white border border-separator">
                <div>
                  <img src="https://mykella.vn/wp-content/uploads/2023/01/KEM-CHONG-NANG-XANH-D.jpg" />
                </div>
                <div className="p-2">
                  <div className="line-clamp-2 text-xs leading-4 mb-2 min-h-[32px]">
                    Kem Chống Nắng Cho Da Dầu
                  </div>
                  <div className="text-danger font-semibold text-sm">151.000đ</div>
                  <div>
                    <span className="text-muted text-xs line-through">135.000đ</span>
                    <span className="text-danger text-xs pl-2 font-semibold">-42%</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide style={{ width: window.innerWidth / 3 - 6 + 'px' }}>
              <div className="bg-white border border-separator h-full">
                <div>
                  <img src="https://mykella.vn/wp-content/uploads/2023/02/GEL-TAY-TRANG-A.jpg" />
                </div>
                <div className="p-2">
                  <div className="line-clamp-2 text-xs leading-4 mb-2 min-h-[32px]">
                    Gel Tẩy Trang
                  </div>
                  <div className="text-danger font-semibold text-sm">629.000đ</div>
                  <div>
                    <span className="text-muted text-xs line-through">135.000đ</span>
                    <span className="text-danger text-xs pl-2 font-semibold">-42%</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export { ProductsNew }