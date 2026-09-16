import React from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toAbsolutePath } from "../../../utils/assetPath";
import { useQuery } from "@tanstack/react-query";
import NewsAPI from "../../../api/news.api";
import { useLayout } from "../../../layout/LayoutProvider";
import http from "../../../utils/http";
import { getStorage } from "zmp-sdk";

window.PopUpVQMM = true

const PopupMinigame = () => {
  const { GlobalConfig, Auth } = useLayout();

  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getStorage({
      keys: ["_vqmm"],
      success: (data) => {
        let { _vqmm } = data;

        window.PopUpVQMM = _vqmm
      }
    })
  }, [])

  const { isLoading } = useQuery({
    queryKey: ["CheckMiniGame", { GlobalConfig, Auth }],
    queryFn: async () => {
      let { data } = await NewsAPI.getBannerName(
        "APP.POPUP"
      )

      if (GlobalConfig?.vong_quay_may_man) {
        let PrizeJson = await http.get(
          `/brand/minigame/assets/json/prize.json?` + new Date().getTime(),
        );

        if (data && data.data && data.data.length > 0) {
          if (
            (PrizeJson?.data?.unlimitedTurns
              ? !PrizeJson?.data?.unlimitedTurns
              : window.PopUpVQMM)
          ) {
            let { ID } = Auth;
            let res = data.data[0];
            NewsAPI
              .checkAuthenVQMM({
                Title: res?.Title || "",
                MemberID: ID || "",
              })
              .then(({ data }) => {
                setData(res);
                if (!data?.contact) {
                  setData(res);
                  setVisible(
                    f7.views.main.router?.currentRoute?.path?.includes(
                      "/vong-quay/",
                    ) ||
                      f7.views.main.router?.currentRoute?.path?.includes(
                        "/hop-qua-may-man/",
                      )
                      ? false
                      : true,
                  );
                } else {
                  localStorage.setItem("_vqmm", false);
                }
              });
          } else {
            setData(data.data[0]);
            setVisible(
              f7.views.main.router?.currentRoute?.path?.includes(
                "/vong-quay/",
              ) ||
                f7.views.main.router?.currentRoute?.path?.includes(
                  "/hop-qua-may-man/",
                )
                ? false
                : true,
            );
            localStorage.removeItem("_vqmm");
          }
        }
      }
      return data || [];
    },
    enabled: Number(Auth?.ID) > -1,
  })

  // window.refetchVQMM = checkVQMM;

  const onClose = () => {
    setVisible(false);
  };

  window.ClosePopupImages = onClose;

  const handleUrl = (item) => {
    // if (!item) {
    //   onClose();
    // } else {
    //   f7.views.main.router.navigate(item.Link);
    //   onClose();
    // }
  };

  if (!visible) return <></>;

  return createPortal(
    <div
      className="flex items-center justify-center"
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: "10000",
        top: 0,
        left: 0,
      }}
    >
      <div className="fixed w-full h-full top-0 left-0" style={{
        zIndex: 10000,
        background: "rgb(0 0 0 / 40%)",
      }} onClick={onClose}></div>
      <div
        style={{
          position: "relative",
          zIndex: "120000",
          maxWidth: "75%",
        }}
        onClick={() => handleUrl(data)}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{
            cursor: "pointer",
            userSelect: "none",
            lineHeight: 40,
            height: 30,
            width: 30,
            display: "flex",
            WebkitBoxAlign: "center",
            alignItems: "center",
            WebkitBoxPack: "center",
            justifyContent: "center",
            position: "absolute",
            boxSizing: "border-box",
            background: "rgb(239, 239, 239)",
            top: "-10px",
            right: "-10px",
            borderRadius: 20,
            border: "3px solid rgb(239, 239, 239)",
          }}
        >
          <svg
            viewBox="0 0 16 16"
            stroke="#EE4D2D"
            style={{
              width: "16px",
              height: "16px",
              stroke: "rgba(0, 0, 0, 0.5)",
              strokeWidth: "2px",
            }}
          >
            <path strokeLinecap="round" d="M1.1,1.1L15.2,15.2" />
            <path strokeLinecap="round" d="M15,1L0.9,15.1" />
          </svg>
        </div>
        {/* <img
          className="w-100"
          src={toAbsolutePath("/Upload/image/" + data.FileName)}
          alt={data.Title}
        /> */}
      </div>
    </div>,
    document.getElementById("app"),
  );
}

export { PopupMinigame };