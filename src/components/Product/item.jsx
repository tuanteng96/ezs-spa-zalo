import React from "react";
import { toAbsolutePath } from "../../utils/assetPath";
import { ImageLazy } from "../ImagesLazy";
import { PriceSale } from "./price-sale";
import { NavLink } from "react-router-dom";

export const ProductItem = ({ product }) => {
  return (
    <NavLink to={`/catalogue/${product.id}`} className="bg-white">
      <div>
        <ImageLazy
          wrapperClassName="aspect-square !block"
          className="aspect-square object-cover"
          effect="blur"
          src={toAbsolutePath(product.photo)}
        />
      </div>
      <div className="p-2">
        <div className="line-clamp-2 text-xs leading-4 mb-2 min-h-[32px]">
          {product.title}
        </div>
        <PriceSale
          Price={product.price}
          PriceSale={product.pricesale}
          SaleBegin={product.source.SaleBegin}
          SaleEnd={product.source.SaleEnd}
          IsDisplayPrice={product.IsDisplayPrice}
        />
      </div>
    </NavLink>
  );
};
