import React, { useState } from "react";
import { Icon, Page } from "zmp-ui";
import PullToRefresh from "react-simple-pull-to-refresh";
import { Follow } from "./components/follow";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useLayout } from "../../layout/LayoutProvider";
import { SalesServiceGoBeauty } from "./components/sale-service-gobeauty";
import { NewsGoBeauty } from "./components/newsGoBeauty";
import { formatString } from "../../utils/formatString";
import AuthAPI from "../../api/auth.api";
import moment from "moment";
import { NavLink, useNavigate } from "react-router-dom";
import GoTreatmentCard from "./components/GoTreatmentCard";
import GoVoucher from "./components/GoVoucher";

const HomePage = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { onOpenActionStocks, CurrentStocks, Auth, GlobalConfig } = useLayout();

  const { data, refetch } = useQuery({
    queryKey: ["TopMemberBook", Auth],
    queryFn: async () => {
      const { data } = await AuthAPI.getTopMemberBook({ data: null, AccessToken: Auth?.token });

      return data?.lst
        ? data?.lst.reduce((closest, current) => {
          if (!closest) return current;

          const currentDiff = Math.abs(
            moment(current.BookDate).diff(moment()),
          );

          const closestDiff = Math.abs(
            moment(closest.BookDate).diff(moment()),
          );

          return currentDiff < closestDiff ? current : closest;
        }, null)
        : null
    },
    enabled: Auth?.ID > 0
  });

  const handleRefresh = async () => {
    await refetch()
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["GoTreatmentCard"] }),
      queryClient.invalidateQueries({ queryKey: ["GoVoucher"] }),
      queryClient.invalidateQueries({ queryKey: ["NewsGoBeauty"] }),
      queryClient.invalidateQueries({ queryKey: ["AdvBannerSALE"] }),
    ])


  }
  const checkMember = () => {
    if (!Auth) return "Khách mới";
    if (Auth.acc_type === "M") {
      return Auth.acc_group > 0
        ? Auth.MemberGroups[0].Title
        : "Thành viên";
    }
    if (Auth.ID === 1) {
      return "ADMIN";
    }
    if (Auth.acc_type === "U" && Auth.GroupTitles.length > 0) {
      return Auth.GroupTitles.join(", ");
    }
  }


  return (
    <Page className="page !pt-0" hideScrollbar>
      <PullToRefresh className="ezs-ptr ezs-ptr-safe" onRefresh={handleRefresh}>
        <div
          className="h-full overflow-auto no-scrollbar"
        >
          <div
            className="bg-app"
            style={{
              background: "var(--ezs-color)!important",
              clipPath: "ellipse(90% 100% at 50% 0%)",
              height: "175px",
            }}
          >
            <div className="flex px-3 py-4 text-white max-w-[65%]">
              <div className="flex items-end gap-1 pt-safe" onClick={() => { !GlobalConfig?.APP?.khong_thay_doi_cs && onOpenActionStocks() }}>
                <div>
                  <MapPinIcon className="w-5" />
                </div>
                <div className="uppercase font-semibold text-[13px] leading-4">{CurrentStocks?.Title || "Bạn đang ở ?"}</div>
                <div>
                  <ChevronDownIcon className="w-4" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="px-4" style={{ marginTop: "-70px" }} onClick={() => {
              if (!Auth?.ID) {
                navigate(`/?fromProtected=/`)
              }
            }}>
              <div
                className="relative p-[20px] text-white"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px",
                  borderRadius: "1.5rem",
                  backgroundImage:
                    "linear-gradient(to right, var(--ezs-color), rgb(253, 184, 194))",
                  overflow: "hidden"
                }}
              >
                <div className="font-medium mb-3 text-[13px]">Chào mừng trở lại,</div>
                <div className="font-semibold leading-8" style={{ fontSize: 25 }}>
                  {Auth?.FullName || "Guest"}
                </div>
                <div className="flex items-center mt-4 text-[13px]" style={{ gap: "0.75rem" }}>
                  <div
                    className="flex items-center font-semibold"
                    style={{
                      backdropFilter: "blur(15px)",
                      background: "rgba(255, 255, 255, 0.2)",
                      borderRadius: 9999,
                      gap: "0.25rem",
                      padding: "4px 12px"
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={12}
                      height={12}
                      viewBox="0 0 24 24"
                      fill="white"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-star"
                      aria-hidden="true"
                    >
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                    </svg>
                    {checkMember()}
                  </div>
                  <div>| {Auth?.Present?.points || 0} điểm tích lũy</div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    color: "rgba(255, 255, 255, 0.1)",
                    transform: "rotate(12deg)",
                    right: "-10px",
                    bottom: "-10px",
                    overflow: "hidden",
                    pointerEvents: "none"
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={128}
                    height={128}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                    <path d="M20 3v4" />
                    <path d="M22 5h-4" />
                    <path d="M4 17v2" />
                    <path d="M5 18H3" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 px-3 py-4">
              {
                !GlobalConfig?.ZALO?.VisibleCheckOutSDK && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, minmax(0px, 1fr))",
                      gap: 12
                    }}
                  >
                    <NavLink
                      to="/user/customer-wallet-card"
                      state={{ returnTo: "/" }}
                      className="bg-white flex justify-center items-center flex-col text-center"
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                        borderRadius: 16,
                        border: "1px solid rgb(255, 241, 242)",
                        padding: "12px 5px"
                      }}
                    >
                      <div
                        className="mb-[12px] flex items-center justify-center"

                        style={{
                          width: 38,
                          height: 38,
                          background: "rgb(255, 228, 230)",
                          color: "rgb(244, 63, 94)",
                          borderRadius: "100%"
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-credit-card text-rose-500"
                          aria-hidden="true"
                        >
                          <rect width={20} height={14} x={2} y={5} rx={2} />
                          <line x1={2} x2={22} y1={10} y2={10} />
                        </svg>
                      </div>
                      <div
                        className="uppercase font-semibold"
                        href="/wallet/"
                        style={{ fontSize: 10, color: "rgb(107, 114, 128)" }}
                      >
                        Số dư ví
                      </div>
                      <div className="mt-[2px] font-bold text-[14px]" style={{ color: "rgb(225, 29, 72)" }}>
                        {formatString.formatVND(Auth?.Present?.nap_vi)}
                      </div>
                    </NavLink>
                    <NavLink
                      className="bg-white flex items-center justify-center text-center flex-col"
                      to="/user/customer-wallet-card?Type=Card"
                      state={{ returnTo: "/" }}
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                        borderRadius: 16,
                        border: "1px solid rgb(255, 241, 242)",
                        padding: "12px 5px"
                      }}
                    >
                      <div
                        className="mb-[12px] flex items-center justify-center"
                        style={{
                          width: 38,
                          height: 38,
                          background: "rgb(209, 250, 229)",
                          color: "rgb(16, 185, 129)",
                          borderRadius: "100%"
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-wallet text-emerald-500"
                          aria-hidden="true"
                        >
                          <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                          <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                        </svg>
                      </div>
                      <div
                        className="uppercase font-semibold"
                        style={{ fontSize: 10, color: "rgb(107, 114, 128)" }}
                      >
                        Thẻ tiền
                      </div>
                      <div className="mt-[2px] font-bold text-[14px]" style={{ color: "rgb(5, 150, 105)" }}>
                        {formatString.formatVND(Auth?.Present?.the_tien_kha_dung)}
                      </div>
                    </NavLink>
                    <NavLink
                      className="bg-white flex items-center justify-center flex-col text-center"
                      to="/user/customer-booking-manage"
                      state={{ returnTo: "/" }}
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                        borderRadius: 16,
                        border: "1px solid rgb(255, 241, 242)",
                        padding: "12px 5px"
                      }}
                    >
                      <div
                        className="mb-[12px] flex items-center justify-center"
                        style={{
                          width: 38,
                          height: 38,
                          background: "rgb(255, 237, 213)",
                          color: "rgb(249, 115, 22)",
                          borderRadius: "100%"
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-clock text-orange-500"
                          aria-hidden="true"
                        >
                          <circle cx={12} cy={12} r={10} />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      </div>
                      <div
                        className="uppercase font-semibold"
                        style={{ fontSize: 10, color: "rgb(107, 114, 128)" }}
                      >
                        Lịch hẹn
                      </div>
                      <div className="mt-[2px] font-bold text-[14px]" style={{ color: "rgb(234, 88, 12)" }}>
                        {data?.BookDate
                          ? moment(data?.BookDate).format("DD/MM")
                          : "N/A"}
                      </div>
                    </NavLink>
                  </div>
                )
              }

              <GoTreatmentCard />
              <SalesServiceGoBeauty />
              <NewsGoBeauty />
              <GoVoucher />
            </div>
          </div>

        </div>
      </PullToRefresh>
      <Follow />
    </Page>
  );
};

export default HomePage;
