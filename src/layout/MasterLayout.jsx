import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserInfo } from "zmp-sdk";
import ConfigsAPI from "../api/configs.api";
import { SheetRegistration } from "../components/SheetRegistration";

const ConfigContext = createContext();

const useConfigs = () => {
  return useContext(ConfigContext);
};

const MasterLayout = ({ children }) => {
  const [ZaloInfo, setZaloInfo] = useState(null);
  const [GlobalConfig, setGlobalConfig] = useState(null);

  useQuery({
    queryKey: ["GlobalConfig"],
    queryFn: () => ConfigsAPI.global(),
    onSuccess: ({ data }) => {
      setGlobalConfig(data);
    },
  });

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
        GlobalConfig,
      }}
    >
      {children}
      <SheetRegistration />
    </ConfigContext.Provider>
  );
};

export { MasterLayout, useConfigs };
