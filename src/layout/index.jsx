import React, { Fragment } from "react";
import { Route } from "react-router";
import { AnimationRoutes } from "zmp-ui";
import { Navigation } from "../components/Navigation"

import CataloguePage from "../pages/catalogue";
import HomePage from "../pages/home";
import NewsPage from "../pages/news";
import NewsDetailPage from "../pages/news/detail";

const Layout = () => {
  return (
    <>
      <AnimationRoutes>
        <Route
          path="/"
          element={
            <HomePage />
          }
        />
        <Route
          path="/catalogue"
          element={
            <CataloguePage />
          }
        />
        <Route
          path="/news"
          element={
            <NewsPage />
          }
        />
        <Route
          path="/news/:id"
          element={
            <NewsDetailPage />
          }
        />
      </AnimationRoutes>
      <Navigation />
    </>
  )
}

export { Layout }