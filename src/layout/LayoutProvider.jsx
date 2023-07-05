import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import {
  getStorage,
  getSystemInfo,
  getUserInfo,
  setStorage,
} from "zmp-sdk";
import { useSnackbar } from "zmp-ui";
import AuthAPI from "../api/auth.api";
import { SheetStocks } from "../components/sheet-stocks";

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

const LayoutContext = createContext();

const useLayout = () => {
  return useContext(LayoutContext);
};

const LayoutProvider = ({ children }) => {
  const [splashScreen, setSplashScreen] = useState(true);
  const [AccessToken, setAccessToken] = useState(null);
  const [Auth, setAuth] = useState(null);
  const [Stocks, setStocks] = useState([])
  const [CurrentStocks, setCurrentStocks] = useState(null);
  const [actionStocksVisible, setActionStocksVisible] = useState(false);

  const { openSnackbar } = useSnackbar();

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
                setAccessToken(data?.token);
                setAuth(data);
                setStorage({
                  data: {
                    AccessToken: data?.token,
                    Auth: data,
                  },
                });
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
                    setAccessToken(data?.token);
                    setAuth(data);
                    setStorage({
                      data: {
                        AccessToken: data?.token,
                        Auth: data,
                      },
                    });
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
  }, []);

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
        CurrentStocks,
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

  return (
    <LayoutContext.Provider
      value={{
        CurrentStocks,
        actionStocksVisible,
        AccessToken:
          AccessToken ||
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRoMlR5cGUiOiJNZW1iZXJFbnQiLCJJRCI6IjMyNTcxIiwiVG9rZW5JZCI6IjciLCJuYmYiOjE2ODgwOTIwNDEsImV4cCI6MTY4ODY5Njg0MCwiaWF0IjoxNjg4MDkyMDQxfQ.dDWAbTin61B38aN5G7VvfEHxl0sUH2KfL82VgGgtlFY",
        Auth: Auth || {
          "acc_id": "32571",
          "acc_type": "M",
          "acc_group": "",
          "etoken": "NjM4MjMxMDk4MTg5MTMxODI4OzJ6cXU1UjtNPTMyNTcx",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRoMlR5cGUiOiJNZW1iZXJFbnQiLCJJRCI6IjMyNTcxIiwiVG9rZW5JZCI6IjciLCJuYmYiOjE2ODgwOTIwNDEsImV4cCI6MTY4ODY5Njg0MCwiaWF0IjoxNjg4MDkyMDQxfQ.dDWAbTin61B38aN5G7VvfEHxl0sUH2KfL82VgGgtlFY",
          "StockName": "",
          "BirthDate_Web": "",
          "IdentityName": "#0971021196",
          "MemberGroups": [],
          "InputGroups": "",
          "GroupNames": "",
          "Desc": "",
          "IsAnonymous": false,
          "CheckIn": null,
          "ID": 32571,
          "UserID": "",
          "IdentityID": "",
          "BarCodeID": "",
          "PastPort": "",
          "FullName": "Tuấn Dev",
          "BirthDate": null,
          "MobilePhone": "0971021196",
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
          "CreateDate": "2023-06-22T09:33:15",
          "EditDate": "2023-06-22T09:33:15",
          "IsApproval": false,
          "Enable": false,
          "Type": "",
          "GroupUser": "",
          "FriendStr": "tuan-dev",
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
          "Present": {
            "don_hang": 0,
            "nap_vi": 100000,
            "nap_vi_tat_ca": 100000,
            "nap_vi_lich_su": 0,
            "nap_vi_b": 0,
            "dat_coc": 0,
            "nk_cskh": 0,
            "the_cu": 0,
            "version_time": "2023-06-23 09:36:58",
            "pending": false,
            "cdate": "2023-06-23 09:36:58",
            "the_tien_kha_dung": 0
          },
          "IsOfBrand": false,
          "Auth2TokenIds": "1",
          "IsKeepGroup": false,
          "AppInfo": "",
          "TeleUserID": 0,
          "TeleNote": "",
          "TeleTags": "",
          "TransferJSON": "",
          "IsExcelImport": false,
          "ThirdImportID": 0,
          "RequirePwd": false,
          "ZaloID": ""
        },
        onOpenActionStocks,
        onHideActionStocks,
        onSaveStocks,
        Stocks,
        setStocks
      }}
    >
      {children}
      {!splashScreen && <SheetStocks />}
    </LayoutContext.Provider>
  );
};

export { LayoutProvider, useLayout };
