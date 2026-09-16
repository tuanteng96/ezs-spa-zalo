import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { NavLink } from "react-router-dom";
import AuthAPI from "../../../api/auth.api";
import { useLayout } from "../../../layout/LayoutProvider";

function GoTreatmentCard(props) {
  let { Auth } = useLayout();

  let { data, isLoading } = useQuery({
    queryKey: ["GoTreatmentCard"],
    queryFn: async () => {
      let { data } = await AuthAPI.getTopOrderService({
        data: "",
        AccessToken: Auth?.token
      });

      return data?.lst || [];
    },
    enabled: Auth?.ID > 0
  });

  if (!Auth?.ID || (!isLoading && (!data || data.length === 0))) {
    return <></>;
  }
  return (
    <div>
      <div className="flex justify-between mb-3">
        <div className="uppercase font-bold">Liệu trình của bạn</div>
        <NavLink
          className="font-semibold text-[13px]"
          to="/user/customer-service"
          style={{ color: "var(--ezs-color)" }}
        >
          Xem tất cả
        </NavLink>
      </div>
      <div className="flex flex-col" style={{ gap: 12 }}>
        {
          data && data.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-3"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                borderRadius: 12,
                border: "1px solid rgb(255, 241, 242)",
                gap: 12
              }}
            >
              <div className="flex-1">
                <div className="mb-[3px] text-[13px]">
                  <div className="font-semibold">{item?.OrderTitle}</div>
                  {
                    item?.IsWarrant > 0 && (
                      <div className="font-medium" style={{ color: "rgb(249, 115, 23)" }}>
                        (Bảo hành)
                      </div>
                    )
                  }

                </div>
                <div style={{ color: "rgb(156, 163, 175)", fontSize: 12 }}>
                  {item?.LastDone ? (
                    <>Lần cuối: {moment(item?.LastDone).format("DD/MM/YYYY")}</>
                  ) : (
                    <>Chưa sử dụng</>
                  )}
                </div>
              </div>
              <div style={{ width: 80 }}>
                <div
                  className="text-right mb-[5px]"
                  style={{ color: "rgb(156, 163, 175)", fontSize: 12 }}
                >
                  <b style={{ fontSize: 16, color: "var(--ezs-color)" }}>{item.Done}</b>/{item.Total} buổi
                </div>
                <div
                  className="w-full relative overflow-hidden"
                  style={{
                    height: 6,
                    background: "rgb(243, 244, 246)",
                    borderRadius: 9999
                  }}
                >
                  <div
                    className="top-0 left-0"
                    style={{
                      position: "absolute",
                      width: `${(item.Done / item.Total) * 100}%`,
                      height: "100%",
                      background: "var(--ezs-color)"
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  );
}

export default GoTreatmentCard;