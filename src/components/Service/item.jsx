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
              <ImageLazy wrapperClassName="aspect-square !block" className="aspect-square h-full object-cover" effect="blur" src={toAbsolutePath(service.root.Thumbnail)} />
            </div>
            <div className="p-3">
              <Text.Title className="text-app mb-2">{service.root.Title}</Text.Title>
              <div className="line-clamp-3 h-[60px] text-sm">
                <div dangerouslySetInnerHTML={{ __html: service.root.Desc }} />
                <div dangerouslySetInnerHTML={{ __html: service.root.Detail }} />
              </div>
            </div>
          </div>
          <div>
            {
              service.items && service.items.map((item, index) => <Card key={index} item={item} />)
            }
          </div>
        </div>
      )}
    </ServicePicker>
  )
}