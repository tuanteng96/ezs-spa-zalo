import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { configAppView, openChat } from "zmp-sdk";
import { BottomNavigation, Icon, useNavigate } from "zmp-ui";
import { useVirtualKeyboardVisible } from "../../hook";
import { useCart } from "../../layout/CartProvider";
import { useConfigs } from "../../layout/MasterLayout";
import { ProcessENV } from "../../utils/process";
import { CartIcon } from "./CartIcon";

export const NO_BOTTOM_NAVIGATION_PAGES = [
  "news",
  "/catalogue/",
  "/cart",
  "/checkin",
  "/user/profile",
  "/user/customer-diary",
  "/user/customer-orders",
  "/user/customer-voucher",
  "/user/customer-wallet-card",
  "/user/customer-service",
  "/user/customer-booking-manage",
  "/booking",
  "/search",
  "/contact",
];

export const BOTTOM_NAVIGATION_SEARCH_PAGE = ["Type=Finish"];

export const HEADER_LIGHT = ["/user"];

export const Navigation = () => {
  const { Orders } = useCart();
  const { pathname, search } = useLocation();
  const [active, setActive] = useState("/");
  const keyboardVisible = useVirtualKeyboardVisible();
  let { GlobalConfig } = useConfigs();

  let navigate = useNavigate();

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
    return (
      NO_BOTTOM_NAVIGATION_PAGES.some((x) => pathname.indexOf(x) > -1) &&
      BOTTOM_NAVIGATION_SEARCH_PAGE.some((x) => search.indexOf(x) === -1)
    );
  }, [pathname, search]);

  const OrdersCount = useMemo(() => {
    return (Orders && Orders?.items?.length) || 0;
  }, [Orders]);

  const onChangePath = ({ Key, Path }) => {
    if (Key === pathname) {
      navigate(0);
    } else {
      navigate(Path ? Path : Key, {
        state: {
          prevState: pathname + search,
        },
      });
    }
  };

  const openChatScreen = () => {
    openChat({
      type: GlobalConfig?.ZALO?.type,
      id: GlobalConfig?.ZALO?.ID,
      message: "Xin chào? Mình cần tư vấn ?",
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
        //linkTo="/"
        onClick={() =>
          onChangePath({
            Key: "/",
          })
        }
      />
      <BottomNavigation.Item
        label="Danh mục"
        key="/catalogue"
        icon={<Icon icon="zi-more-grid" />}
        activeIcon={<Icon icon="zi-more-grid-solid" />}
        //linkTo="/catalogue?TypeID=795"
        onClick={() =>
          onChangePath({
            Key: "/catalogue",
            Path: "/catalogue?TypeID=795",
          })
        }
      />
      <BottomNavigation.Item
        label="Đặt lịch"
        key="/booking"
        icon={<Icon icon="zi-calendar" />}
        activeIcon={<Icon icon="zi-calendar-solid" />}
        onClick={() =>
          onChangePath({
            Key: "/booking",
          })
        }
      //linkTo="/booking"
      />
      <BottomNavigation.Item
        key="/cart"
        label="Giỏ hàng"
        icon={<CartIcon OrdersCount={OrdersCount} />}
        activeIcon={<CartIcon OrdersCount={OrdersCount} />}
        //linkTo="/cart"
        onClick={() =>
          onChangePath({
            Key: "/cart",
          })
        }
      />
      <BottomNavigation.Item
        key="/chat"
        label="Nhắn tin"
        icon={<Icon className="animate-tada" icon="zi-chat" />}
        activeIcon={<Icon className="animate-tada" icon="zi-chat" />}
        //linkTo="/cart"
        onClick={openChatScreen}
      />
      <BottomNavigation.Item
        key="/user"
        label="Tài khoản"
        icon={<Icon icon="zi-user" />}
        activeIcon={<Icon icon="zi-user-solid" />}
        //linkTo="/user"
        onClick={() =>
          onChangePath({
            Key: "/user",
          })
        }
      />
    </BottomNavigation>
  );
};
