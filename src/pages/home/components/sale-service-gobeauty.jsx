import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import AdvAPI from "../../../api/adv.api";
import { useQuery } from "@tanstack/react-query";
import { toAbsolutePath, toAbsolutePathAPI } from "../../../utils/assetPath";
import { NavLinkAdv } from "../../../components/NavLinkAdv";
import { useLayout } from "../../../layout/LayoutProvider";
import NewsAPI from "../../../api/news.api";

const SalesBanner = () => {
  let { GlobalConfig, Auth } = useLayout();

  const getRandomImage = () => {
    const IconsRandom = GlobalConfig?.APP?.IconsRandom;
    let newBgRandom = IconsRandom ? [...IconsRandom] : [];

    return toAbsolutePathAPI(newBgRandom[Math.floor(Math.random() * newBgRandom.length)])
  }

  const { data, isLoading } = useQuery({
    queryKey: ["AdvBannerSALE", GlobalConfig],
    queryFn: async () => {
      let arrService = [];
      let minigame = await NewsAPI.getNewsNameCate("Minigame");

      if (minigame && minigame?.data?.data?.length > 0) {
        let [games] = minigame?.data?.data;

        if (
          (games?.source?.CateTitle === "Minigame" ||
            games?.source?.CateTitle2 === "Minigame") &&
          games?.source?.IsPublic
        ) {
          let split = games.text.split(";");
          arrService.push({
            ...games,
            isMiniGame: true,
            Title: split[0],
            Desc: split.length > 1 ? split[1] : "",
          });
        }
      }

      const { data } = await AdvAPI.getAdvName("APP.SALE");

      arrService = [...arrService, ...(data?.data || [])];
      return arrService;
    },
  });

  if (isLoading)
    return (
      <div>
        <div>
          <div className="animate-pulse h-[90px] rounded">
            <div className="flex items-center justify-center w-full h-full bg-gray-300">
              <svg
                className="w-12 h-12 text-gray-200"
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
      </div>
    );

  const getColor = (index, arr) => {
    if (
      GlobalConfig?.APP?.ColorRandom &&
      GlobalConfig?.APP?.ColorRandom.length > 0 &&
      arr
    ) {
      const { ColorRandom } = GlobalConfig?.APP;
      let newColorRandom = [];
      if (arr.length > ColorRandom.length) {
        const addCount = Math.floor(arr.length / ColorRandom.length);
        const surplus = arr.length % ColorRandom.length;
        for (let i = 1; i <= addCount; i++) {
          newColorRandom = [...newColorRandom, ...ColorRandom];
        }

        if (surplus > 0) {
          newColorRandom = [
            ...newColorRandom,
            ...ColorRandom.slice(0, surplus),
          ];
        }
      } else {
        newColorRandom = [...ColorRandom];
      }
      return newColorRandom[index];
    }
    return "transparent";
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  if (!data || data.length === 0) return <></>

  return (
    <div>

      <div>
        <Swiper
          modules={[Autoplay]}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 500000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {data &&
            data.map((item, index) => {
              if (item?.isMiniGame) {
                return (
                  <SwiperSlide key={index}>
                    <NavLinkAdv
                      className="cursor-pointer block relative rounded-xl overflow-hidden p-3 bg-[#fff1f2] border border-[#fecdd3] border-dashed"
                      data={item}
                      to={stripHtml(item.source.Desc)}
                    >
                      <div className="flex z-10 relative h-full gap-3">
                        <div
                          className="aspect-square w-[60px] h-[60px] bg-[#f43f5e] rounded-xl"
                        >
                          <img
                            className="w-full h-full object-cover rounded-lg"
                            src={
                              item.source.Status === "1"
                                ? toAbsolutePathAPI(
                                  `/app2021/images/vongquay.gif`,
                                )
                                : toAbsolutePathAPI(`/app2021/images/hopqua.gif`)
                            }
                            alt=""
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <div
                            className="text-[#9f1239] font-medium text-base"
                          >
                            {item?.text?.split(";")?.[0] || ""}
                          </div>
                          <div
                            className="text-[#db2e54] text-sm opacity-80"
                            dangerouslySetInnerHTML={{
                              __html: item?.text?.split(";")?.[1] || "",
                            }}
                          ></div>
                        </div>
                      </div>
                    </NavLinkAdv>
                  </SwiperSlide>
                )
              }
              return (
                <SwiperSlide key={index}>
                  <NavLinkAdv
                    className="cursor-pointer block relative rounded-xl overflow-hidden p-3 bg-[#fff1f2] border border-[#fecdd3] border-dashed"
                    data={item}
                    to={item.Link}
                  >
                    <div
                      className="flex z-10 relative h-full gap-3"
                    >
                      <div
                        className="aspect-square w-[60px] h-[60px] bg-[#f43f5e] rounded-xl p-2"
                      >
                        <img
                          className="object-cover rounded-lg"
                          src={item.FileName ? toAbsolutePath(item.FileName) : getRandomImage()}
                          alt=""
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div
                          className="text-[#9f1239] font-medium text-base"
                        >
                          {item.Title}
                        </div>
                        <div
                          className="text-[#db2e54] text-sm opacity-80"
                          dangerouslySetInnerHTML={{
                            __html: item.Desc,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-end items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#f43f5e"
                          style={{
                            width: "20px",
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </div>
                    </div>

                  </NavLinkAdv>
                </SwiperSlide>
              )
            })}
        </Swiper>
      </div>


    </div>
  );
};

const SalesServiceGoBeauty = () => {
  return (
    <SalesBanner />
  );
};

export { SalesServiceGoBeauty };
