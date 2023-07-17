import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon, Sheet } from "zmp-ui";
import MoreAPI from "../../api/more.api";
import { useLayout } from "../../layout/LayoutProvider";

const SheetStocks = () => {
  const {
    CurrentStocks,
    onSaveStocks,
    actionStocksVisible,
    onOpenActionStocks,
    onHideActionStocks,
    setStocks,
    Stocks,
  } = useLayout();

  useQuery({
    queryKey: ["ListStocks"],
    queryFn: async () => {
      const { data } = await MoreAPI.getStocks();
      return data?.data?.all
        ? data?.data?.all.filter((x) => x.ParentID !== 0)
        : [];
    },
    onSuccess: (data) => {
      setStocks(data);
    },
  });

  useEffect(() => {
    if (Stocks && !CurrentStocks) {
      if (Stocks.length > 1) {
        onOpenActionStocks();
      } else {
        onSaveStocks(Stocks[0]);
      }
    }
  }, [Stocks, CurrentStocks]);

  return createPortal(
    <Sheet
      className="bg-white"
      mask
      autoHeight
      visible={actionStocksVisible}
      onClose={onHideActionStocks}
      swipeToClose
    >
      <div className="px-4 h-12 flex items-center justify-center">
        Chọn cơ sở gần bạn ?
      </div>
      <div>
        {Stocks &&
          Stocks.map((item, index) => (
            <div
              className={clsx(
                "px-12 h-12 border-t border-separator flex items-center justify-center font-semibold capitalize cursor-pointer relative",
                item.ID === CurrentStocks?.ID && "text-app"
              )}
              key={index}
              onClick={() => onSaveStocks(item)}
            >
              <div className="truncate">{item.Title}</div>
              {item.ID === CurrentStocks?.ID && (
                <div className="absolute right-4">
                  <Icon icon="zi-check" />
                </div>
              )}
            </div>
          ))}
      </div>
      <div
        className="px-4 h-12 text-center border-t border-separator flex items-center justify-center text-danger font-semibold"
        onClick={onHideActionStocks}
      >
        Đóng
      </div>
    </Sheet>,
    document.body
  );
};

export { SheetStocks };
