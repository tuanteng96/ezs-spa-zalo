import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import AuthAPI from "../../../api/auth.api";
import { useLayout } from "../../../layout/LayoutProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import CopyToClipboard from "react-copy-to-clipboard";
import { formatString } from "../../../utils/formatString";
import { checkDateDiff } from "../../../utils/date";
import { useSnackbar } from "zmp-ui";

function GoVoucher(props) {
  let { Auth } = useLayout();

  const { openSnackbar } = useSnackbar();

  let { data, isLoading } = useQuery({
    queryKey: ["GoVoucher"],
    queryFn: async () => {
      let { data } = await AuthAPI.getVoucher({
        MemberID: Auth?.ID,
        AccessToken: Auth?.token
      });

      return {
        VoucherAll: data?.data?.danh_sach || [],
        contactMiniGame: data?.data?.contactMiniGame
          ? data?.data?.contactMiniGame.filter((x) => x.Status !== 3)
          : [],
      };
    },
    enabled: Auth?.ID > 0
  });

  if (!Auth?.ID || (!isLoading && (!data?.VoucherAll || data?.VoucherAll.length === 0))) {
    return <></>;
  }

  return (
    <div>
      <div className="flex justify-between mb-3">
        <div className="uppercase font-bold">Kho Voucher</div>
        <NavLink
          className="font-semibold text-[13px]"
          to="/user/customer-voucher"
          style={{ color: "var(--ezs-color)" }}
        >
          Xem tất cả
        </NavLink>
      </div>
      <div>
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={15}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}>
          {data?.VoucherAll?.map((item, index) => (
            <SwiperSlide
              style={{
                width: "80%"
              }}
              key={index}
            >
              <div
                className="bg-white flex"
                style={{
                  background: "#fff",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                }}
              >
                <div
                  className="relative flex items-center justify-center"
                  style={{
                    width: "0.75rem",
                    borderRight: "1px dashed #e5e7eb",
                    background: "#fb7185",
                  }}
                >
                  <div
                    className="absolute bg-white"
                    style={{
                      top: "-0.375rem",
                      right: "-0.375rem",
                      width: "0.75rem",
                      height: "0.75rem",
                      borderRadius: "9999px",
                    }}
                  ></div>
                  <div
                    className="absolute bg-white"
                    style={{
                      bottom: "-0.375rem",
                      right: "-0.375rem",
                      width: "0.75rem",
                      height: "0.75rem",
                      borderRadius: "9999px",
                    }}
                  ></div>
                </div>
                <div className="flex-1 p-3">
                  <div
                    className="font-bold flex"
                    style={{
                      color: "var(--ezs-color)",
                      fontSize: "16px",
                      gap: "5px",
                    }}
                  >
                    {item?.Voucher?.Title &&
                      item?.Voucher?.Title.toUpperCase().indexOf("ĐỔI QUÀ") >
                      -1 ? (
                      <span>Đổi Quà</span>
                    ) : (
                      <span>Mã</span>
                    )}
                    <span>{item.ma}</span>
                  </div>
                  <div className="mt-[2px]">
                    {item?.Voucher?.ValueType === 2 ? (
                      <>
                        Đồng giá {formatString.formatVND(item.gia_tri.Tien)} VND
                      </>
                    ) : (
                      <>
                        Giảm tối đa{" "}
                        {item?.Voucher?.Discount > 100
                          ? `${formatString.formatVND(
                            item?.Voucher?.Discount,
                          )} VND`
                          : `${item?.Voucher?.Discount}%`}
                      </>
                    )}
                  </div>
                  <div
                    className="flex justify-between items-center mt-2.5"
                    style={{
                      gap: "16px",
                    }}
                  >
                    <div
                      className="flex-1 font-medium"
                      style={{
                        color: "#9ca3af",
                        fontSize: "13px",
                      }}
                    >
                      HSD :{" "}
                      {item.ngay === null ? (
                        "Không giới hạn"
                      ) : (
                        <>
                          Còn{" "}
                          <b>
                            {checkDateDiff(item.ngay.To) === 0
                              ? "1"
                              : checkDateDiff(item.ngay.To)}
                          </b>{" "}
                          ngày
                        </>
                      )}
                    </div>
                    <div>
                      <CopyToClipboard
                        text={item.ma}
                        onCopy={() => {
                          openSnackbar({
                            text: "Copy mã thành công !",
                            type: "success",
                          });
                        }}
                      >
                        <button
                          className="text-white font-semibold"
                          style={{
                            boxShadow:
                              "0 4px 6px -1px #fecdd3, 0 2px 4px -2px #fecdd3",
                            background: "#f43f5e",
                            borderRadius: "0.5rem",
                            border: "none",
                            padding: "0.475rem 0.75rem",
                          }}
                          type="button"
                        >
                          Dùng ngay
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
}

export default GoVoucher;
