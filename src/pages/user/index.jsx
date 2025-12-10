import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Icon, Page, Text, Modal, useSnackbar } from "zmp-ui";
import { useLayout } from "../../layout/LayoutProvider";
import { useConfigs } from "../../layout/MasterLayout";
import { toAbsolutePath } from "../../utils/assetPath";
import { formatString } from "../../utils/formatString";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import ProtectedNavLink from "../../layout/_core/ProtectedNavLink";
import ConfigsAPI from "../../api/configs.api";
import { useQuery } from "@tanstack/react-query";
import AuthAPI from "../../api/auth.api";

const UserPage = () => {
  const { Auth, onLogout, GlobalConfig } = useLayout();
  const { ZaloInfo } = useConfigs();
  const navigate = useNavigate();

  const { openSnackbar } = useSnackbar();

  const [dialogVisible, setDialogVisible] = useState(false);

  const { pathname } = useLocation();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["MemberCheckGroups", Auth?.ID],
    queryFn: async () => {

      let groupTitles = "";

      let isCheck = false;
      let Configs = await ConfigsAPI.getNames("autogroup_config");
      if (Configs?.data?.data && Configs?.data?.data.length > 0) {
        let JsonConfigs = Configs?.data?.data[0]?.Value
          ? JSON.parse(Configs?.data?.data[0]?.Value)
          : null;
        if (JsonConfigs && !JsonConfigs?.thoi_gian_tinh) {
          isCheck = true;
        }
      }

      if (isCheck) {
        let MemberGroups = await AuthAPI.getMemberGroups({
          cmd: "get",
          "(filter)StockID": Auth?.ByStockID,
          sort: "[Point] desc",
          Pi: 1,
          Ps: 100,
        });

        if (
          MemberGroups?.data?.data?.list &&
          MemberGroups?.data?.data?.list.length > 0
        ) {
          let ToPay = 0;
          if (
            Auth?.Present?.cashSum &&
            Auth?.Present?.cashSum.length > 0
          ) {
            ToPay = Number(Auth.Present.cashSum[0].Payed || 0);
          }

          if (Auth.acc_group && Number(Auth.acc_group) > 0) {
            let newMemberGroups = [
              ...(MemberGroups?.data?.data?.list || []),
            ].sort((a, b) => Number(a.Point) - Number(b.Point));

            let currentGroup = newMemberGroups.find(
              (item) => Number(item.ID) === Number(Auth.acc_group)
            );

            if (currentGroup) {
              let nextGroup = newMemberGroups.find(
                (item) => Number(item.Point) > Number(currentGroup.Point)
              );

              if (nextGroup) {
                groupTitles = `Chi tiêu thêm <span class="text-danger font-semibold">${formatString.formatVND(
                  nextGroup.Point - ToPay, ''
                )} <span class="fw-medium">đ</span></span> </br> để đạt cấp <span class="font-semibold">${nextGroup.Title
                  }</span>.`;
              } else {
                groupTitles = `Bạn đã đạt cấp <span class="font-medium">${currentGroup.Title}</span>.`;
              }
            }
          }
        }
      }
      return groupTitles;
    },
    enabled: Boolean(Number(Auth?.ID) && !GlobalConfig?.Admin?.an_sap_len_cap),
  });

  return (
    <Page className="page" hideScrollbar>
      <div className="navbar fixed top-0 left-0 min-w-[100vw] max-w-[100vw] z-[999] transition px-3 bg-app">
        <div className="w-2/3 relative flex items-center h-full">
          <Text.Title className="text-white truncate transition">
            Hồ sơ
          </Text.Title>
        </div>
      </div>
      <div className="p-4">
        {!Auth?.ID && (
          <div
            className="mb-2.5"
            onClick={() => navigate(`${pathname}?fromProtected=${pathname}`)}
          >
            <div className="bg-app/90 text-white p-4 rounded-lg relative z-[1]">
              <div className="text-[16px] font-semibold">Đăng nhập thành viên</div>
              <div className="text-[13px] mt-1">
                Đặt lịch, quản lý đặt lịch & thẻ dịch vụ, đặt hàng ...{" "}
              </div>
              <div className="absolute right-[20px] top-2/4 rounded-full bg-app flex justify-center w-12 h-12 -z-[1] -translate-y-2/4 skew-y-[20deg]">
                <CurrencyDollarIcon className="w-8 text-white opacity-40" />
              </div>
              <div className="absolute right-[80px] top-2/4 rounded-full bg-app flex justify-center w-6 h-6 -z-[1] -translate-y-2/4 skew-y-[10deg]">
                <CurrencyDollarIcon className="w-6 text-white opacity-40" />
              </div>
            </div>
          </div>
        )}
        {Auth?.ID && (
          <div className="mb-2.5">
            <div className="bg-white rounded-lg p-4">
              <NavLink to="/user/profile" className="flex items-center">
                <div className="w-12">
                  <img
                    className="shadow-3xl rounded-full w-full"
                    src={
                      Auth?.Photo || Auth?.Avatar
                        ? toAbsolutePath(Auth?.Photo || Auth?.Avatar)
                        : ZaloInfo?.avatar
                    }
                  />
                </div>
                <div className="pl-3 flex-1">
                  <div className="text-[16px] font-medium leading-6">
                    {Auth?.FullName}
                  </div>
                  <div className="text-gray-700 text-[14px]">
                    {formatString.getGroupsName(Auth)}
                  </div>
                </div>
                <div className="w-12 h-12 flex items-center justify-center text-app">
                  <Icon icon="zi-edit-text" />
                </div>
              </NavLink>
              {data && (
                <NavLink
                  to="/user/customer-member-group"
                  className="pt-3.5 mt-3.5 relative text-black flex justify-between items-center"
                >
                  <div
                    className="absolute h-[1px] right-0 top-0"
                    style={{
                      background: "#f0f4f7",
                      width: "calc(100% - 50px)",
                    }}
                  ></div>

                  <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{
                      __html: data,
                    }}
                  ></div>
                  <div
                    className="flex items-center text-muted"
                  >
                    <Icon icon="zi-chevron-right" />
                  </div>
                </NavLink>
              )}
            </div>
          </div>
        )}

        <div className="rounded-lg bg-white p-4 mb-4 text-sm">
          <ProtectedNavLink to="/checkin">
            {({ onClick }) => (
              <div
                className="flex items-center justify-between cursor-pointer border-b last:border-0 pb-3.5 mb-3.5 last:pb-0 last:mb-0"
                onClick={onClick}
              >
                <div className="font-medium">QR định danh</div>
                <div className="text-muted">
                  <Icon icon="zi-chevron-right" />
                </div>
              </div>
            )}
          </ProtectedNavLink>
          <ProtectedNavLink to="/user/customer-rating">
            {({ onClick }) => (
              <div
                className="flex items-center justify-between cursor-pointer border-b last:border-0 pb-3.5 mb-3.5 last:pb-0 last:mb-0"
                onClick={onClick}
              >
                <div className="font-medium">Đánh giá dịch vụ</div>
                <div className="text-muted">
                  <Icon icon="zi-chevron-right" />
                </div>
              </div>
            )}
          </ProtectedNavLink>
        </div>

        <div className="mb-4">
          <div className="mb-1 font-semibold text-gray-400 text-[12px]">Tài khoản</div>
          <div className="bg-white rounded-lg p-4 text-sm">
            <ProtectedNavLink to="/user/customer-wallet-card">
              {({ onClick }) => (
                <div
                  className="flex items-center justify-between cursor-pointer border-b last:border-0 pb-3.5 mb-3.5 last:pb-0 last:mb-0"
                  onClick={onClick}
                >
                  <div className="font-medium">Ví điện tử</div>
                  <div className="text-muted flex items-center gap-1">
                    {Auth && Auth?.Present?.nap_vi ? <div className="text-danger font-medium">{formatString.formatVND(Auth?.Present?.nap_vi, '')}</div> : <></>}
                    <Icon icon="zi-chevron-right" />
                  </div>
                </div>
              )}
            </ProtectedNavLink>
            <ProtectedNavLink to="/user/customer-wallet-card?Type=Card">
              {({ onClick }) => (
                <div
                  className="flex items-center justify-between cursor-pointer border-b last:border-0 pb-3.5 mb-3.5 last:pb-0 last:mb-0"
                  onClick={onClick}
                >
                  <div className="font-medium">Thẻ tiền trả trước</div>
                  <div className="text-muted flex items-center gap-1">
                    {Auth && Auth?.Present?.the_tien_kha_dung ? <div className="text-danger font-medium">{formatString.formatVND(Auth?.Present?.the_tien_kha_dung, '')}</div> : <></>}
                    <Icon icon="zi-chevron-right" />
                  </div>
                </div>
              )}
            </ProtectedNavLink>
            <ProtectedNavLink to="/user/customer-points-change">
              {({ onClick }) => (
                <div
                  className="flex items-center justify-between cursor-pointer border-b last:border-0 pb-3.5 mb-3.5 last:pb-0 last:mb-0"
                  onClick={onClick}
                >
                  <div className="font-medium">Tích điểm đổi quà</div>
                  <div className="text-muted flex items-center gap-1">
                    {Auth && Auth?.Present?.points ? <div className="text-danger font-medium">{formatString.formatVND(Auth?.Present?.points, '')}</div> : <></>}
                    <Icon icon="zi-chevron-right" />
                  </div>
                </div>
              )}
            </ProtectedNavLink>
            <ProtectedNavLink to="/user/customer-voucher">
              {({ onClick }) => (
                <div
                  className="flex items-center justify-between cursor-pointer border-b last:border-0 pb-3.5 mb-3.5 last:pb-0 last:mb-0"
                  onClick={onClick}
                >
                  <div className="font-medium">Mã Voucher ưu đãi</div>
                  <div className="text-muted ">
                    <Icon icon="zi-chevron-right" />
                  </div>
                </div>
              )}
            </ProtectedNavLink>
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-1 font-semibold text-gray-400 text-[12px]">Quản lý</div>
          <div className="bg-white rounded-lg p-4 text-sm">
            <ProtectedNavLink to="/user/customer-history-service">
              {({ onClick }) => (
                <div
                  className="flex items-center justify-between cursor-pointer border-b last:border-0 pb-3.5 mb-3.5 last:pb-0 last:mb-0"
                  onClick={onClick}
                >
                  <div className="font-medium">Lịch sử sử dụng dịch vụ</div>
                  <div className="text-muted ">
                    <Icon icon="zi-chevron-right" />
                  </div>
                </div>
              )}
            </ProtectedNavLink>
            <ProtectedNavLink to="/user/customer-service">
              {({ onClick }) => (
                <div
                  className="flex items-center justify-between cursor-pointer border-b last:border-0 pb-3.5 mb-3.5 last:pb-0 last:mb-0"
                  onClick={onClick}
                >
                  <div className="font-medium">Thẻ liệu trình</div>
                  <div className="text-muted ">
                    <Icon icon="zi-chevron-right" />
                  </div>
                </div>
              )}
            </ProtectedNavLink>
            <ProtectedNavLink to="/user/customer-orders">
              {({ onClick }) => (
                <div
                  className="flex items-center justify-between cursor-pointer border-b last:border-0 pb-3.5 mb-3.5 last:pb-0 last:mb-0"
                  onClick={onClick}
                >
                  <div className="font-medium">Đơn hàng - Công nợ</div>
                  <div className="text-muted ">
                    <Icon icon="zi-chevron-right" />
                  </div>
                </div>
              )}
            </ProtectedNavLink>
            <ProtectedNavLink to="/user/customer-booking-manage">
              {({ onClick }) => (
                <div
                  className="flex items-center justify-between cursor-pointer border-b last:border-0 pb-3.5 mb-3.5 last:pb-0 last:mb-0"
                  onClick={onClick}
                >
                  <div className="font-medium">Quản lý đặt lịch</div>
                  <div className="text-muted ">
                    <Icon icon="zi-chevron-right" />
                  </div>
                </div>
              )}
            </ProtectedNavLink>
          </div>
        </div>

        <div>
          <div className="mb-1 font-semibold text-gray-400 text-[12px]">Khác</div>
          <div className="bg-white rounded-lg p-4 text-sm">
            <ProtectedNavLink to="/user/customer-diary">
              {({ onClick }) => (
                <div
                  className="flex items-center justify-between cursor-pointer border-b last:border-0 pb-3.5 mb-3.5 last:pb-0 last:mb-0"
                  onClick={onClick}
                >
                  <div className="font-medium">Nhật ký khách hàng</div>
                  <div className="text-muted ">
                    <Icon icon="zi-chevron-right" />
                  </div>
                </div>
              )}
            </ProtectedNavLink>
            <ProtectedNavLink to="/user/customer-affs">
              {({ onClick }) => (
                <div
                  className="flex items-center justify-between cursor-pointer border-b last:border-0 pb-3.5 mb-3.5 last:pb-0 last:mb-0"
                  onClick={onClick}
                >
                  <div className="font-medium">Người giới thiệu</div>
                  <div className="text-muted ">
                    <Icon icon="zi-chevron-right" />
                  </div>
                </div>
              )}
            </ProtectedNavLink>
            <NavLink to="/user/customer-branch">
              <div
                className="flex items-center justify-between cursor-pointer border-b last:border-0 pb-3.5 mb-3.5 last:pb-0 last:mb-0"
              >
                <div className="font-medium">Hệ thống cơ sở - Liên hệ</div>
                <div className="text-muted ">
                  <Icon icon="zi-chevron-right" />
                </div>
              </div>
            </NavLink>
          </div>
        </div>

        {Auth?.ID && (
          <div className="bg-white mt-2.5 rounded-lg">
            <div
              className="flex justify-between px-3 py-4 items-center border-b cursor-pointer"
              onClick={() => {
                setDialogVisible(true)
                //onLogout()
              }}
            >
              <div className="font-medium text-danger">Đăng xuất tài khoản</div>
              <div className="text-danger">
                <Icon icon="zi-chevron-right" />
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal
        visible={dialogVisible}
        title="Thông báo"
        onClose={() => {
          setDialogVisible(false);
        }}
        actions={[
          {
            text: "Đóng",
            close: true,
          },
          {
            text: "Đăng xuất",
            //close: true,
            highLight: true,
            onClick: () => {
              onLogout(() => {
                openSnackbar({
                  text: "Đăng xuất thành công.",
                  type: "success",
                });
                setDialogVisible(false)
              })
            }
          },
        ]}
        description="Bạn muốn thực hiện đang xuất tài khoản ?"
      />
    </Page>
  );
};
export default UserPage;
