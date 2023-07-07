import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Button, Sheet, useNavigate, useSnackbar } from "zmp-ui";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { ImageLazy } from "../../../components/ImagesLazy";
import { toAbsolutePath } from "../../../utils/assetPath";
import { PriceSaleDetail } from "./PriceSaleDetail";
import { QuantityPicker } from "./QuantityPicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CartAPI from "../../../api/cart.api";
import { useLayout } from "../../../layout/LayoutProvider";
import clsx from "clsx";
import { useLocation } from "react-router";

export const PickerOrder = ({ children, item, buttonText }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { AccessToken, Auth } = useLayout();
  const [visible, setVisible] = useState(false);
  const { handleSubmit, control } = useFormContext();
  const { openSnackbar } = useSnackbar();

  const { fields } = useFieldArray({
    control,
    name: "adds",
  });

  const queryClient = useQueryClient();

  const addCartMutation = useMutation({
    mutationFn: (body) => CartAPI.list(body),
  });

  const onSubmit = (values) => {
    if (!AccessToken && !Auth) {
      setVisible(false);
      navigate(`/?fromProtected=${pathname}`);
    } else {
      addCartMutation.mutate(
        { token: AccessToken, body: values },
        {
          onSuccess: () => {
            queryClient
              .invalidateQueries({ queryKey: ["ListsCart"] })
              .then(() => {
                if (buttonText === "Mua ngay") {
                  navigate("/cart");
                } else {
                  openSnackbar({
                    text: "Đã thêm vào giỏ !",
                    type: "success",
                    duration: 2000,
                  });
                  navigate(-1);
                }
              });
          },
        }
      );
    }
  };

  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}
      {createPortal(
        <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
          {item && (
            <div className="h-full">
              <div className="flex items-end px-3 pt-3 pb-4 border-b">
                <div className="w-32">
                  <ImageLazy
                    wrapperClassName="aspect-square !block"
                    className="aspect-square object-cover w-full"
                    effect="blur"
                    src={toAbsolutePath(item?.Thumbnail)}
                  />
                </div>
                <div className="pl-3">
                  <div className="font-semibold mb-2">{item?.Title}</div>
                  <PriceSaleDetail product={item} />
                </div>
              </div>
              <div className="p-3 flex justify-between items-center">
                <div>Số lượng</div>
                <div className="w-36">
                  {fields &&
                    fields.map((item, index) => (
                      <Controller
                        key={item.id}
                        name={`adds[${index}].Qty`}
                        control={control}
                        render={({ field: { ref, ...field } }) => (
                          <QuantityPicker
                            value={field.value}
                            onChange={(val) => field.onChange(val)}
                          />
                        )}
                      />
                    ))}
                </div>
              </div>
              <div className="p-3">
                <Button
                  className={clsx(
                    "!bg-app",
                    addCartMutation.isLoading && "!bg-opacity-70"
                  )}
                  fullWidth
                  size="large"
                  onClick={handleSubmit(onSubmit)}
                  loading={addCartMutation.isLoading}
                >
                  {buttonText}
                </Button>
              </div>
            </div>
          )}
        </Sheet>,
        document.body
      )}
    </>
  );
};
