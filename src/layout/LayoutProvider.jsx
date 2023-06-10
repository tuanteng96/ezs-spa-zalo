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
        AccessToken: AccessToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRoMlR5cGUiOiJNZW1iZXJFbnQiLCJJRCI6IjMyMzc4IiwiVG9rZW5JZCI6IjkiLCJuYmYiOjE2ODYwMzg1MDAsImV4cCI6MTY4NjY0MzMwMCwiaWF0IjoxNjg2MDM4NTAwfQ.a5ecgEJKRWYBuO98ZCInQEKDd_15TvzTXzdVx-x9r1g",
        Auth: Auth || {
          "acc_id": "32378",
          "acc_type": "M",
          "acc_group": "128",
          "etoken": "NjM4MjE5ODc3MTkxODAzNzY3O2pHRWJBUTtNPTMyMzc4",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRoMlR5cGUiOiJNZW1iZXJFbnQiLCJJRCI6IjMyMzc4IiwiVG9rZW5JZCI6IjkiLCJuYmYiOjE2ODYwMzg1MDAsImV4cCI6MTY4NjY0MzMwMCwiaWF0IjoxNjg2MDM4NTAwfQ.a5ecgEJKRWYBuO98ZCInQEKDd_15TvzTXzdVx-x9r1g",
          "StockName": "",
          "BirthDate_Web": "",
          "IdentityName": "#0325489666",
          "MemberGroups": [
            {
              "ID": 128,
              "Title": "Thành viên",
              "Desc": "Mức chi tiêu lớn hơn 2.000.000 VNĐ",
              "Point": 2000000,
              "IsPublic": 0,
              "Discount": 0,
              "CreateDate": "2023-01-30T11:33:54.087",
              "CurrentVoucherID": 0,
              "Thumbnail": null
            }
          ],
          "InputGroups": "",
          "GroupNames": "Thành viên",
          "Desc": "",
          "IsAnonymous": false,
          "CheckIn": null,
          "ID": 32378,
          "UserID": "",
          "IdentityID": "",
          "BarCodeID": "",
          "PastPort": "",
          "FullName": "KH1",
          "BirthDate": null,
          "MobilePhone": "0325489666",
          "FixedPhone": "",
          "Email": "",
          "CompanyName": "",
          "OrganizeName": "",
          "HomeAddress": "",
          "WorlAddress": "",
          "Street": "",
          "Group": "",
          "Hamlet": "",
          "Quarter": "",
          "DistrictID": 0,
          "ProvinceID": 0,
          "Jobs": "",
          "HomeMembers": 0,
          "HomeUnder18": 0,
          "ReceiveInformation": "",
          "CreateDate": "2023-01-30T08:46:21",
          "EditDate": "2023-01-30T08:46:21",
          "IsApproval": true,
          "Enable": false,
          "Type": "",
          "GroupUser": "",
          "FriendStr": "kh1",
          "Point": 0,
          "Other": "",
          "IsAff": 1,
          "Gender": 0,
          "Photo": "",
          "ByStockID": 8975,
          "ByUserID": 0,
          "HasFinger": 0,
          "HandCardID": "",
          "Summary": "",
          "BookInfo": "",
          "Source": "",
          "GroupName": "",
          "Tags": "",
          "Present": null,
          "IsOfBrand": false,
          "Auth2TokenIds": "5,6,7,8,9",
          "IsKeepGroup": false,
          "AppInfo": "{\"app\":\"Mozilla/5.0 (Linux; Android 12; 2201116TG Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/112.0.5615.135 Mobile Safari/537.36\",\"logout\":false}",
          "TeleUserID": 0,
          "TeleNote": "",
          "TeleTags": "",
          "TransferJSON": "",
          "IsExcelImport": false,
          "ThirdImportID": 0,
          "RequirePwd": false,
          "ZaloID": "4401902127962593372"
        },
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
