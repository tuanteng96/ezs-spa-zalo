import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button, Input, Sheet, Switch, Select } from "zmp-ui";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import clsx from "clsx";
import { EzsSelectUserDV } from "../../../partials/select";
import { useLocation } from "react-router";
import { useLayout } from "../../../layout/LayoutProvider";

export const PickerBookingConfim = ({ children, addBookingMutation }) => {
  const { search } = useLocation();
  const [visible, setVisible] = useState(false);

  const { control, watch, setValue } = useFormContext();
  const { GlobalConfig } = useLayout();

  const inputElement = useRef();
  let { StockID, AmountPeople, RootIdS, maxPeople, PrevBook } = watch();

  let [isAdvanced, setIsAdvanced] = useState(false);

  const previousSheetOpened = useRef(false);

  const { fields, replace } = useFieldArray(
    {
      control,
      name: "MultipleMembers",
    }
  );


  useEffect(() => {
    const justOpened = visible && !previousSheetOpened.current;
    previousSheetOpened.current = visible;

    if (!visible) return;

    if (GlobalConfig?.Admin?.isMultipleMembersBook) {
      if (justOpened && Array.isArray(PrevBook?.InfoMore?.Clients) && PrevBook?.InfoMore?.Clients.length > 0) {
        const membersByIndex = new Map();

        PrevBook?.InfoMore?.Clients?.forEach((item) => {
          const index = Number(item.Index);

          if (!membersByIndex.has(index)) {
            membersByIndex.set(index, {
              GroupTitle: "Khách " + (index + 1),
              Index: index,
              Items: [],
            });
          }

          membersByIndex.get(index).Items.push({
            ...item, Index: index, UserServiceIDs: item.UserServiceIDs && item.UserServiceIDs.length > 0 ? {
              ...item.UserServiceIDs[0],
              id: item.UserServiceIDs[0].value,
              text: item.UserServiceIDs[0].label,
            } : null, RootIdS: item?.RootIdS ? {
              ...item?.RootIdS,
              Title: item?.RootIdS?.label,
              ID: item?.RootIdS?.value
            } : null
          });
        });
        replace(
          Array.from(membersByIndex.values()).sort((a, b) => a.Index - b.Index),
        );
      }
      else {
        let newMultipleMembers = [];
        const amountPeople = Number(AmountPeople || 0);
        const services = Array.isArray(RootIdS) ? RootIdS : [];

        newMultipleMembers = Array.from({ length: amountPeople }, (_, index) => {
          return {
            GroupTitle: "Khách " + (index + 1),
            Index: index,
            Items: services
              ? services.map((sv) => ({
                Index: index,
                RootIdS: sv
                  ? {
                    ...sv,
                    label: sv.Title,
                    value: sv.ID,
                  }
                  : null,
                UserServiceIDs: null,
                Room: null,
              }))
              : [],
          };
        });

        replace(newMultipleMembers);
      }

    }
  }, [visible, AmountPeople, RootIdS, GlobalConfig?.Admin?.isMultipleMembersBook, replace]);

  useEffect(() => {

    if (visible && (Number(AmountPeople) > 1 || Array.isArray(PrevBook?.InfoMore?.Clients) && PrevBook?.InfoMore?.Clients.length > 0)) {
      setIsAdvanced(true);
    } else {
      setIsAdvanced(false);
    }
  }, [visible]);

  useEffect(() => {
    visible && setVisible(false);
  }, [search]);

  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}
      {createPortal(
        <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
          <div className="h-[80vh] flex flex-col">
            <div className="grow overflow-auto">
              {GlobalConfig?.APP?.Booking?.AtHome && (
                <Controller
                  name="AtHome"
                  control={control}
                  render={({ field: { ref, ...field }, fieldState }) => (
                    <div className="flex justify-between p-3 border-b">
                      <div className="text-[14px]">Sử dụng dịch vụ tại nhà</div>
                      <Switch
                        size="small"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </div>
                  )}
                />
              )}

              <div className="p-3 border-b">

                {GlobalConfig?.APP?.SL_khach && (
                  <Controller
                    name="AmountPeople"
                    control={control}
                    render={({ field: { ref, ...field }, fieldState }) => (
                      <div className="mb-2">
                        <div className="text-[14px]">Số lượng khách</div>
                        <Select
                          placeholder="Chọn số lượng khách"
                          value={field.value}
                          onChange={(v) => {
                            field.onChange(v);
                            if (v > 1) {
                              setValue("UserServiceIDs", "")
                              setIsAdvanced(true);

                            } else {
                              setIsAdvanced(false);
                            }
                          }}
                        >
                          {
                            Array(10)
                              .fill()
                              .map((_, x) => <Select.Option key={x} value={x + 1} title={x + 1 + " khách"} disabled={maxPeople?.unlimited ? !maxPeople?.unlimited : x + 1 > maxPeople?.RemainBook} />)
                          }
                        </Select>
                      </div>
                    )}
                  />
                )}


                <>
                  {
                    GlobalConfig?.Admin?.dat_lich_nhan_vien === 1 && !isAdvanced && (
                      <Controller
                        name="UserServiceIDs"
                        control={control}
                        render={({ field: { ref, ...field }, fieldState }) => (
                          <EzsSelectUserDV
                            value={field.value}
                            onChange={field.onChange}
                            StockID={StockID}
                            type="text"
                            className="cursor-pointer"
                            label="Nhân viên thực hiện"
                            placeholder="Chọn nhân viên"
                          />
                        )}
                      />
                    )
                  }

                  {
                    isAdvanced && (
                      <div className="flex flex-col gap-2 mb-2">
                        {fields &&
                          fields.map((members, index) => (
                            <div
                              style={{
                                border: "1px solid rgb(226 232 240 / 0.8)",
                                padding: "12px",
                                borderRadius: "8px",
                                boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                                borderLeft: "3px solid #f8888c",
                              }}
                              key={index}
                            >
                              <div
                                className="flex items-center"
                                style={{
                                  gap: "12px",
                                  borderBottom: "1px solid #f1f5f9",
                                  paddingBottom: 12,
                                  marginBottom: 12,
                                }}
                              >
                                <div
                                  style={{
                                    width: 28,
                                    height: 28,
                                    boxShadow:
                                      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                                    borderRadius: "50%",
                                    background: "#0f172a",
                                    color: "#fff",
                                    fontWeight: 700,
                                    fontSize: 11,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  K{index + 1}
                                </div>
                                <div className="font-semibold uppercase">
                                  {members.GroupTitle}
                                </div>
                              </div>
                              <MemberItems memberIndex={index} StockID={StockID} />
                            </div>
                          ))}
                      </div>
                    )
                  }

                </>

                <Controller
                  name="Desc"
                  control={control}
                  render={({ field: { ref, ...field }, fieldState }) => (
                    <Input.TextArea
                      onChange={field.onChange}
                      value={field.value}
                      className="!mb-0"
                      showCount
                      placeholder="Nhập ghi chú của bạn?"
                    />
                  )}
                />
              </div>
            </div>
            <div className="p-3">
              <Button
                onClick={() =>
                  inputElement?.current && inputElement?.current?.click()
                }
                htmlType="submit"
                className={clsx(
                  "transition uppercase font-medium !bg-app",
                  addBookingMutation.isLoading && "!bg-opacity-70",
                )}
                fullWidth
                size="large"
                loading={addBookingMutation.isLoading}
              >
                Đặt lịch ngay
              </Button>
            </div>
          </div>
        </Sheet>,
        document.body,
      )}
      <button ref={inputElement} type="submit" className="hidden" />
    </>
  );
};

const MemberItems = ({ memberIndex, StockID }) => {
  const { GlobalConfig } = useLayout();
  const { control } = useFormContext();
  const { fields, remove } = useFieldArray({
    control,
    name: `MultipleMembers.${memberIndex}.Items`,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {fields.map((member, itemIndex) => (
        <div key={member.id}>
          <div className="flex items-end justify-between mb-[6px]">
            <div
              className="flex items-center font-medium"
              style={{ gap: "5px", lineHeight: "18px" }}
            >
              <svg
                style={{ color: "#f59e0b", width: "0.875rem" }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13 2L3 14h7v8l10-12h-7V2z" />
              </svg>
              {member?.RootIdS?.label}
            </div>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(itemIndex)}
                className="flex justify-center"
                style={{
                  alignItems: "center",
                  color: "#f43f5e",
                  background: "#fff1f2",
                  borderRadius: "0.5rem",
                  width: 28,
                  height: 28,
                }}
              >
                <svg
                  style={{ width: "17px" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>
          {
            GlobalConfig?.Admin?.dat_lich_nhan_vien === 1 && (
              <Controller
                name={`MultipleMembers.${memberIndex}.Items.${itemIndex}.UserServiceIDs`}
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <EzsSelectUserDV
                    value={field.value}
                    onChange={field.onChange}
                    StockID={StockID}
                    type="text"
                    className="cursor-pointer"
                    label="Nhân viên thực hiện"
                    placeholder="Chọn nhân viên"

                  />
                )}
              />
            )
          }

        </div>
      ))}
    </div>
  );
};
