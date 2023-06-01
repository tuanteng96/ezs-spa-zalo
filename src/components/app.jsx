import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import HomePage from "../pages/home";
import { LayoutProvider } from "../layout/LayoutProvider";
import { MasterLayout } from "../layout/MasterLayout";

const MyApp = () => {
  return (
    <LayoutProvider>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              <Route
                path="/"
                element={
                  <MasterLayout>
                    <HomePage />
                  </MasterLayout>
                }
              />
            </AnimationRoutes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </LayoutProvider>
  );
};
export default MyApp;
