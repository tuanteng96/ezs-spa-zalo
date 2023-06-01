import React, { useState } from "react"
import { Sheet } from "zmp-ui"
import { useLayout } from "../../layout/LayoutProvider"

const SheetStocks = () => {
  const { actionStocksVisible, setActionStocksVisible } = useLayout()
  return (
    <Sheet
      className="bg-white"
      mask
      autoHeight
      visible={actionStocksVisible}
      onClose={() => setActionStocksVisible(false)}
      swipeToClose
    >
      <div className="px-4 h-12 flex items-center justify-center">Chọn cơ sở gần bạn ?</div>
      <div>
        <div className="px-10 h-12 border-t border-separator flex items-center justify-center font-semibold capitalize">
          <div className="truncate">Cser Hà Nội</div>
        </div>
        <div className="px-10 h-12 border-t border-separator flex items-center justify-center font-semibold capitalize">
          <div className="truncate">Cser Đà Nẵng</div>
        </div>
        <div className="px-10 h-12 border-t border-separator flex items-center justify-center font-semibold capitalize">
          <div className="truncate">Cser Hồ Chí Minh</div>
        </div>
      </div>
      <div className="px-4 h-12 text-center border-t border-separator flex items-center justify-center text-danger font-semibold">Đóng</div>
    </Sheet>
  )
}

export { SheetStocks }