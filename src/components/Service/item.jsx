import React from "react";
import { Text } from "zmp-ui";
import { toAbsolutePath } from "../../utils/assetPath";
import { ImageLazy } from "../ImagesLazy";
import { Card } from "./card";
import { ServicePicker } from "./picker";

export const ServiceItem = ({ service }) => {
  return (
    <ServicePicker service={service}>
      {({ open }) => (
        <div className="bg-white">
          <div onClick={open}>
            <div>
              <ImageLazy
                wrapperClassName="aspect-square !block"
                className="aspect-square h-full object-cover"
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
                  <div
                    dangerouslySetInnerHTML={{ __html: service.root.Desc }}
                  />
                  <div
                    dangerouslySetInnerHTML={{ __html: service.root.Detail }}
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            {service.items &&
              service.items.map((item, index) => (
                <Card key={index} item={item} />
              ))}
          </div>
        </div>
      )}
    </ServicePicker>
  );
};
