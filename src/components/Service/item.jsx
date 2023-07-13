import React from "react";
import { toAbsolutePath } from "../../utils/assetPath";
import { HtmlParser } from "../HtmlParser";
import { ImageLazy } from "../ImagesLazy";
import { CardWrap } from "./card-wrap";
import { ServicePicker } from "./picker";

export const ServiceItem = ({ service }) => {
  return (
    <ServicePicker service={service}>
      {({ open }) => (
        <div className="bg-white">
          <div onClick={open}>
            <div>
              <ImageLazy
                wrapperClassName="aspect-[5/3] !block"
                className="aspect-[5/3] h-full object-cover"
                effect="blur"
                src={toAbsolutePath(service.root.Thumbnail)}
              />
            </div>
            <div className="p-3">
              <div className="text-app text-[16px] font-semibold leading-6">
                {service.root.Title}
              </div>
              {(service.root.Desc || service.root.Detail) && (
                <div className="line-clamp-3 h-[60px] text-sm mt-2">
                  <HtmlParser>
                    {service.root.Desc}
                    {service.root.Detail}
                  </HtmlParser>
                </div>
              )}
            </div>
          </div>
          <CardWrap service={service} />
        </div>
      )}
    </ServicePicker>
  );
};
