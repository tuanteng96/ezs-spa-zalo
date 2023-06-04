import React, { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'
import { getStorage, getSystemInfo, getUserInfo, setStorage, showToast } from "zmp-sdk"
import AuthAPI from '../api/auth.api';
import { SheetStocks } from '../components/sheet-stocks';

if (getSystemInfo().platform === "android") {
  const androidSafeTop = Math.round(
    window.ZaloJavaScriptInterface.getStatusBarHeight() /
    window.devicePixelRatio
  );
  document.body.style.setProperty(
    "--zaui-safe-area-inset-top",
    `${androidSafeTop}px`
  );
}

const LayoutContext = createContext()

const useLayout = () => {
  return useContext(LayoutContext)
}

const LayoutProvider = ({ children }) => {
  const [splashScreen, setSplashScreen] = useState(true)
  const [AccessToken, setAccessToken] = useState(null)
  const [Auth, setAuth] = useState(null)
  const [CurrentStocks, setCurrentStocks] = useState(null)
  const [actionStocksVisible, setActionStocksVisible] = useState(false)

  useEffect(() => {
    getStorage({
      keys: ["AccessToken"],
      success: (data) => {
        // xử lý khi gọi api thành công
        const { AccessToken } = data;
        if (AccessToken) {
          // Lấy Lại Info Token
          AuthAPI.authen({ token: AccessToken })
            .then(({ data }) => {
              if (!data?.error) {
                setAccessToken(data?.token)
                setAuth(data)
                setStorage({
                  data: {
                    AccessToken: data?.token,
                    Auth: data
                  }
                })
              }
            })
            .catch(error => console.log(error))
        }
        else {
          // Check Zalo ID get Token & Info
          getUserInfo({
            success: (data) => {
              const { userInfo } = data;
              AuthAPI.authen({ ZaloID: userInfo.id })
                .then(({ data }) => {
                  if (!data?.error) {
                    setAccessToken(data?.token)
                    setAuth(data)
                    setStorage({
                      data: {
                        AccessToken: data?.token,
                        Auth: data
                      }
                    })
                  }
                })
                .catch(error => console.log(error))
            },
            fail: (error) => {
              console.log(error);
            }
          });
        }
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      },
    });
  }, [])

  useEffect(() => {
    getStorage({
      keys: ["CurrentStocks"],
      success: (data) => {
        // xử lý khi gọi api thành công
        const { CurrentStocks } = data;
        setCurrentStocks(CurrentStocks)
        setSplashScreen(false)
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      },
    });
  }, [])

  const onOpenActionStocks = () => {
    setActionStocksVisible(true)
  }

  const onHideActionStocks = () => {
    setActionStocksVisible(false)
  }

  const onSaveStocks = (value) => {
    setCurrentStocks(value)
    setStorage({
      data: {
        CurrentStocks
      },
      success: (data) => {
        onHideActionStocks()
        showToast({
          message: "Đổi cơ sở thành công."
        })
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      },
    })
  }

  return (
    <LayoutContext.Provider
      value={{
        CurrentStocks,
        actionStocksVisible,
        AccessToken,
        Auth,
        onOpenActionStocks,
        onHideActionStocks,
        onSaveStocks
      }}
    >
      {children}
      {!splashScreen && <SheetStocks />}
    </LayoutContext.Provider>
  )
}

export { LayoutProvider, useLayout }
