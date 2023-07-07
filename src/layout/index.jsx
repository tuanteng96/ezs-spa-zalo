import React, { lazy, Suspense } from "react";
import { Route } from "react-router";
import { AnimationRoutes, Spinner } from "zmp-ui";
import { Navigation } from "../components/Navigation";
import { MasterLayout } from "./MasterLayout";
import ProtectedRoute from "./_core/ProtectedRoute";

const CataloguePage = lazy(() => import("../pages/catalogue"));
const CatalogueDetailPage = lazy(() => import("../pages/catalogue/detail"));

const CartPage = lazy(() => import("../pages/cart"));
const CheckInPage = lazy(() => import("../pages/checkin"));
const UserPage = lazy(() => import("../pages/user"));
const CustomerDiary = lazy(() => import("../pages/user/CustomerDiary"));
const CustomerOrders = lazy(() => import("../pages/user/CustomerOrders"));
const CustomerVoucher = lazy(() => import("../pages/user/CustomerVoucher"));
const CustomerWalletCard = lazy(() =>
  import("../pages/user/CustomerWalletCard")
);
const CustomerService = lazy(() => import("../pages/user/CustomerService"));
const CustomerBookingManage = lazy(() =>
  import("../pages/user/CustomerBookingManage")
);
const CustomerProfile = lazy(() => import("../pages/user/CustomerProfile"));

const BookingPage = lazy(() => import("../pages/booking"));

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
    <MasterLayout>
      <AnimationRoutes forceRefresh>
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
            <ProtectedRoute>
              <SuspensedView>
                <CartPage />
              </SuspensedView>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <SuspensedView>
                <UserPage />
              </SuspensedView>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <SuspensedView>
                <CustomerProfile />
              </SuspensedView>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/customer-diary"
          element={
            <ProtectedRoute>
              <SuspensedView>
                <CustomerDiary />
              </SuspensedView>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/customer-service"
          element={
            <ProtectedRoute>
              <SuspensedView>
                <CustomerService />
              </SuspensedView>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/customer-orders"
          element={
            <ProtectedRoute>
              <SuspensedView>
                <CustomerOrders />
              </SuspensedView>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/customer-voucher"
          element={
            <ProtectedRoute>
              <SuspensedView>
                <CustomerVoucher />
              </SuspensedView>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/customer-wallet-card"
          element={
            <ProtectedRoute>
              <SuspensedView>
                <CustomerWalletCard />
              </SuspensedView>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/customer-booking-manage"
          element={
            <ProtectedRoute>
              <SuspensedView>
                <CustomerBookingManage />
              </SuspensedView>
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkin"
          element={
            <ProtectedRoute>
              <SuspensedView>
                <CheckInPage />
              </SuspensedView>
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <SuspensedView>
                <BookingPage />
              </SuspensedView>
            </ProtectedRoute>
          }
        />
      </AnimationRoutes>
      <Navigation />
    </MasterLayout>
  );
};

export { Layout };
