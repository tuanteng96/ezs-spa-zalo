
import moment from "moment";
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import { Icon, Page, Text, useNavigate, useSnackbar } from "zmp-ui";
import { useLayout } from "../../layout/LayoutProvider";
import { useMutation } from "@tanstack/react-query";
import CartAPI from "../../api/cart.api";
import { createPortal } from "react-dom";


const PickerAlertCode = forwardRef(function PickerAlertCode(
  { children, Options, handleUrl },
  ref,
) {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(null);

  const renderChild = Array.isArray(children)
    ? children.find((child) => typeof child === "function")
    : typeof children === "function"
      ? children
      : null;

  let open = (v) => {
    setContent(v);
    setVisible(true);
  };

  let close = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <>
      {renderChild ? renderChild({ open, close }) : null}
      {createPortal(
        <>
          {visible && (
            <div
              className="fixed w-full h-full top-0 left-0 flex flex-col items-center justify-end"
              style={{
                zIndex: 5001,
              }}
            >
              <div
                className="absolute w-full h-full"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  animation: "fadeIn .25s ease forwards",
                }}
                onClick={close}

              ></div>
              <div
                className="relative flex flex-col bg-white w-full"
                style={{
                  boxShadow: "0 -10px 40px rgba(0,0,0,0.15)",
                  borderTopLeftRadius: "32px",
                  borderTopRightRadius: "32px",
                  animation: "slideUp .3s cubic-bezier(.22,1,.36,1) forwards",
                }}
              >
                <div>
                  <div className="pt-15px pb-8px d--f jc--c">
                    <div
                      onClick={close}
                      className="w-48px h-6px"
                      style={{
                        background: "#e5e7eb",
                        borderRadius: "9999px",
                      }}
                    ></div>
                  </div>
                  <div
                    className="flex items-center justify-between"
                    style={{
                      padding: "20px 24px",
                    }}
                  >
                    <div
                      className="font-semibold uppercase"
                      style={{
                        fontSize: "18px",
                      }}
                    >
                      Mã của bạn
                    </div>
                    <div
                      onClick={close}
                      className="flex items-center justify-center"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "100%",
                        background: "#f3f4f6",
                        color: "#6b7280",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-[20px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div
                  className="d--f fd--c"
                  style={{
                    padding: "12px 24px 24px 24px",
                    gap: "20px",
                  }}
                >
                  <div
                    className="mb-8"
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "#f54242",
                    }}
                  >
                    {content?.Vcode}
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      lineHeight: "25px",
                      fontStyle: "italic",
                    }}
                  >
                    <div>
                      Hạn sử dụng:{" "}
                      {content?.Code?.EndDate
                        ? moment(content?.Code?.EndDate).format(
                          "HH:mm DD/MM/YYYY",
                        )
                        : "Không giới hạn"}
                    </div>
                    <div>
                      Giá trị :{" "}
                      {content?.Code?.ValueType === 2 ? (
                        <>
                          Đồng giá{" "}
                          {formatPriceVietnamese(content?.Code?.Discount)} VND
                        </>
                      ) : (
                        <>
                          Giảm tối đa{" "}
                          {content?.Code?.Discount > 100
                            ? `${formatPriceVietnamese(
                              content?.Code?.Discount,
                            )} VND`
                            : `${content?.Code?.Discount}%`}
                        </>
                      )}
                    </div>
                    {content?.Code?.Desc && (
                      <div>Nội dung: {content?.Code?.Desc}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>,
        document.body,
      )}
    </>
  );
});

const CustomerVoucherChange = () => {
  const navigate = useNavigate();
  const { Auth, AccessToken } = useLayout();

  const { openSnackbar } = useSnackbar();

  const pickerAlertCodeRef = useRef(null)

  const [Code, setCode] = useState("");

  const recheckMutation = useMutation({
    mutationFn: async (body) => {
      let result = null;
      let rs = await CartAPI.recheckVoucher(body);
      let isExpired = false;
      if (rs?.data?.EndDate) {
        isExpired = moment().isAfter(moment(rs?.data?.EndDate));
      }
      if (
        rs?.data?.MemberID > 0 &&
        rs?.data?.VoucherMeta?.Perc > 0 &&
        !isExpired
      ) {
        result = await CartAPI.getVoucherReCheck({
          Code,
          MemberID: rs?.data?.MemberID,
          CrMemberID: Auth?.ID,
          Token: AccessToken
        });

        result = {
          ...result,
          data: {
            ...rs?.data,
            ...(result?.data || {})
          }
        }
      } else {
        result = {
          error: "Mã không hợp lệ hoặc đã hết hạn."
        }
      }
      return result
    },
  });

  const onRecheck = () => {
    recheckMutation.mutate({
      Code,
      Token: AccessToken
    }, {
      onSuccess: (rs) => {
        if (rs?.error) {
          openSnackbar({
            text: rs.error,
            type: "error",
            duration: 2000,
          });
        }
        else {
          setCode("")
          pickerAlertCodeRef.current?.open?.({
            Code: rs?.data,
            Vcode: rs?.data?.vcard,
          })
        }
      }
    })
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
          <Text.Title className="text-app">Đổi mã quà tặng</Text.Title>
        </div>
      </div>
      <PullToRefresh className="ezs-ptr">
        <div className="h-full no-scrollbar overflow-auto">
          <div className="p-4">
            <div
              className="p-20px"
              style={{
                boxSizing: "border-box",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "#FFF2F4",
                  border: "1px solid #FFE3E6",
                  borderRadius: "24px",
                  padding: "1.5rem",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(255,93,117,0.08)",
                    marginBottom: "1rem",
                  }}
                >
                  <svg
                    viewBox="0 0 100 100"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="25"
                      y="42"
                      width="50"
                      height="42"
                      rx="6"
                      fill="#F9C334"
                    />
                    <rect
                      x="21"
                      y="32"
                      width="58"
                      height="12"
                      rx="3"
                      fill="#FED85E"
                    />
                    <rect x="46" y="32" width="8" height="52" fill="#E13A3E" />
                    <rect x="21" y="36" width="58" height="4" fill="#E13A3E" />
                    <path
                      d="M50 32C42 22 34 24 36 29C38 34 46 32 50 32Z"
                      fill="#F44336"
                    />
                    <path
                      d="M50 32C58 22 66 24 64 29C62 34 54 32 50 32Z"
                      fill="#F44336"
                    />
                    <circle cx="50" cy="32" r="4.5" fill="#C62828" />
                  </svg>
                </div>

                <h2
                  style={{
                    color: "#E25151",
                    fontWeight: 800,
                    fontSize: "16px",
                    letterSpacing: "0.025em",
                    textTransform: "uppercase",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  KÍCH HOẠT KHO BÁU QUÀ TẶNG
                </h2>

                <p
                  style={{
                    color: "#7D8590",
                    fontSize: "12px",
                    lineHeight: 1.625,
                    maxWidth: "270px",
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  Nhập mã giới thiệu của bạn ngay để rinh ngay quà khủng!
                </p>
              </div>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "-9px",
                    left: "1.25rem",
                    zIndex: 10,
                    backgroundColor: "#FC6B7B",
                    color: "white",
                    fontSize: "9px",
                    fontWeight: 800,
                    padding: "0.125rem 0.625rem",
                    borderRadius: "6px",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  GIFTCODE
                </div>

                <div
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #ECEFF3",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.01)",
                    position: "relative",
                    paddingTop: "10px",
                    borderRadius: "18px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.125rem",
                      userSelect: "none",
                      lineHeight: 1,
                      position: "absolute",
                      left: "20px",
                      top: "24px",
                    }}
                  >
                    🪄
                  </span>

                  <input
                    value={Code}
                    onChange={(e) => {
                      setCode(e.target.value)
                    }}
                    type="text"
                    className="custom-input"
                    placeholder="VUI LÒNG NHẬP MÃ VÀO ĐÂY..."
                    style={{
                      width: "100%",
                      backgroundColor: "transparent",
                      outline: "none",
                      border: "none",
                      color: "#1e293b",
                      fontWeight: 700,
                      letterSpacing: "0.025em",
                      fontSize: "14px",
                      textTransform: "uppercase",
                      height: "50px",
                      padding: "15px 15px 15px 55px",
                    }}
                    autoComplete="off"
                  />
                </div>
              </div>
              <button
                type="button"
                className="custom-btn"
                style={{
                  width: "100%",
                  padding: "1rem 0",
                  borderRadius: "18px",
                  color: "white",
                  fontWeight: 800,
                  fontSize: "14px",
                  letterSpacing: "0.05em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: "0 6px 20px rgba(254,87,112,0.25)",
                  background:
                    "linear-gradient(to right, #FE5770, #FF7F4B, #FCB812)",
                  transition: "transform 0.15s ease",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
                onClick={onRecheck}
                disabled={recheckMutation.isLoading}
              >
                <span style={{ fontSize: "11px" }}>✨</span>
                <span>{recheckMutation.isLoading ? "Đang thực hiện ..." : "KHÁM PHÁ QUÀ TẶNG"}</span>
                <span style={{ fontSize: "11px" }}>✨</span>
              </button>
            </div>
          </div>
        </div>
      </PullToRefresh>

      <PickerAlertCode ref={pickerAlertCodeRef} />
    </Page>
  );
};

export default CustomerVoucherChange;
