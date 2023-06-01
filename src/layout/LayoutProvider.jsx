import React from 'react'
import { createContext, useContext, useState } from 'react'
import { getSystemInfo } from "zmp-sdk"
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
  const [actionStocksVisible, setActionStocksVisible] = useState(false); // Visible Select Stocks

  return (
    <LayoutContext.Provider
      value={{
        actionStocksVisible,
        setActionStocksVisible
      }}
    >
      {children}
      <SheetStocks />
    </LayoutContext.Provider>
  )
}

export { LayoutProvider, useLayout }
