import React, { useState } from "react";
import { Page } from "zmp-ui";
import PullToRefresh from "react-simple-pull-to-refresh";
import { Search } from "./components/search";
import { Banner } from "./components/banner";
import { Category } from "./components/category";
import { Products } from "./components/products";
import { Sales } from "./components/sales";
import { News } from "./components/news";
import { SalesTop } from "./components/sales-top";
import { Follow } from "./components/follow";
import { useQueryClient } from "@tanstack/react-query";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (event) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  const handleRefresh = () => Promise.all([
    queryClient.invalidateQueries({ queryKey: ["AdvBannerTop"] }),
    queryClient.invalidateQueries({ queryKey: ["NewsHot"] }),
    queryClient.invalidateQueries({ queryKey: ["AdvBannerSalesTop"] }),
    queryClient.invalidateQueries({ queryKey: ["AdvBannerMain"] }),
    queryClient.invalidateQueries({ queryKey: ["ProdSales"] }),
    queryClient.invalidateQueries({ queryKey: ["HomeCategories"] }),
    queryClient.invalidateQueries({ queryKey: ["HomeCategoriesRequired"] })
  ])

  return (
    <Page className="page !pt-0" hideScrollbar onScroll={handleScroll}>
      <PullToRefresh className="ezs-ptr ezs-ptr-safe" onRefresh={handleRefresh}>
        <div className="h-full overflow-auto no-scrollbar" onScroll={handleScroll}>
          <Search scrollTop={scrollTop} />
          <Banner />
          <div className="grid grid-cols-4 gap-y-4 bg-white px-3 pt-5 pb-3 mb-3">
            <Category ID="42" QueryKey="HomeCategories" />
            <Category ID="45" QueryKey="HomeCategoriesRequired" isRequired />
          </div>
          <div className="mb-3">
            <Sales />
            <SalesTop />
          </div>
          <Products />
          <News />
        </div>
      </PullToRefresh>
      <Follow />
    </Page>
  );
};

export default HomePage;
