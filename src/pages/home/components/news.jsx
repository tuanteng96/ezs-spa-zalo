import React from "react";
import { Icon } from "zmp-ui";
import { Swiper, SwiperSlide } from "swiper/react";
import NewsAPI from "../../../api/news.api";
import { useQuery } from "@tanstack/react-query";
import { ImageLazy } from "../../../components/ImagesLazy";
import { toAbsolutePath } from "../../../utils/assetPath";
import { NavLink } from "react-router-dom";

const News = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["NewsHot"],
    queryFn: async () => {
      const { data } = await NewsAPI.getListToID("835");
      return data?.data || [];
    },
  });

  if (!data || data.length == 0) return "";

  return (
    <div className="bg-white mb-2.5">
      <NavLink
        to="/news"
        state={{ dataProps: data }}
        className="p-3 font-semibold text-app uppercase flex justify-between items-center"
      >
        {isLoading ? (
          <div className="h-4 bg-gray-200 rounded-full w-2/5"></div>
        ) : (
          data[0].source.CateTitle2
        )}
        <Icon className="text-muted" icon="zi-chevron-right" />
      </NavLink>
      <div className="px-3 pb-3">
        <Swiper
          spaceBetween={10}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          slidesPerView="auto"
        >
          {isLoading &&
            Array(3)
              .fill()
              .map((_, index) => (
                <SwiperSlide style={{ width: "40%" }} key={index}>
                  <div className="bg-white animate-pulse">
                    <div>
                      <div className="aspect-0/7">
                        <div className="flex items-center justify-center w-full h-full bg-gray-300">
                          <svg
                            className="w-8 h-8 text-gray-200"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 640 512"
                          >
                            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-0 bottom-0 w-full h-3/6 bg-pattern"></div>
                    <div className="absolute w-full bottom-0 left-0 p-2 uppercase text-white font-semibold text-xs">
                      <div className="h-2 bg-gray-200 rounded-full w-full mb-1.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full w-4/5 mb-1.5"></div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          {!isLoading &&
            data.slice(0, 6).map((item, index) => (
              <SwiperSlide style={{ width: "40%" }} key={index}>
                <NavLink
                  to={"/news/" + item.id}
                  state={{ dataProps: item }}
                  className="bg-white block aspect-0/7"
                >
                  <div>
                    <ImageLazy
                      wrapperClassName="aspect-0/7 !block"
                      className="aspect-0/7 object-cover h-full"
                      effect="blur"
                      src={toAbsolutePath(item.source.Thumbnail)}
                    />
                  </div>
                  <div className="absolute left-0 bottom-0 w-full h-3/6 bg-pattern"></div>
                  <div className="absolute w-full bottom-0 left-0 p-2 uppercase text-white font-semibold text-xs">
                    <div className="line-clamp-2">{item.text}</div>
                  </div>
                </NavLink>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export { News };
