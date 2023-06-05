import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProdsAPI from "../../api/prods.api";
import { ProductItem } from "../../components/Product/item";
import { useLayout } from "../../layout/LayoutProvider";
import useInfiniteScroll from 'react-infinite-scroll-hook'

const ListProducts = ({ queryConfig }) => {
  const { CurrentStocks } = useLayout()

  const { data, fetchNextPage, isLoading, isLoading } = useQuery({
    queryKey: ['ProdProductsNew', { CurrentStocks, ...queryConfig }],
    queryFn: async () => {
      const newQueryParams = {
        pi: 1,
        ps: 6,
        stockid: CurrentStocks?.ID || 0,
        cates: queryConfig.CateID || queryConfig.TypeID,
        status: queryConfig.TypeID === "hot" ? 3 : ""
      }
      const { data } = await ProdsAPI.search(newQueryParams)
      return data?.data?.lst || []
    }
  })

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: () => fetchNextPage()
    //disabled: !!error,
  })

  if (isLoading) {
    return (
      <div className="p-3 grid grid-cols-2 gap-1.5">
        {
          Array(4)
            .fill()
            .map((_, index) => (
              <div className="bg-white" key={index}>
                <div>
                  <div className="aspect-square">
                    <div className="flex items-center justify-center w-full h-full bg-gray-300">
                      <svg className="w-8 h-8 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="line-clamp-2 text-xs leading-4 mb-2 min-h-[32px]">
                    <div className="h-2 bg-gray-200 rounded-full w-full mb-1.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full w-4/5"></div>
                  </div>
                  <div className="text-danger font-semibold text-sm">
                    <div className="h-2.5 bg-gray-200 rounded-full w-2/4 mb-1.5"></div>
                  </div>
                </div>
              </div>
            ))
        }
      </div>
    )
  }

  return (
    <div className="grow no-scrollbar overflow-auto" ref={rootRef}>
      <div className="p-3 grid grid-cols-2 gap-1.5">
        {
          !isLoading && data.map((product, index) => (
            <ProductItem product={product} key={index} />
          ))
        }
      </div>
    </div>
  )
}

export default ListProducts;