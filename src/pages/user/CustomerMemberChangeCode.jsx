import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useState, forwardRef, useImperativeHandle, useRef} from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { createPortal } from "react-dom";
import {  Icon, Page,  Text, useNavigate, useSnackbar } from "zmp-ui";
import AuthAPI from "../../api/auth.api";
import { useLayout } from "../../layout/LayoutProvider";
import { formatString } from "../../utils/formatString";
import { AnimatePresence, motion } from "framer-motion";

const PickerAlertCode = forwardRef(function PickerAlertCode(
  { children },
  ref,
) {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(null);

  const { openSnackbar } = useSnackbar();

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
        <AnimatePresence initial={false}>
          {visible && (
            <div
              className="fixed w-full h-full top-0 left-0 flex items-end"
              style={{
                zIndex: 5001,
              }}
            >
              <motion.div
                key={visible}
                className="absolute w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
                style={{
                  background: "rgb(0 0 0 / 0.4)",
                  backdropFilter: "blur(4px)",
                }}
              ></motion.div>
              <motion.div
                className="w-full relative flex flex-col bg-white pb-safe"
                initial={{ opacity: 0, translateY: "100%" }}
                animate={{ opacity: 1, translateY: "0%" }}
                exit={{ opacity: 0, translateY: "100%" }}
                style={{
                  boxShadow: "0 -10px 40px rgba(0,0,0,0.15)",
                  borderTopLeftRadius: "32px",
                  borderTopRightRadius: "32px",
                }}
              >
                <div>
                  <div className="pt-[15px] pb-[8px] flex justify-center">
                    <div
                      onClick={close}
                      className="w-12 h-[6px]"
                      style={{
                        background: "#e5e7eb",
                        borderRadius: "9999px",
                      }}
                    ></div>
                  </div>
                  <div
                    className="flex justify-between items-center"
                    style={{
                      padding: "12px 24px",
                    }}
                  >
                    <div
                      className="font-medium"
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
                  className="flex-col"
                  style={{
                    padding: "12px 24px 24px 24px",
                    gap: "20px",
                    display: "inline-flex",
                  }}
                >
                  <CopyToClipboard
                    text={content?.Vcode}
                    onCopy={() => {
                      openSnackbar({
                        text: "Đã Copy !",
                        type: "success",
                      })
                    }}
                  >
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 600,
                        color: "#f54242",
                        gap: "10px",
                      }}
                      className="flex items-center"
                    >
                      {content?.Vcode}
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                          />
                        </svg>
                      </div>
                    </div>
                  </CopyToClipboard>
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
                          {formatString.formatVND(content?.Code?.Discount)} VND
                        </>
                      ) : (
                        <>
                          Giảm tối đa{" "}
                          {content?.Code?.Discount > 100
                            ? `${formatString.formatVND(
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
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.getElementById("app"),
      )}
    </>
  );
});

const CustomerMemberChangeCode = () => {
  const navigate = useNavigate();
  const { Auth } = useLayout();

  const pickerAlertCodeRef = useRef("");

  const [code, setCode] = useState("")

  const { openSnackbar, closeSnackbar } = useSnackbar();

  const onRecheck = () => {
    openSnackbar({
      type: "loading",
      text: "Đang thực hiện, vui lòng đợi...",
    });

    AuthAPI.recheckVoucher({
      code,
      AccessToken: Auth?.token
    }).then((rs) => {
      console.log(code)
      console.log(rs)
      let isExpired = false;

      if (rs?.data?.voucher?.EndDate) {
        isExpired = moment().isAfter(moment(rs?.data?.voucher?.EndDate));
      }

      if (
        rs?.data?.voucher?.MemberID > 0 &&
        rs?.data?.voucher?.VoucherMeta?.Perc !== 0 &&
        !isExpired
      ) {
        if (
          Number(rs?.data?.voucher?.MemberID) === -1 ||
          Number(rs?.data?.voucher?.MemberID) === Number(Auth?.ID)
        ) {
          openSnackbar({
            text: "Mã quà tặng không hợp lệ.",
            type: "error",
          })
          return;
        }
        AuthAPI.getVoucherReCheck({
          Code: code,
          MemberID: rs?.data?.voucher?.MemberID,
          CrMemberID: Auth?.ID,
        }).then((lst) => {
          setCode("")
          pickerAlertCodeRef.current?.open({
            Code: rs?.data?.voucher,
            Vcode: lst?.data?.vcard,
            AccessToken: Auth?.token
          });
          closeSnackbar();
        });
      } else {
        openSnackbar({
          text: "Mã không hợp lệ hoặc đã hết hạn.",
          type: "error",
        })
      }
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
          <Text.Title className="text-app">Đổi mã quà tặng</Text.Title>
        </div>
      </div>
      <div className="h-full border-t p-4 flex flex-col overflow-auto gap-4">
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

            {}
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
                  value={code}
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
                    fontSize: "15px",
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
            >
              <span style={{ fontSize: "11px" }}>✨</span>
              <span>KHÁM PHÁ QUÀ TẶNG</span>
              <span style={{ fontSize: "11px" }}>✨</span>
            </button>
          </div>
      </div>
      <PickerAlertCode ref={pickerAlertCodeRef} />
    </Page>
  );
};

export default CustomerMemberChangeCode;
