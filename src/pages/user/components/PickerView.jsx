import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Button, Icon, Input, Sheet, useSnackbar } from "zmp-ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useLayout } from "../../../layout/LayoutProvider";

export const PickerView = ({ children, Content }) => {
  const { openSnackbar } = useSnackbar();
  const { AccessToken, Auth, GlobalConfig } = useLayout();
  const [visible, setVisible] = useState(false);

  const queryClient = useQueryClient();

  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}
      {createPortal(
        <Sheet height="85%" visible={visible} onClose={() => setVisible(false)}>
          <div className="h-[calc(100%-24px)] flex flex-col">
            {Content && Content()}
            {/* <div className="p-3 border-t">
              <Button
                fullWidth
                className="!rounded-sm !bg-app disabled:!text-white disabled:opacity-60"

              >
                Đồng ý
              </Button>
            </div> */}
          </div>
        </Sheet>,
        document.body,
      )}
    </>
  );
};
