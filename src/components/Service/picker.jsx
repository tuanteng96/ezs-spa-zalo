import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Sheet, Text } from "zmp-ui";

export const ServicePicker = ({ children, service }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}
      {createPortal(
        <Sheet height="80%" visible={visible} onClose={() => setVisible(false)}>
          {service && (
            <div className="h-full flex flex-col relative overflow-auto no-scrollbar p-3">
              <Text.Title size="large" className="flex mb-2 text-app">
                {service.root.Title}
              </Text.Title>
              <div>
                <div
                  className="leading-6"
                  dangerouslySetInnerHTML={{ __html: service.root.Desc }}
                />
                <div
                  dangerouslySetInnerHTML={{ __html: service.root.Detail }}
                />
              </div>
            </div>
          )}
        </Sheet>,
        document.body
      )}
    </>
  );
};