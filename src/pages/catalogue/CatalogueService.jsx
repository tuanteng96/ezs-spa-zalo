import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import PullToRefresh from "react-simple-pull-to-refresh";
import { Icon, Page, Text, useNavigate } from "zmp-ui";
import ProdsAPI from "../../api/prods.api";
import { ImageLazy } from "../../components/ImagesLazy";
import { toAbsolutePath } from "../../utils/assetPath";
import { HtmlParser } from "../../components/HtmlParser";
import { NavLink } from "react-router-dom";
import { CardWrap } from "../../components/Service/card-wrap";

const CatalogueServicePage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let { id } = useParams();

  const [scrollTop, setScrollTop] = useState(0);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["CatalogueSerivce", { id }],
    queryFn: async () => {
      const newQueryParams = {
        pi: 1,
        ps: 1,
        stockid: 0,
        cates: "795",
        rootIds: id,
      };
      const { data } = await ProdsAPI.listServiceRoot(newQueryParams);
      return data && data?.lst && data?.lst.length > 0 ? data.lst[0] : null;
    },
    enabled: Number(id) > -1,
  });

  const handleScroll = (event) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  if (isLoading) {
    return (
      <>
        <Page className="page !pt-0 animate-pulse bg-white" hideScrollbar>
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
            <div className="px-3">
              <div className="h-3.5 bg-gray-200 rounded-full w-full mt-4"></div>
              <div className="h-3.5 bg-gray-200 rounded-full w-2/4 mt-2"></div>
            </div>
            <div className="p-3">
              <div className="h-3 bg-gray-200 rounded-full w-9/12 mt-2"></div>
              <div className="h-3 bg-gray-200 rounded-full w-full mt-2"></div>
              <div className="h-3 bg-gray-200 rounded-full w-10/12 mt-2"></div>
              <div className="h-3 bg-gray-200 rounded-full w-full mt-2"></div>
            </div>
          </div>
        </Page>
      </>
    );
  }

  if (!data) return <></>;

  return (
    <Page className="page !pt-0 !pb-safe-bottom bg-white" hideScrollbar>
      <div
        className={clsx(
          "navbar fixed top-0 left-0 min-w-[100vw] max-w-[100vw] z-[999] transition px-3",
          scrollTop > 50 && "shadow-3xl"
        )}
        style={{
          background: `rgba(255,255,255,${
            scrollTop <= 100 ? scrollTop / 100 : scrollTop
          })`,
        }}
      >
        <div className="w-2/3 relative flex items-center h-full pl-12">
          <div
            className="absolute left-0 w-11 rounded-full h-11 flex justify-center items-center cursor-pointer bg-white"
            onClick={() => navigate("/")}
          >
            <Icon icon="zi-chevron-left-header" className="text-app" />
          </div>
          <Text.Title
            className={clsx(
              "text-app truncate transition",
              scrollTop > 100 ? "opacity-100" : "opacity-0"
            )}
          >
            {data?.root?.Title}
          </Text.Title>
        </div>
      </div>
      <PullToRefresh className="ezs-ptr ezs-ptr-safe" onRefresh={refetch}>
        <div className="h-full flex flex-col">
          <div
            className="grow overflow-auto no-scrollbar"
            onScroll={handleScroll}
          >
            <div className="relative">
              <ImageLazy
                wrapperClassName="aspect-[5/3] !block"
                className="aspect-[5/3] object-cover w-full"
                effect="blur"
                src={toAbsolutePath(data?.root?.Thumbnail)}
              />
            </div>
            <div className="p-3">
              <div className="text-app text-[16px] font-semibold leading-6">
                {data?.root.Title}
              </div>
              {(data?.root.Desc || data?.root.Detail) && (
                <div className="text-sm mt-2">
                  <HtmlParser>
                    {data?.root.Desc}
                    {data?.root.Detail}
                  </HtmlParser>
                </div>
              )}
            </div>
            <CardWrap service={data} noMore />
          </div>
          <div className="p-3">
            <NavLink
              to="/booking"
              state={{
                formState: {
                  Roots: [
                    {
                      ID: data?.root?.ID,
                      Title: data?.root.Title,
                    },
                  ],
                },
                prevState: pathname,
              }}
              className="bg-app py-3.5 text-center rounded-3xl text-white font-bold block cursor-pointer"
            >
              Đặt lịch ngay
            </NavLink>
          </div>
        </div>
      </PullToRefresh>
    </Page>
  );
};

export default CatalogueServicePage;
