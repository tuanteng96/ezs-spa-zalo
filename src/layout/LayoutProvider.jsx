import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";

import {
  getStorage,
  getSystemInfo,
  getUserInfo,
  removeStorage,
  setStorage,
} from "zmp-sdk";
import { Spinner, useSnackbar } from "zmp-ui";
import AuthAPI from "../api/auth.api";
import ConfigsAPI from "../api/configs.api";
import { ProcessENV } from "../utils/process";

if (getSystemInfo().platform === "android") {
  const androidSafeTop = Math.round(
    window.ZaloJavaScriptInterface.getStatusBarHeight() /
    window.devicePixelRatio,
  );
  document.body.style.setProperty(
    "--zaui-safe-area-inset-top",
    `${androidSafeTop}px`,
  );
}

const LayoutContext = createContext();

// Fast Refresh preserves React Query's cache. Give this query a fresh key in
// development so changes to its queryFn are evaluated on every HMR update.
const globalConfigQueryKey = import.meta.hot
  ? ["GlobalConfig", Date.now()]
  : ["GlobalConfig"];

const useLayout = () => {
  return useContext(LayoutContext);
};

const LayoutProvider = ({ children }) => {
  const [splashScreen, setSplashScreen] = useState(true);
  const [AccessToken, setAccessToken] = useState(null);
  const [GlobalConfig, setGlobalConfig] = useState(null);
  const [Auth, setAuth] = useState(null);
  const [Stocks, setStocks] = useState([]);
  const [Ratings, setRatings] = useState([]);
  const [CurrentStocks, setCurrentStocks] = useState(null);
  const [actionStocksVisible, setActionStocksVisible] = useState(false);

  const { openSnackbar } = useSnackbar();

  const {
    isSuccess: isGlobalConfigLoaded,
  } = useQuery({
    queryKey: globalConfigQueryKey,
    queryFn: async () => {
      const rs = await ConfigsAPI.global();
      // let isGoBeauty = true;
      // let DOMAIN = "";

      // try {
      //   const response = await axios.get(
      //     `${ProcessENV.URL}/app2021/index.aspx`,
      //     {
      //       responseType: "text",
      //       timeout: 5000,
      //     },
      //   );

      //   DOMAIN =
      //     response?.data?.match(/window\.DOMAIN\s*=\s*['"]([^'"]*)['"]/)?.[1] || null;

      //   const domainMatch = response?.data?.match(
      //     /window\.DOMAIN_GOBEAUTY\s*=\s*\(\s*window\.DOMAIN\s*===?\s*['"]([^'"]+)['"]\s*\)/
      //   );

      //   const DOMAIN_GOBEAUTY = domainMatch?.[1] || null;

      //   isGoBeauty = DOMAIN === DOMAIN_GOBEAUTY;
      // } catch (error) {
      //   // This endpoint is cross-origin. Its failure must not leave the app
      //   // permanently on the loading screen while developing (or when offline).
      //   console.warn("Unable to resolve DOMAIN_GOBEAUTY", error);
      // }

      return {
        ...rs,
        data: {
          ...rs?.data,
          //DOMAIN
        }
      };
    },
    onSuccess: ({ data }) => {
      window.DOMAIN_GOBEAUTY = data?.DOMAIN_GOBEAUTY === ProcessENV.URL || false;
      window.GlobalConfig = data;
      if (data && data.APP && data.APP.Css) {
        for (const key in data.APP.Css) {
          document.documentElement.style.setProperty(key, data.APP.Css[key]);
        }
      }
      if (data.APP.FontSize && data.APP.FontSize.length > 0) {
        for (let key of data.APP.FontSize) {
          document.documentElement.style.setProperty(key.name, key.size);
        }
      }
      setGlobalConfig({
        ...data,
        DOMAIN_GOBEAUTY: data?.DOMAIN_GOBEAUTY === ProcessENV.URL,
      });
    },
  });

  const isGlobalConfigReady = isGlobalConfigLoaded && !!GlobalConfig;

  useQuery({
    queryKey: ["Authen"],
    queryFn: async () => {
      return null;
    },
    onSuccess: (data) => {
      // AuthAPI.authen({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRoMlR5cGUiOiJNZW1iZXJFbnQiLCJJRCI6IjQ1Mzc2IiwiVG9rZW5JZCI6IjEyMjMwMDgyOTIyMDAwMTAiLCJuYmYiOjE3ODc4ODQ5MDgsImV4cCI6MTg3NDI4NDkwOCwiaWF0IjoxNzg3ODg0OTA4fQ.jUtfe6cuDbu5QY8cPfVzqRTlGfU0_HOYcjaY5oAtLi0" })
      //   .then(({ data }) => {
      //     if (!data?.error) {
      //       onSaveAuth(data);
      //     } else {
      //       onLogout();
      //     }
      //   })
      //   .catch((error) => console.log(error));

      getStorage({
        keys: ["AccessToken"],
        success: (data) => {
          // xử lý khi gọi api thành công
          let { AccessToken } = data;
          if (AccessToken) {
            // Lấy Lại Info Token
            AuthAPI.authen({ token: AccessToken })
              .then(({ data }) => {
                if (!data?.error && data.ZaloID) {
                  onSaveAuth(data);
                } else {
                  onLogout();
                }
              })
              .catch((error) => console.log(error));
          } else {
            // Check Zalo ID get Token & Info
            getUserInfo({
              success: (data) => {
                const { userInfo } = data;
                AuthAPI.authen({ ZaloID: userInfo.id })
                  .then(({ data }) => {
                    if (!data?.error) {
                      onSaveAuth(data);
                    } else {
                      onLogout();
                    }
                  })
                  .catch((error) => console.log(error));
              },
              fail: (error) => {
                console.log(error);
              },
            });
          }
        },
        fail: (error) => {
          // xử lý khi gọi api thất bại
          console.log(error);
        },
      });
    },
    enabled: isGlobalConfigReady,
  });

  useEffect(() => {
    getStorage({
      keys: ["CurrentStocks"],
      success: (data) => {
        // xử lý khi gọi api thành công
        const { CurrentStocks } = data;
        setCurrentStocks(CurrentStocks);
        setSplashScreen(false);
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      },
    });
  }, []);

  const { isLoading: isLoadingRatings } = useQuery({
    queryKey: ["Rating", Auth],
    queryFn: async () => {
      const { data } = await AuthAPI.rating(Auth?.ID);
      return data?.data || [];
    },
    onSuccess: (data) => {
      setRatings(data)
    },
    enabled: isGlobalConfigReady && Number(Auth?.ID) > -1,
  });

  const onOpenActionStocks = () => {
    setActionStocksVisible(true);
  };

  const onHideActionStocks = () => {
    setActionStocksVisible(false);
  };

  const onSaveStocks = (value) => {
    setCurrentStocks(value);
    setStorage({
      data: {
        CurrentStocks: value,
      },
      success: (data) => {
        onHideActionStocks();
        openSnackbar({
          text: "Cập nhập cơ sở thành công.",
          type: "success",
          duration: 1500,
        });
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      },
    });
  };

  const onSaveAuth = (value) => {
    setCurrentStocks(
      value?.ByStockID
        ? {
          ID: value?.ByStockID,
          Title: value?.StockName,
        }
        : null,
    );
    window.StockID = value?.ByStockID || null
    setAccessToken(value?.token);
    setAuth(value);
    window.Member = value
    setStorage({
      data: {
        AccessToken: value?.token,
        Auth: value,
      },
    });
  };

  const onLogout = (callback) => {
    setAccessToken(null);
    setAuth(null);
    removeStorage({ keys: ["AccessToken", "Auth"] }).then(
      () => callback && callback(),
    );
  };

  return (
    <LayoutContext.Provider
      value={{
        CurrentStocks,
        actionStocksVisible,
        AccessToken,
        Auth,
        onSaveAuth,
        onOpenActionStocks,
        onHideActionStocks,
        onSaveStocks,
        Stocks,
        setStocks,
        Ratings,
        isLoadingRatings,
        onLogout,
        splashScreen,
        GlobalConfig,
        isGlobalConfigReady,
      }}
    >
      {isGlobalConfigReady ? (
        children
      ) : (
        <div className="fixed top-0 left-0 z-[10001] flex h-full w-full items-center justify-center bg-white">
          <Spinner visible />
        </div>
      )}
    </LayoutContext.Provider>
  );
};

export { LayoutProvider, useLayout };
