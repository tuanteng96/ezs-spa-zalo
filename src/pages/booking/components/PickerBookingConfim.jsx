import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button, Input, Select, Sheet, Switch } from "zmp-ui";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useLayout } from "../../../layout/LayoutProvider";

const { OtpGroup, Option } = Select;

export const PickerBookingConfim = ({ children }) => {
  const { AccessToken, Auth } = useLayout();
  const [visible, setVisible] = useState(false);

  const { control } = useFormContext()

  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}
      {createPortal(
        <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
          <div className="h-full">
            <div>
              <div className="flex justify-between p-3 border-b">
                <div className="text-[14px]">Sử dụng dịch vụ tại nhà</div>
                <Switch size="small" />
              </div>
              <div className="p-3 border-b">

                <Input.TextArea className="!mb-0" showCount placeholder="Nhập ghi chú của bạn?" />
              </div>
            </div>
            <div className="p-3">
              <Button
                className={clsx(
                  "transition !bg-app",
                  //addCartMutation.isLoading && "!bg-opacity-70"
                )}
                fullWidth
                size="large"
              //loading={addCartMutation.isLoading}
              >
                Đặt lịch ngay
              </Button>
            </div>
          </div>
        </Sheet>,
        document.body
      )}
    </>
  );
};
