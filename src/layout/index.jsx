import React, { lazy, Suspense } from "react";
import { Route } from "react-router";
import { AnimationRoutes, Spinner } from "zmp-ui";
import { Navigation } from "../components/Navigation";

const CataloguePage = lazy(() => import("../pages/catalogue"));
const CatalogueDetailPage = lazy(() => import("../pages/catalogue/detail"));

const CartPage = lazy(() => import("../pages/cart"));

import HomePage from "../pages/home";

const NewsPage = lazy(() => import("../pages/news"));
const NewsDetailPage = lazy(() => import("../pages/news/detail"));

const SuspensedView = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="fixed top-0 left-0 w-full h-full z-[10001] flex justify-center items-center bg-white">
          <Spinner visible />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

const Layout = () => {
  return (
    <>
      <AnimationRoutes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/catalogue"
          element={
            <SuspensedView>
              <CataloguePage />
            </SuspensedView>
          }
        />
        <Route
          path="/catalogue/:id"
          element={
            <SuspensedView>
              <CatalogueDetailPage />
            </SuspensedView>
          }
        />
        <Route
          path="/news"
          element={
            <SuspensedView>
              <NewsPage />
            </SuspensedView>
          }
        />
        <Route
          path="/news/:id"
          element={
            <SuspensedView>
              <NewsDetailPage />
            </SuspensedView>
          }
        />
        <Route
          path="/cart"
          element={
            <SuspensedView>
              <CartPage />
            </SuspensedView>
          }
        />
      </AnimationRoutes>
      <Navigation />
    </>
  );
};

export { Layout };
