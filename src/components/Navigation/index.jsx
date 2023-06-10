import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { openChat } from "zmp-sdk";
import { BottomNavigation, Box, Icon, Text } from "zmp-ui";
import { useVirtualKeyboardVisible } from "../../hook";
import { useCart } from "../../layout/CartProvider";
import { ProcessENV } from "../../utils/process";
import { CartIcon } from "./CartIcon";

export const NO_BOTTOM_NAVIGATION_PAGES = ["news", "/catalogue/", "/cart"];

export const Navigation = () => {
  const { Orders } = useCart();
  const { pathname } = useLocation();
  const [active, setActive] = useState("/");
  const keyboardVisible = useVirtualKeyboardVisible();

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  const noBottomNav = useMemo(() => {
    return NO_BOTTOM_NAVIGATION_PAGES.some((x) => pathname.indexOf(x) > -1);
  }, [pathname]);

  const OrdersCount = useMemo(() => {
    return Orders?.items.length || 0;
  }, [Orders]);

  const openChatScreen = () => {
    openChat({
      type: "oa",
      id: ProcessENV.ZaloOaID,
    });
  };

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
        key="/cart"
        label="Giỏ hàng"
        icon={<CartIcon OrdersCount={OrdersCount} />}
        activeIcon={<CartIcon OrdersCount={OrdersCount} />}
        linkTo="/cart"
      />
      <BottomNavigation.Item
        label="Nhắn tin"
        key="contact"
        icon={<Icon icon="zi-chat" />}
        activeIcon={<Icon icon="zi-chat" />}
        onClick={openChatScreen}
      />
      <BottomNavigation.Item
        key="me"
        label="Tài khoản"
        icon={<Icon icon="zi-user" />}
        activeIcon={<Icon icon="zi-user-solid" />}
        linkTo="/user"
      />
    </BottomNavigation>
  );
};
