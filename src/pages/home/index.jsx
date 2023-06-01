import React, { useState } from "react";
import { Page, Icon, useNavigate, BottomNavigation, Box, Text } from "zmp-ui";
import { Search } from "./components/search";
import { Banner } from "./components/banner";
import { Category } from "./components/category";
import { Products } from "./components/products";
import { ProductsNew } from "./components/productNew";
import { News } from "./components/news";

const HomePage = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const navigate = useNavigate();

  // useEffect(() => {
  //   configAppView({
  //     headerTextColor: scrollTop > 0 ? "black" : "white",
  //   });
  // }, [scrollTop]);

  const handleScroll = (event) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return (
    <Page className="page !pt-0" hideScrollbar onScroll={handleScroll}>
      <Search scrollTop={scrollTop} />
      <Banner />
      <Category />
      <div className="px-1 bg-white mb-2">
        <img src="https://cf.shopee.vn/file/sg-50009109-cc368950f2bb0d57e2dd1404cdfc6928" />
      </div>
      <ProductsNew />
      <News />
      <Products />

    </Page>
  );
};

export default HomePage;
