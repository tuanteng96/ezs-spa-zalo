import React, { useEffect, useRef, useState } from "react";
import { Icon, Page, Text, useSnackbar } from "zmp-ui";
import { toAbsolutePathAPI } from "../../utils/assetPath";
import { useMutation, useQuery } from "@tanstack/react-query";
import NewsAPI from "../../api/news.api";
import { useLayout } from "../../layout/LayoutProvider";
import moment from "moment";
import { formatArray } from "../../utils/formatArray";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useQueryParams } from "../../hook";
import { PrizePicker } from "./components";
import { useNavigate } from "react-router";
import axios from "axios";
import clsx from "clsx";

function SpinnerLoading({ size = 80, color = "#fff" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        animation: "spin 1s linear infinite",
      }}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="100"
        strokeDashoffset="60"
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </svg>
  );
}

function WinnerModal({ data, prize, onClose, params }) {
  useEffect(() => {
    if (prize) {
      // Tìm hoặc tạo canvas confetti
      let canvas = document.querySelector("canvas.confetti-canvas");
      if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.className = "confetti-canvas";
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "20000";
        document.body.appendChild(canvas);
      }

      const myConfetti = confetti.create(canvas, { resize: true });

      const interval = setInterval(() => {
        myConfetti({
          particleCount: 50,
          startVelocity: 40,
          spread: 70,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
        });
      }, 400); // mỗi 0.4s bắn 1 loạt

      // cleanup khi prize thay đổi hoặc về null
      return () => clearInterval(interval);
    }
  }, [prize]);

  return createPortal(
    <AnimatePresence>
      {Boolean(prize) && (
        <div>
          {/* Overlay */}
          <motion.div
            className="fixed w-full h-full top-0 left-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              zIndex: 10000,
              background: "rgb(0 0 0 / 40%)",
            }}
            onClick={onClose}
          />

          {/* Modal wrapper */}
          <motion.div
            className="fixed w-full h-full top-0 left-0 px-4 flex items-center justify-center overflow-hidden"
            style={{
              zIndex: 10001,
              "--color-bg": data?.color || "#d51e1e",
            }}
          >
            {/* Modal content */}
            <motion.div
              className="bg-white"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                x: [0, -10, 10, -6, 6, -2, 2, 0], // shake effect
              }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{
                opacity: { duration: 0.2 },
                scale: {
                  type: "spring",
                  duration: 0.8,
                  bounce: 0.3,
                },
                y: {
                  type: "spring",
                  duration: 0.8,
                  bounce: 0.3,
                },
                x: {
                  type: "tween",
                  duration: 0.6,
                  ease: "easeInOut",
                },
              }}
              style={{
                borderRadius: "0.5rem",
                padding: "1.25rem",
                position: "relative",
                maxWidth: "480px",
                width: "100%",
              }}
            >
              {/* Top banner */}
              <div
                className="absolute"
                style={{
                  width: "250px",
                  top: "-15px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: "10",
                }}
              >
                <img
                  src={toAbsolutePathAPI("/brand/minigame/assets/12/TOP.png")}
                  alt=""
                />
              </div>

              {/* Nội dung đỏ */}
              <div
                className="text-center text-white relative"
                style={{
                  background: "var(--color-bg)",
                  padding: "3rem 2.5rem 5rem 3rem",
                  borderRadius: "0.5rem 0.5rem 50% 50%",
                }}
              >
                <div className="mb-[8px]" style={{ padding: "0 2rem" }}>
                  <div className="relative flex justify-center">
                    <div
                      className="font-medium"
                      style={{
                        background: "var(--color-bg)",
                        padding: "0 0.75rem",
                        zIndex: "20",
                      }}
                    >
                      Bạn nhận được
                    </div>
                    <div
                      className="absolute w-full"
                      style={{
                        height: "1px",
                        background: "#fff",
                        bottom: "6px",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    textTransform: "uppercase",
                    fontWeight: "700",
                    lineHeight: "30px",
                  }}
                >
                  {prize?.option}
                </div>
                <div
                  className="absolute w-full text-center"
                  style={{
                    left: 0,
                    bottom: "2rem",
                    fontWeight: "500",
                  }}
                >
                  HSD :
                  <span className="pl-[5px]">
                    {moment(
                      data?.ExpiredDate || params?.EndDate,
                      "DD-MM-YYYY",
                      true
                    ).isValid()
                      ? moment(params?.EndDate, "DD-MM-YYYY")
                        .set({
                          hours: "23",
                          minutes: "59",
                        })
                        .format("DD-MM-YYYY")
                      : moment()
                        .set({
                          hours: "23",
                          minutes: "59",
                        })
                        .add(
                          Number(data?.ExpiredDate || params?.EndDate || 7),
                          "days"
                        )
                        .format("DD-MM-YYYY")}
                  </span>
                </div>
              </div>

              {/* Liên hệ */}
              <div
                className="text-center"
                style={{
                  padding: "2rem",
                  fontSize: "14px",
                }}
              >
                {data?.copyrightWinner}
              </div>

              {/* Nút Đóng */}
              <div
                onClick={onClose}
                className="absolute flex items-center justify-center text-white cursor-pointer fw-medium"
                style={{
                  width: "100px",
                  height: "48px",
                  background: "var(--color-bg)",
                  borderRadius: "9999px",
                  bottom: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                Đóng
              </div>

              {/* Trang trí trái */}
              <div
                style={{
                  width: "70px",
                  position: "absolute",
                  bottom: "-1.25rem",
                  left: "-25px",
                }}
              >
                <img
                  className="w-full"
                  src={toAbsolutePathAPI("/brand/minigame/assets/12/trai.png")}
                  alt=""
                />
              </div>

              {/* Trang trí phải */}
              <div
                style={{
                  width: "70px",
                  position: "absolute",
                  bottom: "-1.25rem",
                  right: "-25px",
                }}
              >
                <img
                  className="w-full"
                  src={toAbsolutePathAPI("/brand/minigame/assets/12/phai.png")}
                  alt=""
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById("app")
  );
}

const GiftPage = () => {
  const { Auth, CurrentStocks } = useLayout();
  const [open, setOpen] = useState(false);
  const [winnerPrize, setWinnerPrize] = useState(null);

  const navigate = useNavigate();

  const params = useQueryParams();

  const isShowingError = useRef(false);

  const { openSnackbar } = useSnackbar();

  const timeoutRef = useRef(null);

  const audioRef = useRef(
    typeof Audio !== "undefined"
      ? new Audio(
        toAbsolutePathAPI("/brand/minigame/assets/lucky-gift-box/mp3/gift.mp3")
      )
      : null
  );
  const winerSound = useRef(
    new Audio(
      toAbsolutePathAPI("/brand/minigame/assets/lucky-gift-box/mp3/gift-winner.mp3")
    )
  );

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["GiftJson"],
    queryFn: async () => {
      let rs = null;

      let { data: dataRs } = await NewsAPI.getNewsNameCate("Minigame");

      let newDataRs = dataRs.data
        ? dataRs.data.filter(
          (x) =>
            x?.source?.IsPublic &&
            (x?.source?.CateTitle === "Minigame" ||
              x?.source?.CateTitle2 === "Minigame")
        )
        : [];
      if (newDataRs && newDataRs.length > 0) {
        if (newDataRs[0].source?.Content) {
          rs = newDataRs[0].source?.Content
            ? {
              ...JSON.parse(newDataRs[0].source?.Content?.replace(/<[^>]*>/g, "")),
              Name: newDataRs[0]?.text.split(";")?.[2],
            }
            : null;
        }
      }
      if (!rs) {
        let { data } = await axios.get(
          toAbsolutePathAPI("/brand/minigame/assets/json/prize.json")
        );
        let { data: dataRs2 } = await NewsAPI.getBannerName(
          "APP.POPUP"
        );
        let Name = "";
        if (dataRs2?.data && dataRs2?.data.length > 0) {
          Name = dataRs2?.data[0]?.Title || "";
        }
        rs = { ...data, Name };
      }

      if (rs?.Name) {
        let reCheck = await NewsAPI.recheckContact({
          Title: rs?.Name,
          MemberID: Auth?.ID,
          BrowserId: Auth?.ID,
        });
        rs["contact"] = reCheck?.data?.contact || null;
      }

      return rs;
    },
    onSuccess: (data) => { },
  });

  const sendMutation = useMutation({
    mutationFn: async (body) => {
      let data = NewsAPI.sendContact(body);
      await refetch();
      if (window.refetchVQMM) {
        await window.refetchVQMM();
      }
      return data;
    },
  });

  const safePlay = (audio) => {
    if (!audio) {
      return;
    }
    audio.currentTime = 0;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.log("Không phát được audio:", err);
      });
    }
  };

  const openGift = () => {
    if (!data?.data) return;

    if (!data?.unlimitedTurns && data?.contact) {
      if (!isShowingError.current) {
        isShowingError.current = true;

        openSnackbar({
          text: "Bạn đã hết mở hộp quà.",
          type: "success",
          duration: 1500,
          onClose: () => {
            isShowingError.current = false;
          }
        });

      }
      return;
    }

    setOpen(true);

    safePlay(audioRef.current);

    let index = formatArray.getRandomItemByPercentage(
      data?.data,
      data?.data.map((item) => item.percentage)
    );

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setWinnerPrize(data?.data[index]);

      onSubmit(data?.data[index]);

      safePlay(winerSound.current);
    }, 1500);
  };

  const onSubmit = (values) => {
    sendMutation.mutate({
      contact: {
        Title: data?.Name,
        Fullname: Auth?.FullName || "",
        Phone1: Auth?.MobilePhone || "",
        Content: values?.option || "",
        MemberID: Auth?.ID || "",
        BrowserId: Auth?.ID,
        Status: "1",
        Type: "contact",
        StockID: CurrentStocks?.ID,
        DepartmentID: 22,
        EndDate: moment(
          data?.ExpiredDate || params.EndDate,
          "DD-MM-YYYY",
          true
        ).isValid()
          ? moment(data?.ExpiredDate || params.EndDate, "DD-MM-YYYY")
            .set({
              hours: "23",
              minutes: "59",
            })
            .format("HH:mm YYYY-MM-DD")
          : moment()
            .set({
              hours: "23",
              minutes: "59",
            })
            .add(Number(data?.ExpiredDate || params.EndDate || 7), "days")
            .format("HH:mm YYYY-MM-DD"),
      },
    });
  };

  return (
    <Page className="page !pt-0 !pb-0" hideScrollbar>
      <>
        <div className="navbar fixed top-0 left-0 min-w-[100vw] max-w-[100vw] z-[999] bg-white">
          <div className="w-2/3 relative flex items-center h-full pl-10">
            <div
              className="absolute left-0 w-10 h-full flex justify-center items-center cursor-pointer"
              onClick={() => {
                setOpen(false);
                setWinnerPrize(null);

                if (audioRef.current) {
                  audioRef.current.pause();
                  audioRef.current.currentTime = 0;
                }

                if (winerSound.current) {
                  winerSound.current.pause();
                  winerSound.current.currentTime = 0;
                }

                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                  timeoutRef.current = null;
                }
                navigate(-1)
              }
              }
            >
              <Icon icon="zi-chevron-left-header" className="text-app" />
            </div>
            <Text.Title className="text-app">Hộp quà may mắn</Text.Title>
          </div>
        </div>
        <div className="h-full pt-12">
          <div
            className="h-full flex flex-col relative"
          >
            <div
              className="h-full flex flex-col relative"
              style={{
                backgroundImage: `url(${toAbsolutePathAPI(
                  "/brand/minigame/assets/lucky-gift-box/bg.png"
                )})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundColor: "var(--ezs-color)",
                //background: background.moz,
                //background: background.webkit,
              }}
            >
              <div
                className="flex items-end relative"
                style={{
                  height: "42%",
                  alignItems: "end",
                  justifyContent: "center",
                }}
              >
                <div className={clsx("present", open && "open")} onClick={openGift}>
                  <div
                    className={clsx(
                      "absolute w-full bg-cover top-2/4 flex items-center justify-center"
                    )}
                    style={{
                      transform: open
                        ? "translate3d(0, -50%, 10px) rotateY(1080deg) rotateX(10deg)"
                        : "translate3d(0, -50%, 0) rotateY(0) rotateX(0)",
                      transition: "transform 2.5s cubic-bezier(0.22, 0.61, 0.36, 1)",
                      zIndex: open ? 10 : 0,
                    }}
                  >
                    <img
                      src={toAbsolutePathAPI(
                        "/brand/minigame/assets/lucky-gift-box/finish.png"
                      )}
                      alt=""
                      className={clsx("max-w-fit w-[230px] transition")}
                      style={{
                        maxWidth: "fit-content",
                        width: "230px",
                        transition: "all 300ms ease",
                        visibility: open ? "visible" : "invisible",
                        opacity: open ? 1 : 0,
                      }}
                    />
                  </div>

                  <div className="rotate-container">
                    <div className="bottom"></div>
                    <div className="front"></div>
                    <div className="left"></div>
                    <div className="back"></div>
                    <div className="right"></div>

                    <div className="lid">
                      <div className="lid-top"></div>
                      <div className="lid-front"></div>
                      <div className="lid-left"></div>
                      <div className="lid-back"></div>
                      <div className="lid-right"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="pb-safe"
                style={{
                  flexGrow: "1",
                }}
              >
                <div
                  style={{
                    paddingRight: "2.5rem",
                    paddingLeft: "1.75rem",
                    marginTop: "2.5rem",
                  }}
                >
                  <img
                    src={toAbsolutePathAPI(
                      "/brand/minigame/assets/lucky-gift-box/title.png"
                    )}
                    alt=""
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "15px",
                      lineHeight: "1.75rem",
                    }}
                    className="text-center text-white fw-500 text-[15px] leading-7"
                  >
                    <div>
                      Bấm
                      <span
                        style={{
                          fontSize: "1.5rem",
                          lineHeight: "1.5rem",
                        }}
                        className="text-2xl font-semibold pl-[3px]"
                      >
                        "Mở Hộp Quà"
                      </span>
                    </div>
                    <div>để tìm kiếm giải thưởng may mắn của bạn</div>
                  </div>
                  <div
                    className="text-center flex justify-center"
                    style={{
                      marginTop: "1rem",
                    }}
                  >
                    <button
                      style={{
                        background: "linear-gradient(to right,#1081e8,#f32177)",
                        fontSize: "16px",
                        textShadow:
                          "0 .1em 20px #a8237e,.05em -.03em 0 #1a64b9,.05em .005em 0 #1a64b9,0em .08em 0 #a8237e,.05em .08em 0 #a8237e,0px -.03em 0 #a8237e,-.03em -.03em 0 #a8237e,-.03em .08em 0 #a8237e,-.03em 0 0 #a8237e",
                        textTransform: "capitalize",
                        paddingTop: ".75rem",
                        paddingBottom: ".625rem",
                        padding: ".75rem 2rem .625rem 2rem",
                        borderRadius: "1.5rem",
                        width: "auto",
                        border: 0,
                        gap: ".5rem",
                      }}
                      className="text-white flex font-semibold btn-gift"
                      type="button"
                      onClick={openGift}
                    >
                      {!data?.unlimitedTurns && data?.contact ? (
                        <>
                          <span>Hết</span>
                          <span>lượt</span>
                          <span>mở!</span>
                        </>
                      ) : (
                        <>
                          <span>Mở</span>
                          <span>hộp</span>
                          <span>quà!</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <PrizePicker data={data?.data || []}>
                  {({ open }) => (
                    <div className="mt-[25px] flex justify-center">
                      <div
                        className="underline font-semibold text-white"
                        onClick={open}
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        Danh sách giải thưởng
                      </div>
                    </div>
                  )}
                </PrizePicker>
              </div>

              {!data?.unlimitedTurns && (
                <div className="text-center mb-15px text-white">
                  Khách hàng có
                  <span className="px-[5px]">{data?.contact ? "0" : "1"}</span>
                  lượt mở hộp quà.
                </div>
              )}
              {isLoading && (
                <div
                  style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgb(0 0 0 / 30%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9999,
                  }}
                >
                  <SpinnerLoading size={60} color="#fff" />
                </div>
              )}
            </div>
            <WinnerModal
              data={data}
              prize={winnerPrize}
              onClose={() => {
                setWinnerPrize(null);
                setOpen(false);

                winerSound.current.pause();
                winerSound.current.currentTime = 0;
              }}
              params={params}
            />
          </div>
        </div>
      </>
    </Page>
  )
}

export default GiftPage
