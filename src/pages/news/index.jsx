import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import PullToRefresh from "react-simple-pull-to-refresh";
import { Icon, Page, Text, useNavigate } from "zmp-ui";
import NewsAPI from "../../api/news.api";
import { ImageLazy } from "../../components/ImagesLazy";
import { toAbsolutePath } from "../../utils/assetPath";

const NewsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["NewsHot"],
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
    initialData: state?.dataProps,
    enabled: !state?.dataProps,
  });

  return (
    <Page className="page !pb-0" hideScrollbar>
      <div className="navbar fixed top-0 left-0 min-w-[100vw] max-w-[100vw] z-[999] bg-white shadow-3xl">
        <div className="w-2/3 relative flex items-center h-full pl-10">
          <div
            className="absolute left-0 w-10 h-full flex justify-center items-center cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <Icon icon="zi-chevron-left-header" className="text-app" />
          </div>
          <Text.Title className="text-app">
            {isLoading ? "Đang tải ..." : data[0].CateTitle2}
          </Text.Title>
        </div>
      </div>
      <PullToRefresh className="ezs-ptr ezs-ptr-safe" onRefresh={refetch}>
        <div className="pb-safe h-full">
          <div className="h-full overflow-auto no-scrollbar">
            <div className="p-3">
              {isLoading &&
                Array(2)
                  .fill()
                  .map((_, index) => (
                    <div
                      className="bg-white animate-pulse mb-3 shadow-3xl rounded overflow-hidden last:mb-0"
                      key={index}
                    >
                      <div>
                        <div className="aspect-square">
                          <div className="flex items-center justify-center w-full h-full bg-gray-300">
                            <svg
                              className="w-16 h-16 text-gray-200"
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
                      <div className="p-2 uppercase text-white font-semibold text-xs">
                        <div className="h-3 bg-gray-200 rounded-full w-full mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-1.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  ))}
              {!isLoading &&
                data.map((item, index) => (
                  <NavLink
                    to={"/news/" + item.id}
                    state={{ dataProps: item }}
                    className="bg-white shadow-3xl mb-3 block rounded overflow-hidden last:mb-0"
                    key={index}
                  >
                    <div>
                      <ImageLazy
                        wrapperClassName="aspect-[450x200] !block"
                        className="w-full aspect-[450x200] object-cover"
                        effect="blur"
                        src={toAbsolutePath(item.source.Thumbnail)}
                      />
                    </div>
                    <div className="p-3">
                      <Text.Title className="line-clamp-2 mb-2">
                        {item.text}
                      </Text.Title>
                      <div
                        className="line-clamp-3 text-muted"
                        dangerouslySetInnerHTML={{ __html: item?.source?.Desc }}
                      />
                    </div>
                  </NavLink>
                ))}
            </div>
          </div>
        </div>
      </PullToRefresh>
    </Page>
  );
};
export default NewsPage;
