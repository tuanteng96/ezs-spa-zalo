import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { configAppView, openChat } from "zmp-sdk";
import { BottomNavigation, Box, Icon, Text } from "zmp-ui";
import { useVirtualKeyboardVisible } from "../../hook";
import { useCart } from "../../layout/CartProvider";
import { ProcessENV } from "../../utils/process";
import { CartIcon } from "./CartIcon";

export const NO_BOTTOM_NAVIGATION_PAGES = [
  "news",
  "/catalogue/",
  "/cart",
  "/checkin",
  "/user/customer-diary",
  "/user/customer-orders",
  "/user/customer-voucher",
  "/user/customer-wallet-card",
  "/user/customer-service",
  "/booking"
];

export const HEADER_LIGHT = ["/user"];

export const Navigation = () => {
  const { Orders } = useCart();
  const { pathname } = useLocation();
  const [active, setActive] = useState("/");
  const keyboardVisible = useVirtualKeyboardVisible();

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  const lightHeader = useMemo(() => {
    return HEADER_LIGHT.includes(pathname);
  }, [pathname]);

  useEffect(() => {
    configAppView({
      headerTextColor: lightHeader ? "white" : "black",
    });
  }, [lightHeader]);

  const noBottomNav = useMemo(() => {
    return NO_BOTTOM_NAVIGATION_PAGES.some((x) => pathname.indexOf(x) > -1);
  }, [pathname]);

  const OrdersCount = useMemo(() => {
    return Orders && Orders?.items?.length || 0;
  }, [Orders]);

  if (noBottomNav || keyboardVisible) {
    return <></>;
  }

  return (
    <BottomNavigation
      key={pathname}
      fixed
      activeKey={active}
      onChange={(key) => {
        if (key !== "contact") setActive(key);
      }}
    >
      <BottomNavigation.Item
        key="/"
        label="Trang chủ"
        icon={<Icon icon="zi-home" />}
        activeIcon={<Icon icon="zi-home" />}
        linkTo="/"
      />
      <BottomNavigation.Item
        label="Danh mục"
        key="/catalogue"
        icon={<Icon icon="zi-more-grid" />}
        activeIcon={<Icon icon="zi-more-grid-solid" />}
        linkTo="/catalogue?TypeID=hot"
      />
      <BottomNavigation.Item
        label="Đặt lịch"
        key="booking"
        icon={<Icon className="animate-tada" icon="zi-calendar" />}
        activeIcon={<Icon icon="zi-calendar-solid" />}
        linkTo="/booking"
      />
      <BottomNavigation.Item
        key="/cart"
        label="Giỏ hàng"
        icon={<CartIcon OrdersCount={OrdersCount} />}
        activeIcon={<CartIcon OrdersCount={OrdersCount} />}
        linkTo="/cart"
      />
      <BottomNavigation.Item
        key="/user"
        label="Tài khoản"
        icon={<Icon icon="zi-user" />}
        activeIcon={<Icon icon="zi-user-solid" />}
        linkTo="/user"
      />
    </BottomNavigation>
  );
};
