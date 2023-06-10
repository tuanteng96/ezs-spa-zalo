import React from "react";
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LayoutProvider } from "../layout/LayoutProvider";
import { Layout } from "../layout";
import { CartProvider } from "../layout/CartProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MyApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutProvider>
        <App>
          <CartProvider>
            <SnackbarProvider>
              <ZMPRouter>
                <Layout />
              </ZMPRouter>
            </SnackbarProvider>
          </CartProvider>
        </App>
      </LayoutProvider>
    </QueryClientProvider>
  );
};
export default MyApp;
