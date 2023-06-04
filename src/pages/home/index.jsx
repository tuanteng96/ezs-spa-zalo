import React, { useState } from "react";
import { Page } from "zmp-ui";
import { Search } from "./components/search";
import { Banner } from "./components/banner";
import { Category } from "./components/category";
import { Products } from "./components/products";
import { Sales } from "./components/sales";
import { News } from "./components/news";
import { SalesTop } from "./components/sales-top";

const HomePage = () => {
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (event) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return (
    <Page className="page !pt-0" hideScrollbar onScroll={handleScroll} resetScroll={false}>
      <Search scrollTop={scrollTop} />
      <Banner />
      <Category />
      <SalesTop />
      <Sales />
      <Products />
      <News />
    </Page>
  );
};

export default HomePage;
