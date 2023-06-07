import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button, Icon, Input, Sheet } from "zmp-ui";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useLayout } from "../../../layout/LayoutProvider";
import CartAPI from "../../../api/cart.api";
import GiftSVG from "../../../static/icons/gift.svg"

export const PickerVoucher = ({
  children,
  item
}) => {
  const { AccessToken, Auth } = useLayout()
  const [visible, setVisible] = useState(false);
  const { handleSubmit, control, watch, reset } = useForm({
    defaultValues: {
      ID: 0,
      Qty: 1,
    }
  });

  useEffect(() => {
    reset({
      ID: item?.ID,
      Qty: item?.Qty,
    })
  }, [reset, visible])

  const queryClient = useQueryClient()

  const addCartMutation = useMutation({
    mutationFn: body => CartAPI.list(body)
  })

  const onSubmit = (values) => {
    const body = {
      "order": {
        "ID": 0,
        "SenderID": Auth?.ID
      },
      "deleteds": [],
      "edits": [],
      "addProps": "ProdTitle"
    }

    if (values.Qty === 0) {
      body.deleteds = [{ ...values }]
    }
    else {
      body.edits = [{ ...values }]
    }
    addCartMutation.mutate({ token: AccessToken, body: body }, {
      onSuccess: () => {
        queryClient
          .invalidateQueries({ queryKey: ['ListsCart'] })
          .then(() => {
            setVisible(false)
          })
      }
    })
  }

  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}
      {createPortal(
        <Sheet height="90%" visible={visible} onClose={() => setVisible(false)}>
          <div className="h-full flex flex-col">
            <div>
              <div className="flex h-12 items-center">
                <div className="px-3 h-full flex items-center justify-center">
                  <Icon className="text-app" icon="zi-arrow-left" />
                </div>
                <div className="font-semibold">Chọn Voucher</div>
              </div>
              <div className="px-3 pb-3 flex">
                <Input
                  className="!rounded-sm !m-0"
                  type="text"
                  placeholder="Nhập mã voucher của bạn"
                />
                <Button className="!rounded-sm !ml-2 !bg-app disabled:!text-white disabled:opacity-60" disabled={true}>Áp dụng</Button>
              </div>
            </div>
            <div className="border-t border-4"></div>
            <div className="grow overflow-auto no-scrollbar p-3">
              <div className="border shadow-3xl border-l-0 rounded-sm overflow-hidden flex">
                <div className="w-[6.625rem] h-[6.625rem] relative">
                  <div style={{ background: 'linear-gradient(180deg,#70000A 0.25rem,transparent 0,transparent calc(100% - 0.25rem),#70000A calc(100% - 0.25rem)) 0 0 /0.0625rem 100% no-repeat,linear-gradient(180deg,#70000A 0.25rem,transparent 0,transparent calc(100% - var(--vc-card-sawtooth-margin, .25rem)),#70000A calc(100% - 0.25rem)) 0 0/100% 100% no-repeat', borderBottom: '0.0625rem solid var(--vc-card-left-border-color,#e8e8e8)', borderBottomLeftRadius: '0.125rem', borderTop: '0.0625rem solid #70000A', borderTopLeftRadius: '0.125rem', height: '100%', left: 0, overflow: 'hidden', position: 'absolute', top: 0, width: '100%' }}>
                    <div style={{ background: 'linear-gradient(180deg,transparent calc(0.1875rem*2),#70000A 0) 0 0.0625rem /0.0625rem calc(0.1875rem*2 + 0.0625rem) repeat-y,radial-gradient(circle at 0 0.1875rem,transparent 0,transparent calc(0.1875rem - 0.0625rem),#70000A 0,#70000A 0.1875rem,#70000A 0) 0 0.0625rem /100% calc(0.1875rem*2 + 0.0625rem) repeat-y', bottom: 'calc(0.25rem - 0.0625rem)', position: 'absolute', top: 'calc(0.25rem - 0.0625rem)', width: '100%' }}>
                      <img className="aspect-square w-full" src={GiftSVG} />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 flex-1">
                  <div className="text-lg font-bold mb-2 text-app">Mã VC5</div>
                  <div className="font-semibold">Ưu đãi 50%</div>
                  <div className="text-sm text-gray-600">Hạn sử dụng còn 5 ngày</div>
                </div>
                <div className="pr-4 flex items-center">
                  <div className="w-5 h-5 rounded-full border border-gray-500 shadow-3xl"></div>
                </div>
              </div>
            </div>
            <div className="p-3 border-t">
              <Button fullWidth className="!rounded-sm !bg-app disabled:!text-white disabled:opacity-60" disabled={true}>Đồng ý</Button>
            </div>
          </div>
        </Sheet>,
        document.body
      )}
    </>
  )
}