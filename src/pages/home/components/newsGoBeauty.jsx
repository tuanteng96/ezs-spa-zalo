import React from "react";
import { Icon } from "zmp-ui";
import { Swiper, SwiperSlide } from "swiper/react";
import NewsAPI from "../../../api/news.api";
import { useQuery } from "@tanstack/react-query";
import { ImageLazy } from "../../../components/ImagesLazy";
import { toAbsolutePath, toAbsolutePathAPI } from "../../../utils/assetPath";
import { NavLink } from "react-router-dom";
import moment from "moment";

const NewsGoBeauty = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["NewsGoBeauty"],
    queryFn: async () => {
      const { data } = await NewsAPI.getListToID("835");
      let rs = null
      if (data?.data && data.data.length > 0) {
        rs = await NewsAPI.getInfoToCateID("835")
      }
      return data?.data ? data?.data.map(x => ({
        ...x,
        CateTitle2: rs?.data?.data?.length > 0 && rs?.data?.data[0].Title
      })) : [];
    },
  });

  if (!data || data.length == 0) return "";
  return (
    <div>
      <div className="flex justify-between mb-3">
        <div className="uppercase font-bold">
          {isLoading ? (
            <div className="h-4 bg-gray-200 rounded-full w-2/5"></div>
          ) : (
            data[0].CateTitle2
          )}
        </div>
        <NavLink
          className="font-semibold text-[13px]"
          to="/news"
          state={{ dataProps: data }}
          style={{ color: "var(--ezs-color)" }}
        >
          Xem tất cả
        </NavLink>
      </div>
      {data &&
        data.slice(0, 1).map((item, index) => (
          <div
            key={index}
            className="bg-white p-3"
            style={{
              boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
              borderRadius: "1rem",
            }}
          >
            <div
              className="flex items-center"
              style={{
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "40px",
                }}
              >
                <div
                  style={{
                    borderRadius: "9999px",
                    aspectRatio: "1",
                    objectFit: "cover",
                    background: "var(--ezs-color)",
                    boxShadow:
                      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                  }}
                  className="w-full text-white flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <div className="font-bold">{item.source.Title}</div>
                <div
                  className="flex items-center"
                  style={{
                    color: "#9ca3af",
                    gap: "5px",
                  }}
                >
                  <div>
                    {moment(item?.source?.CreateDate)
                      .fromNow()
                      .replace("một", "1")}
                  </div>
                  <div
                    style={{
                      background: "#9ca3af",
                      borderRadius: "9999px",
                      width: "3px",
                      height: "3px",
                    }}
                  ></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    style={{
                      width: "18px",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-4" dangerouslySetInnerHTML={{
              __html: item.Desc,
            }}></div>
            <div className="mt-4">
              <img
                style={{
                  borderRadius: "0.75rem",
                }}
                className="w-full"
                src={toAbsolutePath(item.source.Thumbnail)}
                alt={item.source.Title}
              />
            </div>
            <NavLink
              to={"/news/" + item.id}
              state={{ dataProps: item }}
              className="text-center mt-4 font-medium w-full flex items-center justify-center"
              type="button"
              style={{
                background: "#fff1f2",
                color: "#e11d48",
                border: "none",
                height: "40px",
                borderRadius: "0.75rem",
              }}
            >
              Xem chi tiết
            </NavLink>
          </div>
        ))}
    </div>
  );
};

export { NewsGoBeauty };
