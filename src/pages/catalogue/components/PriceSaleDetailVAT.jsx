import React from "react";
import { useLayout } from "../../../layout/LayoutProvider";
import { formatString } from "../../../utils/formatString";

export const PriceSaleDetailVAT = ({ product }) => {
  const { GlobalConfig } = useLayout();

  const { PriceSale, PriceProduct, SaleBegin, SaleEnd, IsDisplayPrice, PriceSaleVAT, PriceProductVAT } =
    product;

  const isSale =
    SaleBegin &&
    SaleEnd &&
    IsDisplayPrice !== 0 &&
    Date.parse(new Date()) < Date.parse(SaleEnd) &&
    Date.parse(SaleBegin) <= Date.parse(new Date()) &&
    PriceSale > 0;
  
  const percentSale = 100 - (PriceSale / PriceProduct) * 100;
  return (
    <>
      <div className="text-danger font-semibold">
        {IsDisplayPrice !== 0
          ? <>
            {formatString.formatVND(isSale ? PriceSaleVAT : PriceProductVAT)}
          </>
          : "Liên hệ"}
      </div>
      {isSale && (
        <div>
          <span className="text-muted text-sm line-through">
            {formatString.formatVND(PriceProduct)}
          </span>
          {percentSale > 0 && percentSale <= 100 && (
            <span className="text-danger text-sm pl-2 font-semibold">
              -{percentSale}%
            </span>
          )}
        </div>
      )}
      {
        GlobalConfig?.Admin?.isPriceExclVAT && (
          <div className="mt-1.5 text-warning">
            (Giá đã bao gồm {product?.VAT}% VAT)
          </div>
        )
      }
      
    </>
  );
};
