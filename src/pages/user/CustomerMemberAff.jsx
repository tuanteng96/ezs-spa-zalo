import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { NavLink } from "react-router-dom";
import {  Icon, Page,  Text, useNavigate, useSnackbar } from "zmp-ui";
import AuthAPI from "../../api/auth.api";
import { useLayout } from "../../layout/LayoutProvider";
import { formatString } from "../../utils/formatString";
import { PickerView } from "./components/PickerView";

const CustomerMemberAff = () => {
  const navigate = useNavigate();
  const { Auth, AccessToken, GlobalConfig } = useLayout();

  const { openSnackbar } = useSnackbar();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["CustomerMemberAff", {AccessToken, Auth}],
    queryFn: async () => {
      const { data } = await AuthAPI.getVoucherAff({
        AccessToken,
        From: moment().format("YYYY-MM-DD"),
        To: null,
        MemberID: Auth?.ID,
      });
      let MyCodes = data
        ? data.filter((x) => Number(x.MemberID) === Number(Auth?.ID))
        : [];
      
      const myTitles = new Set(MyCodes.map((x) => x.Title));

      let Items = data
        ? data
          .filter((x) => Number(x.MemberID) === -1)
          .filter((x) => !myTitles.has(x.Code))
        : [];
      return { MyCodes, Items };
    },
    enabled: Number(Auth?.ID) > -1,
  });

  const registerMutation = useMutation({
    mutationFn: async (body) => {
      let rs = await AuthAPI.addDupVoucher(body);
      await refetch()
      return rs
    },
  });

  function copyText(text) {
    // Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    // Fallback cho iOS / Android WebView
    return new Promise((resolve, reject) => {
      const textarea = document.createElement("textarea");
      textarea.value = text;

      textarea.style.position = "fixed";
      textarea.style.left = "-999999px";
      textarea.style.top = "-999999px";

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);

      try {
        document.execCommand("copy");
        resolve();
      } catch (e) {
        reject(e);
      } finally {
        document.body.removeChild(textarea);
      }
    });
  }

  const onRegisterCode = async (item) => {
    let del = true

    openSnackbar({
      text: `Đăng ký mã sẽ thực hiện sau 5s ...`,
      type: "countdown",
      duration: 5000,
      action: {
        text: "Hủy đăng ký",
        close: true,
        onClick: () => {
          del = false;
        },
      },
      onClose: () => {
        if (!del) return

        const dataSubmit = {
          MemberID: Auth?.ID,
          ID: item?.ID,
          Title: item?.Code,
          AccessToken
        };

        registerMutation.mutate(dataSubmit, {
          onSuccess: (rs) => {

            openSnackbar({
              text: `Đăng ký mã thành công. Mã của bạn là ${rs?.data?.to?.Code}`,
              type: "success",
              action: {
                text: "Copy",
                close: true,
                onClick: () => {
                  openSnackbar({
                    text: "Đăng ký mã thành công.",
                    type: "success",
                    action: {
                      text: "Copy",
                      close: true,
                      onClick: async () => {
                        await copyText(rs?.data?.to?.Code)
                        openSnackbar({
                          text: "Đã Copy Mã đăng ký.",
                          type: "success",
                        })
                      }
                    },
                  });
                }
              },
            });
          },
        });
      },
    });
  }

  return (
    <Page className="page !pb-safe-bottom" hideScrollbar>
      <div className="navbar fixed top-0 left-0 min-w-[100vw] max-w-[100vw] z-[999] bg-white">
        <div className="w-2/3 relative flex items-center h-full pl-10">
          <div
            className="absolute left-0 w-10 h-full flex justify-center items-center cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <Icon icon="zi-chevron-left-header" className="text-app" />
          </div>
          <Text.Title className="text-app">Chương trình AFF</Text.Title>
        </div>
      </div>
      <div className="h-full border-t p-4 flex flex-col overflow-auto gap-4">
        {GlobalConfig?.APP?.quy_dinh_aff && (
          <PickerView data={GlobalConfig?.APP?.quy_dinh_aff} Content={() => (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b-[2px] font-semibold">
                <b>Chính sách & Điều khoản</b>
              </div>
              <div className="grow overflow-auto p-4">
                {GlobalConfig?.APP?.quy_dinh_aff}
              </div>
            </div>
          )}>
            {({ open }) => (
              <div className="text-center text-primary fw-600 mb-20px mt-8px text-underline" onClick={open}>Chính sách & Điều khoản chương trình</div>
            )}
          </PickerView>
        )}
        <div
          className="text-[14px]"
          style={{
            backgroundColor: "rgb(238 242 255 / 0.7)",
            padding: "1rem",
            textAlign: "center",
            border: "1px solid rgb(224 231 255 / 0.5)",
            borderRadius: "1rem",
            lineHeight: "23px",
            fontWeight: 500,
          }}
        >
          Để tham gia, bạn hãy đăng ký mã voucher để bắt đầu chia sẻ
        </div>
        {
          isLoading && (<>
          <div className="mt-[15px] bg-white border border-slate-200 rounded-[24px] p-[14px] shadow-sm animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between px-1 pb-1 mb-3">
        <div className="h-3 w-40 bg-slate-200 rounded" />
        <div className="h-5 w-20 bg-slate-200 rounded-full" />
      </div>

      {/* Items */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="relative overflow-hidden flex items-center justify-between rounded-2xl p-[14px] border border-slate-100 bg-slate-50/50"
          >
            {/* Left border */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200" />

            {/* Content */}
            <div className="flex items-center gap-3 pl-1 z-10">
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />

              <div>
                {/* Title */}
                <div className="h-3 w-48 bg-slate-200 rounded mb-2" />

                {/* Commission */}
                <div className="h-3 w-32 bg-slate-200 rounded" />

                {/* Detail */}
                <div className="h-2.5 w-16 bg-slate-200 rounded mt-2" />
              </div>
            </div>

            {/* Button */}
            <div className="h-8 w-24 bg-slate-200 rounded-xl shrink-0" />
          </div>
        ))}
      </div>
    </div>
          </>)
        }
        {
          !isLoading && (
            <>
              {data?.Items && data?.Items.length > 0 && (
          <div
            className="mt-15px"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 24,
              padding: 14,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: 4,
                paddingRight: 4,
                paddingBottom: 4,
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Danh sách mã đề xuất
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "#4f46e5",
                  fontWeight: 600,
                  backgroundColor: "#eef2ff",
                  padding: "2px 8px",
                  borderRadius: 9999,
                }}
              >
                Có sẵn {data?.Items?.length} mã
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {data?.Items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    backgroundColor: "rgba(248,250,252,0.5)",
                    border: "1px solid #f1f5f9",
                    borderRadius: 16,
                    padding: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    overflow: "hidden",
                    transition: "all 300ms",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 4,
                      backgroundColor: "#6366f1",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      paddingLeft: 6,
                      zIndex: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        backgroundColor: "#eef2ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#4f46e5",
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        data-lucide="percent"
                        aria-hidden="true"
                        style={{ width: 20, height: 20 }}
                      >
                        <line x1={19} x2={5} y1={5} y2={19} />
                        <circle cx="6.5" cy="6.5" r="2.5" />
                        <circle cx="17.5" cy="17.5" r="2.5" />
                      </svg>
                    </div>
                    <div>
                      <h5
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#1e293b",
                          margin: 0,
                        }}
                      >
                        Người sử dụng:{" "}
                        {item?.ValueType === 2 ? "Đồng giá" : "Giảm tối đa"}{" "}
                        {item?.Discount > 100
                          ? formatString.formatVND(item?.Discount)
                          : `${item?.Discount}%`}
                      </h5>
                      <p
                        style={{
                          fontSize: 11,
                          color: "#64748b",
                          margin: "2px 0 0 0",
                        }}
                      >
                        Hoa hồng nhận:{" "}
                        <strong style={{ color: "#1e293b", fontWeight: 600 }}>
                          {item?.VoucherMeta?.Perc < 0
                            ? "Tích điểm"
                            : `${item?.VoucherMeta?.Perc > 100 ? formatString.formatVND(item?.VoucherMeta?.Perc) : `${item?.VoucherMeta?.Perc}%`}`}
                        </strong>
                      </p>
                      <PickerView Content={() => (
                        <div className="h-full flex flex-col">

                          <div className="p-4 border-b-[2px] text-lg text-danger">
                            <b>{item.Code}</b>
                          </div>

                          <div className="grow overflow-auto">

                            <div className="px-4 py-3 border-b border-dashed last:border-0">
                              <h5 className="text-[#999] font-sm mb-1.5">Bắt đầu - Kết thúc</h5>
                              <div className="font-medium">
                                {item?.EndDate === null
                                  ? "Không giới hạn"
                                  : `${moment(item?.BeginDate).format(
                                    "HH:mm DD/MM/YYYY",
                                  )} - ${moment(item?.EndDate).format(
                                    "HH:mm DD/MM/YYYY",
                                  )}`}
                              </div>
                            </div>
                            <div className="px-4 py-3 border-b border-dashed last:border-0">
                              <h5 className="text-[#999] font-sm mb-1.5">
                                {item?.ValueType === 2
                                  ? "Đồng giá"
                                  : "Giá trị giảm giá"}
                              </h5>
                              <div className="font-medium">
                                {item?.ValueType === 2 ? (
                                  <>
                                    {formatString.formatVND(
                                      item.Discount,
                                    )}{" "}
                                    VND
                                  </>
                                ) : (
                                  <>
                                    {item?.Discount > 100
                                      ? `${formatString.formatVND(
                                        item?.Discount,
                                      )} VND`
                                      : `${item?.Discount}%`}
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="px-4 py-3 border-b border-dashed last:border-0">
                              <h5 className="text-[#999] font-sm mb-1.5">Số lần sử dụng tối đa</h5>
                              <div className="font-medium">
                                {item?.MemberUseMax === -1
                                  ? "Không giới hạn"
                                  : item?.MemberUseMax}
                              </div>
                            </div>
                            <div className="px-4 py-3 border-b border-dashed last:border-0">
                              <h5 className="text-[#999] font-sm mb-1.5">
                                Giới hạn SL trên mỗi SP-DV / Giới hạn SL
                                SP-DV trên cả đơn hàng
                              </h5>
                              <div className="font-medium">
                                {item?.OrderItemQtyMax ||
                                  "Không giới hạn"}
                                <span style={{ padding: "0 3px" }}>
                                  /
                                </span>
                                {item?.OrderQtyMax || "Không giới hạn"}
                              </div>
                            </div>

                            <div className="px-4 py-3 border-b border-dashed last:border-0">

                              <h5 className="text-[#999] font-sm mb-1.5">Điều kiện áp dụng</h5>
                              <div className="font-medium">
                                {item.Apply === "NG"
                                  ? "Không áp dụng kèm chương trình ưu đãi."
                                  : "Áp dụng kèm chương trình ưu đãi."}
                                {item.ForCatesText && (
                                  <div>
                                    Nhóm :{" "}
                                    <span>{item.ForCatesText}</span>
                                  </div>
                                )}
                                {item.ForProdsText && (
                                  <div>
                                    Sản phẩm lẻ :{" "}
                                    <span>{item.ForProdsText}</span>
                                  </div>
                                )}

                                {item.MemberGroup?.Title && (
                                  <div>
                                    Nhóm khách hàng :{" "}
                                    <span>
                                      {item.MemberGroup?.Title}
                                    </span>
                                  </div>
                                )}
                              </div>

                            </div>

                            {item.VoucherMeta?.Perc !== 0 && (
                              <div className="px-4 py-3 border-b border-dashed last:border-0">

                                <h5 className="text-[#999] font-sm mb-1.5">Hoa hồng giới thiệu</h5>
                                <div className="font-medium">
                                  {item.VoucherMeta?.Perc < 0 ? (
                                    <>Tích điểm</>
                                  ) : (
                                    <>
                                      {item.VoucherMeta?.Perc > 100
                                        ? `${formatString.formatVND(
                                          item.VoucherMeta?.Perc,
                                        )}`
                                        : `${item.VoucherMeta?.Perc}%`}
                                    </>
                                  )}
                                </div>

                              </div>
                            )}
                            {item?.Desc && (
                              <div className="px-4 py-3 border-b border-dashed last:border-0">

                                <h5 className="text-[#999] font-sm mb-1.5">Mô tả</h5>
                                <div
                                  className="font-medium"
                                  dangerouslySetInnerHTML={{
                                    __html: item?.Desc.replaceAll(
                                      "\n",
                                      "<br />",
                                    ),
                                  }}
                                ></div>

                              </div>
                            )}

                          </div>
                        </div>
                      )}>
                        {({ open }) => (
                          <button
                            type="button"
                            onClick={open}
                            style={{
                              fontSize: 10,
                              color: "#059669",
                              fontWeight: 600,
                              marginTop: 2,
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              background: "transparent",
                              border: 0,
                              padding: 0,
                              cursor: "pointer",
                              justifyContent: "start",
                            }}
                          >
                            Chi tiết{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              data-lucide="chevron-right"
                              aria-hidden="true"
                              style={{ width: 12, height: 12 }}
                            >
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </button>
                        )}
                      </PickerView>
                    </div>
                  </div>
                  <div style={{ zIndex: 10, flexShrink: 0 }}>
                    <button
                      style={{
                        backgroundColor: "#4f46e5",
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: 10,
                        padding: "7px 14px",
                        borderRadius: 12,
                        border: 0,
                        transition: "all 150ms",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        onRegisterCode(item);
                      }}
                    >
                      ĐĂNG KÝ MÃ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {data?.MyCodes && data?.MyCodes.length > 0 && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "24px 0",
              }}
            >
              <div
                style={{
                  flexGrow: 1,
                  borderTop: "1px solid rgb(226 232 240)",
                }}
              />
              <span
                style={{
                  padding: "0 14px",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  color: "rgb(148 163 184)",
                  textTransform: "uppercase",
                }}
              >
                MÃ CHIA SẺ CỦA BẠN
              </span>
              <div
                style={{
                  flexGrow: 1,
                  borderTop: "1px solid rgb(226 232 240)",
                }}
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: 15 }}
            >
              {data?.MyCodes.map((item, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    background: "#fff",
                    border: "1px solid rgb(226 232 240)",
                    borderRadius: 16,
                    padding: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    overflow: "hidden",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 6,
                      background: "rgb(245 158 11)",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      paddingLeft: 8,
                      zIndex: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: "rgb(255 251 235)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid rgb(254 243 199)",
                        color: "rgb(217 119 6)",
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: 22, height: 22 }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                        <path d="M13 5v2" />
                        <path d="M13 17v2" />
                        <path d="M13 11v2" />
                      </svg>
                    </div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <h5
                          style={{
                            margin: 0,
                            fontSize: 16,
                            fontWeight: 800,
                            color: "rgb(15 23 42)",
                            letterSpacing: "0.025em",
                          }}
                        >
                          {item?.Code}
                        </h5>
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: "rgb(180 83 9)",
                            background: "rgb(254 243 199)",
                            padding: "2px 6px",
                            borderRadius: 4,
                          }}
                        >
                          {item?.ValueType === 2 ? "Đồng giá" : "Giảm tối đa"}{" "}
                          {item?.Discount > 100
                            ? formatString.formatVND(item?.Discount)
                            : `${item?.Discount}%`}
                        </span>
                      </div>
                      <p
                        style={{
                          margin: "2px 0 0",
                          fontSize: 11,
                          color: "rgb(100 116 139)",
                        }}
                      >
                        Hoa hồng giới thiệu:
                        {item.VoucherMeta?.Perc < 0 ? (
                          <>Tích điểm</>
                        ) : (
                          <>
                            {item.VoucherMeta?.Perc > 100
                              ? `${formatString.formatVND(
                                item.VoucherMeta?.Perc,
                              )}`
                              : `${item.VoucherMeta?.Perc}%`}
                          </>
                        )}
                      </p>
                      <PickerView Content={() => (
                        <div className="h-full flex flex-col">
                          <div className="p-4 border-b-[2px] text-lg text-danger">

                            <b>{item.Code}</b>

                          </div>
                          <div className="grow overflow-auto">

                            <div className="px-4 py-3 border-b border-dashed last:border-0">

                              <h5 className="text-[#999] font-sm mb-1.5">Bắt đầu - Kết thúc</h5>
                              <div className="font-medium">
                                {item?.EndDate === null
                                  ? "Không giới hạn"
                                  : `${moment(item?.BeginDate).format(
                                    "HH:mm DD/MM/YYYY",
                                  )} - ${moment(item?.EndDate).format(
                                    "HH:mm DD/MM/YYYY",
                                  )}`}
                              </div>

                            </div>
                            <div className="px-4 py-3 border-b border-dashed last:border-0">

                              <h5 className="text-[#999] font-sm mb-1.5">
                                {item?.ValueType === 2
                                  ? "Đồng giá"
                                  : "Giá trị giảm giá"}
                              </h5>
                              <div className="font-medium">
                                {item?.ValueType === 2 ? (
                                  <>
                                    {formatString.formatVND(item.Discount)}{" "}
                                    VND
                                  </>
                                ) : (
                                  <>
                                    {item?.Discount > 100
                                      ? `${formatString.formatVND(
                                        item?.Discount,
                                      )} VND`
                                      : `${item?.Discount}%`}
                                  </>
                                )}
                              </div>

                            </div>
                            <div className="px-4 py-3 border-b border-dashed last:border-0">

                              <h5 className="text-[#999] font-sm mb-1.5">Số lần sử dụng tối đa</h5>
                              <div className="font-medium">
                                {item?.MemberUseMax === -1
                                  ? "Không giới hạn"
                                  : item?.MemberUseMax}
                              </div>

                            </div>
                            <div className="px-4 py-3 border-b border-dashed last:border-0">

                              <h5 className="text-[#999] font-sm mb-1.5">
                                Giới hạn SL trên mỗi SP-DV / Giới hạn SL
                                SP-DV trên cả đơn hàng
                              </h5>
                              <div className="font-medium">
                                {item?.OrderItemQtyMax || "Không giới hạn"}
                                <span style={{ padding: "0 3px" }}>/</span>
                                {item?.OrderQtyMax || "Không giới hạn"}
                              </div>

                            </div>

                            <div className="px-4 py-3 border-b border-dashed last:border-0">

                              <h5 className="text-[#999] font-sm mb-1.5">Điều kiện áp dụng</h5>
                              <div className="font-medium">
                                {item.Apply === "NG"
                                  ? "Không áp dụng kèm chương trình ưu đãi."
                                  : "Áp dụng kèm chương trình ưu đãi."}
                                {item.ForCatesText && (
                                  <div>
                                    Nhóm : <span>{item.ForCatesText}</span>
                                  </div>
                                )}
                                {item.ForProdsText && (
                                  <div>
                                    Sản phẩm lẻ :{" "}
                                    <span>{item.ForProdsText}</span>
                                  </div>
                                )}

                                {item.MemberGroup?.Title && (
                                  <div>
                                    Nhóm khách hàng :{" "}
                                    <span>{item.MemberGroup?.Title}</span>
                                  </div>
                                )}

                              </div>
                            </div>

                            {item.VoucherMeta?.Perc !== 0 && (
                              <div className="px-4 py-3 border-b border-dashed last:border-0">

                                <h5 className="text-[#999] font-sm mb-1.5">Hoa hồng giới thiệu</h5>
                                <div className="font-medium">
                                  {item.VoucherMeta?.Perc < 0 ? (
                                    <>Tích điểm</>
                                  ) : (
                                    <>
                                      {item.VoucherMeta?.Perc > 100
                                        ? `${formatString.formatVND(
                                          item.VoucherMeta?.Perc,
                                        )}`
                                        : `${item.VoucherMeta?.Perc}%`}
                                    </>
                                  )}
                                </div>

                              </div>
                            )}
                            {item?.Desc && (
                              <div className="px-4 py-3 border-b border-dashed last:border-0">

                                <h5 className="text-[#999] font-sm mb-1.5">Mô tả</h5>
                                <div
                                  className="font-medium"
                                  dangerouslySetInnerHTML={{
                                    __html: item?.Desc.replaceAll(
                                      "\n",
                                      "<br />",
                                    ),
                                  }}
                                ></div>

                              </div>
                            )}

                          </div>
                        </div>
                      )}>
                        {({ open }) => (
                          <button
                            onClick={open}
                            type="button"
                            style={{
                              marginTop: 4,
                              padding: 0,
                              border: 0,
                              background: "transparent",
                              fontSize: 10,
                              color: "rgb(5 150 105)",
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              cursor: "pointer",
                              justifyContent: "start",
                            }}
                          >
                            Chi tiết mã ưu đãi
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ width: 14, height: 14 }}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </button>
                        )}
                      </PickerView>

                    </div>
                  </div>
                  <div style={{ zIndex: 10 }}>
                    <CopyToClipboard
                      text={item?.Code}
                      onCopy={() => {
                        openSnackbar({
                          text: "Đang Copy ...",
                          type: "countdown",
                          duration: 1000,
                          onClose: () => {
                            openSnackbar({
                              text: "Đã Copy",
                              type: "success",
                            });
                          },
                        });
                      }}
                    >
                      <button
                        style={{
                          background: "rgb(15 23 42)",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: 12,
                          padding: "10px 16px",
                          borderRadius: 12,
                          border: 0,
                          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          cursor: "pointer",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ width: 14, height: 14 }}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <rect
                            width={14}
                            height={14}
                            x={8}
                            y={8}
                            rx={2}
                            ry={2}
                          />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                        <span>COPY</span>
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
            </>
          )
        }
        
      </div>
    </Page>
  );
};

export default CustomerMemberAff;
