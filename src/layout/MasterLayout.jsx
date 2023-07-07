import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserInfo } from "zmp-sdk";
import { SheetRegistration } from "../components/SheetRegistration";

const ConfigContext = createContext();

const useConfigs = () => {
  return useContext(ConfigContext);
};

const MasterLayout = ({ children }) => {
  const [ZaloInfo, setZaloInfo] = useState(null);

  useEffect(() => {
    getUserInfo({
      success: (data) => {
        const { userInfo } = data;
        setZaloInfo(userInfo);
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        setZaloInfo(error);
      },
    });
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        ZaloInfo,
      }}
    >
      {children}
      <SheetRegistration />
    </ConfigContext.Provider>
  );
};

export { MasterLayout, useConfigs };
