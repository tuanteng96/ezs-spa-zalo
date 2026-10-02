import React, { useState, forwardRef, useImperativeHandle, useRef} from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { createPortal } from "react-dom";
import {  Icon, Page,  Text, useNavigate, useSnackbar } from "zmp-ui";
import { AnimatePresence, motion } from "framer-motion";

const PickerOTP = forwardRef(function PickerOTP(
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
                      Mã OTP định danh của bạn
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
                  <div
                      className="flex items-center gap-3 justify-center"
                    >
                      {content.split("").map((x,index) => <div key={index} className="w-12 h-12 rounded border flex items-center justify-center font-semibold text-[18px]">{x}</div>)}
                    </div>
                    <div className="flex justify-center mt-10">
                  <CopyToClipboard
                    text={content}
                    onCopy={() => {
                      openSnackbar({
                        text: "Đã Copy !",
                        type: "success",
                      })
                      close()
                    }}
                  >
                    <button type="button" className="h-12 inline-flex items-center justify-center px-4 bg-app text-white rounded-[25px]">Copy và đóng</button>

                  </CopyToClipboard>
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

export default PickerOTP;