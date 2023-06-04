import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Sheet } from "zmp-ui";

export const ProductPicker = ({
  children,
  product
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}
      {createPortal(
        <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
          {product && (
            <div>a</div>
          )}
        </Sheet>,
        document.body
      )}
    </>
  )
}