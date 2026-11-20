
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useInfiniteQuery, useIsMutating, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink, useSearchParams } from "react-router-dom";
import PullToRefresh from "react-simple-pull-to-refresh";
import { openWebview } from "zmp-sdk";
import { Button, Modal, Page, Sheet, Text, useNavigate, useSnackbar } from "zmp-ui";
import AuthAPI from "../../api/auth.api";
import { useLayout } from "../../layout/LayoutProvider";
import { toAbsolutePath, toAbsolutePathAPI } from "../../utils/assetPath";

import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { formatString } from "../../utils/formatString";
import RewardStar from "./components/RewardStar";
import { getPointHistory, rewardNumber, useStarExchange } from "./rewardHistory";

const checkImageProduct = (src) => {
  if (src === "null.gif" || src === "") {
    return toAbsolutePathAPI("/app2021/images/no-product.png");
  } else {
    return toAbsolutePath(src);
  }
};

const serializeVoucherIds = (value) => {
  if (Array.isArray(value)) return value.map((item) => item.ID).join(",");
  return typeof value === "string" ? value : "";
};

const PickerViewPoint = ({ children, data, unit, unavailable, insufficient, onRedeemed }) => {
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const submitting = useRef(false);

  const { Auth } = useLayout();
  const { openSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const close = () => {
    if (!submitting.current) setVisible(false);
  };

  const changeMutation = useMutation({
    mutationKey: ["RedeemReward"],
    mutationFn: async (body) => {
      const { data } = await AuthAPI.changePointVoucher(body);
      if (!data?.mp) {
        throw new Error(data?.error || `Không đủ ${unit} để đổi quà`);
      }
    },
    onSuccess: async () => {
      setConfirmVisible(false);
      setVisible(false);
      onRedeemed();
      await Promise.all(
        ["PointsVoucher", "Points", "RewardPointBalance", "StarExchange", "VouchersList", "MemberCheckGroups", "Authen"]
          .map((key) => queryClient.invalidateQueries({ queryKey: [key] }))
      );
    },
    onError: (error) => {
      setConfirmVisible(false);
      openSnackbar({
        text: error.response?.data?.error || (error.isAxiosError
          ? "Đổi quà không thành công. Vui lòng thử lại."
          : error.message),
        type: "error",
      });
    },
    onSettled: () => {
      submitting.current = false;
    },
  });

  const onChange = () => {
    if (unavailable || insufficient || submitting.current) return;
    submitting.current = true;
    changeMutation.mutate({
      MemberID: Auth?.ID,
      GiftID: data.ID,
      Voucher: data.Data ? {
        ...data.Data,
        Desc: `Đổi ${unit} (${data.Point || 0})`,
        ForCates: serializeVoucherIds(data.Data.ForCates),
        ForProds: serializeVoucherIds(data.Data.ForProds),
      } : null,
    });
  };

  return <>
    {children({
      open: () => setVisible(true),
      close: close,
    })}
    {createPortal(
      <Sheet visible={visible} onClose={close} height="90%" unmountOnClose>
        <div
          className="flex flex-col h-[calc(100%-24px)]"
        >
          <div className="p-4 grow overflow-auto overscroll-contain">
            <div>
              <button
                type="button"
                aria-label="Phóng to ảnh quà"
                className="block w-full"
                onClick={() => {
                  Fancybox.show(
                    [
                      {
                        src: checkImageProduct(data?.Photo),
                        thumbSrc: checkImageProduct(data?.Photo),
                      },
                    ],
                    {
                      Carousel: {
                        Toolbar: {
                          items: {
                            downloadImage: {
                              tpl: '<button class="f-button"><svg tabindex="-1" width="24" height="24" viewBox="0 0 24 24"><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"></path></svg></button>',
                              click: () => {
                                openWebview(checkImageProduct(data?.Photo));
                              },
                            },
                          },
                          display: {
                            left: ["counter"],
                            middle: [
                              "zoomIn",
                              "zoomOut",
                              // "toggle1to1",
                              "rotateCCW",
                              "rotateCW",
                              // "flipX",
                              // "flipY",
                            ],
                            right: [
                              "downloadImage",
                              //"thumbs",
                              "close",
                            ],
                          },
                        },
                      },
                      startIndex: 0, //index
                    }
                  );
                }}
              >
                <img className="w-full rounded" src={checkImageProduct(data?.Photo)} alt="" />
              </button>
            </div>
            <div className="pt-4">
              <div
                className="pb-3 mb-3"
                style={{
                  borderBottom: "1px solid #eeeeee",
                }}
              >
                <div
                  className="font-semibold mb-[5px] uppercase"
                  style={{
                    fontSize: "15px",
                  }}
                >
                  {data?.Title}
                </div>
                <div className="text-danger font-semibold">
                  {data?.Point} {unit === "sao" ? <RewardStar /> : unit}
                </div>
              </div>
              <div
                className="content_"
                dangerouslySetInnerHTML={{
                  __html: formatString.fixedContentDomain(data?.Desc),
                }}
                style={{
                  fontSize: "15px",
                  lineHeight: "24px",
                  color: "#3c3c3c",
                }}
              ></div>
              <div
                className="content_"
                dangerouslySetInnerHTML={{
                  __html: formatString.fixedContentDomain(data.Detail),
                }}
                style={{
                  fontSize: "15px",
                  lineHeight: "24px",
                  color: "#3c3c3c",
                }}
              ></div>
            </div>
          </div>
          <div className="p-4 border-t flex gap-3">
            <button type="button" aria-label="Đóng chi tiết quà" className="w-12 flex items-center justify-center border rounded-lg" onClick={close}>
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            <Button
              onClick={() => setConfirmVisible(true)}
              fullWidth
              className="!rounded-lg !bg-app disabled:!text-white disabled:opacity-60 flex-1"
              disabled={unavailable || insufficient || changeMutation.isLoading}
              loading={changeMutation.isLoading}
            >
              {insufficient ? `Không đủ ${unit}` : "Đổi quà"}
            </Button>
          </div>
        </div>
      </Sheet>,
      document.body,
    )}
    {confirmVisible && createPortal(
      <Modal
        visible
        zIndex={1100}
        maskStyle={{ zIndex: 1099 }}
        title="Xác nhận đổi quà"
        description={`Bạn muốn đổi voucher “${data.Title}” với ${data.Point} ${unit}?`}
        onClose={() => {
          if (!submitting.current) setConfirmVisible(false);
        }}
        actions={[
          { text: "Hủy", close: true, disabled: changeMutation.isLoading },
          { text: "Đổi quà", highLight: true, onClick: onChange, loading: changeMutation.isLoading, disabled: unavailable || insufficient || changeMutation.isLoading },
        ]}
      />,
      document.body,
    )}
  </>
}

const CustomerPointsChange = () => {
  const navigate = useNavigate();
  const { Auth, AccessToken } = useLayout();
  const [searchParams, setSearchParams] = useSearchParams();
  const isStars = searchParams.get("Sao") === "1";
  const unit = isStars ? "sao" : "điểm";
  const [redeemed, setRedeemed] = useState(false);
  const isRedeeming = useIsMutating({ mutationKey: ["RedeemReward"] }) > 0;
  const MemberID = Auth?.ID;
  const enabled = Number(MemberID) > 0 && !!AccessToken;

  const { data, fetchNextPage, isLoading, isError, hasNextPage, isFetching, refetch } =
    useInfiniteQuery({
      queryKey: ["PointsVoucher", MemberID, AccessToken, isStars],
      queryFn: async ({ pageParam = 1 }) => {
        const { data } = await AuthAPI.getPointsVoucher({
          Token: AccessToken,
          Pi: pageParam,
          Ps: 20,
          Type: isStars ? "1" : "",
        });
        if (data?.error) throw new Error(data.error);
        return data ?? {};
      },
      getNextPageParam: (lastPage, pages) => {
        const page = Number(lastPage.pi) || pages.length;
        const count = lastPage.pcount ?? Math.ceil(Number(lastPage.total) / 20);
        return page < count ? page + 1 : undefined;
      },
      enabled,
    });

  const points = useQuery({
    queryKey: ["RewardPointBalance", MemberID, AccessToken],
    queryFn: () => getPointHistory({ MemberID, Token: AccessToken }),
    select: (data) => data.TotalPoint ?? null,
    enabled: enabled && !isStars,
  });
  const stars = useStarExchange({ MemberID, Token: AccessToken, enabled: enabled && isStars });
  const balance = isStars ? stars : {
    total: points.data,
    isLoading: points.isLoading,
    isError: points.isError,
    refetch: points.refetch,
  };
  const total = balance.total;
  const refresh = () => Promise.all([refetch(), balance.refetch()]);
  const items = data?.pages.flatMap((page) => page.items ?? []) ?? [];
  const List = [...new Map(items.map((item) => [item.ID, item])).values()];

  return (
    <Page className="page !pb-safe-bottom" hideScrollbar>
      <div className="navbar fixed top-0 left-0 min-w-[100vw] max-w-[100vw] z-[999] bg-white border-b">
        <div className="relative flex items-center h-full pl-10 pr-4">
          <button
            type="button"
            aria-label="Quay lại"
            className="absolute left-0 w-10 h-full flex justify-center items-center cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
          </button>
          <Text.Title className="text-gray-900">Tích điểm đổi quà</Text.Title>
        </div>
      </div>
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-2 shrink-0 bg-white border-b" role="group" aria-label="Loại quà">
          {["điểm", "sao"].map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={unit === option}
              className={`min-h-[44px] px-2 border-b-2 text-sm font-medium ${unit === option ? "border-app text-gray-900" : "border-transparent text-gray-700"}`}
              onClick={() => setSearchParams((current) => {
                const next = new URLSearchParams(current);
                if (option === "sao") next.set("Sao", "1");
                else next.delete("Sao");
                return next;
              }, { replace: true })}
            >
              Tích {option} đổi quà
            </button>
          ))}
        </div>
        <div className="min-h-[48px] shrink-0 bg-white flex flex-wrap gap-x-3 px-4 py-2 justify-between items-center border-b">
          <div aria-live="polite">
            Tổng <span className="font-semibold tabular-nums">{balance.isLoading ? "…" : total == null ? "—" : rewardNumber.format(total)}</span> {isStars ? <RewardStar /> : unit}
          </div>
          <NavLink className="text-blue-700" to={`/user/customer-points${isStars ? "?Sao=1" : ""}`}>Xem lịch sử</NavLink>
        </div>
        {balance.isError && (
          <div className="shrink-0 bg-white px-4 py-2 border-b" role="status">
            Không tải được số dư.{" "}
            <button type="button" onClick={balance.refetch} className="text-primary underline">Thử lại</button>
          </div>
        )}
        <div className="min-h-0 flex-1">
          {isLoading && (
            <>
              {Array(4)
                .fill()
                .map((_, index) => (
                  <div className="bg-white p-4 border-b animate-pulse" key={index}>
                    <div className="flex justify-between mb-3">
                      <div className="h-3 bg-gray-200 w-32 rounded-lg"></div>
                      <div className="h-3 bg-gray-200 w-12 rounded-lg"></div>
                    </div>
                    <div>
                      <div>
                        <div className="h-3 bg-gray-200 w-full mb-2 rounded-lg"></div>
                        <div className="h-3 bg-gray-200 w-32 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
          {!isLoading && (
            <PullToRefresh key={unit} className="ezs-ptr" onRefresh={refresh}>
              <div className="h-full overflow-auto no-scrollbar" id="scrollablePoints">
                {isError && (
                  <div className="px-4 py-8 text-center" role="status">
                    Không tải được danh sách quà.{" "}
                    <button type="button" className="text-primary underline" onClick={() => refetch()}>Thử lại</button>
                  </div>
                )}
                {!isError && List.length === 0 && (
                  <div className="flex flex-col items-center px-5 py-12">
                    <svg
                      className="w-16 mb-5"
                      viewBox="0 0 56 60"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fillRule="evenodd">
                        <path
                          d="M1 14c-.55228475 0-1-.4477153-1-1s.44771525-1 1-1h42c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1H1zM15 22c-.5522847 0-1-.4477153-1-1s.4477153-1 1-1h22c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1H15zM17 6c-.5522847 0-1-.44771525-1-1s.4477153-1 1-1h10c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1H17zM13 10c-.5522847 0-1-.44771525-1-1s.4477153-1 1-1h18c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1H13zM36 8h7c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1h-8c-.5522847 0-1-.44771525-1-1V1c0-.55228475.4477153-1 1-1s1 .44771525 1 1v7zM7 24c-.55228475 0-1-.4477153-1-1v-4c0-.5522847.44771525-1 1-1h4c.5522847 0 1 .4477153 1 1v4c0 .5522847-.4477153 1-1 1H7zm1-2h2v-2H8v2zM15 30c-.5522847 0-1-.4477153-1-1s.4477153-1 1-1h6.052c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1H15zM7 32c-.55228475 0-1-.4477153-1-1v-4c0-.5522847.44771525-1 1-1h4c.5522847 0 1 .4477153 1 1v4c0 .5522847-.4477153 1-1 1H7zm1-2h2v-2H8v2zM15 38c-.5522847 0-1-.4477153-1-1s.4477153-1 1-1h4c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1h-4zM7 40c-.55228475 0-1-.4477153-1-1v-4c0-.5522847.44771525-1 1-1h4c.5522847 0 1 .4477153 1 1v4c0 .5522847-.4477153 1-1 1H7zm1-2h2v-2H8v2zM15 46c-.5522847 0-1-.4477153-1-1s.4477153-1 1-1h7.624c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1H15zM7 48c-.55228475 0-1-.4477153-1-1v-4c0-.5522847.44771525-1 1-1h4c.5522847 0 1 .4477153 1 1v4c0 .5522847-.4477153 1-1 1H7zm1-2h2v-2H8v2zM50.4161068 57.3851932c.8194757.8194757 2.1493107.8194757 2.9690786-.000292.8200861-.819409.8200861-2.1487934-.0003531-2.9685554l-5.8009391-5.801939c-.8194757-.8194757-2.1493107-.8194757-2.9687864 0-.8204757.8204757-.8204757 2.1493107 0 2.9697864l5.801 5.801zm-1.4142136 1.4142136l-5.801-5.801c-1.6015243-1.6015243-1.6015243-4.1966893 0-5.7982136 1.6005243-1.6005243 4.1966893-1.6005243 5.7972745.000061l5.8006469 5.801647c1.6019139 1.600591 1.6019139 4.1972066.0002922 5.7975056-1.6005243 1.6005243-4.1966893 1.6005243-5.7972136 0z"
                          fillRule="nonzero"
                        />
                        <path
                          d="M44.2767682 49.0854427c-.0796855.1431637-.1409432.2915959-.1839798.4449137-.2066214.7360886-1.129285.9774606-1.6698952.4368504l-3.071-3.071c-.4227588-.4227589-.3825419-1.1195578.0860482-1.4908709.7296849-.5782061 1.3890884-1.2376096 1.9672945-1.9672945.3713131-.4685901 1.068112-.508807 1.4908709-.0860482l3.071 3.071c.5409662.5409663.298863 1.4642816-.4379449 1.6702017-.1524408.0426036-.299632.1034181-.4698447.1976596-.0184888.0094983-.0184888.0094983-.0310432.015818-.1740347.1024444-.3053389.2007059-.4131672.3085343-.1052752.1052752-.2029509.2352593-.2975553.3920191-.0189673.0378655-.0189673.0378655-.0407833.0782168zm.7492923-.7780213c-.0150164.0082337-.0150277.0082399-.0041919.0024769a3.21566785 3.21566785 0 0 1 .0041919-.0024769zm-3.4977824-2.0632569l1.3399831 1.3399832c.1030122-.1362829.2127271-.2632496.332632-.3831545.1205479-.1205479.2483304-.2309889.3829023-.3328841l-1.339731-1.3397311c-.2299487.2471101-.4686764.4858378-.7157864.7157865zm.9945169 1.8804997l.0060477-.0112071a4.15519983 4.15519983 0 0 0-.004591.0082705l-.0014567.0029366z"
                          fillRule="nonzero"
                        />
                        <path
                          d="M2 54.0002h39c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1H1c-.55228475 0-1-.4477153-1-1v-54c0-.55228475.44771525-1 1-1h34c.2652165 0 .5195704.10535684.7071068.29289322l8 8C43.8946432 8.4806296 44 8.73498351 44 9.0002v14.094c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1V9.41441356L34.5857864 2.0002H2v52z"
                          fillRule="nonzero"
                        />
                        <path
                          d="M44 36.0005c0-6.6277153-5.3722847-12-12-12s-12 5.3722847-12 12 5.3722847 12 12 12 12-5.3722847 12-12zm2 0c0 7.7322847-6.2677153 14-14 14s-14-6.2677153-14-14 6.2677153-14 14-14 14 6.2677153 14 14zM50.4161068 57.3851932c.8194757.8194757 2.1493107.8194757 2.9690786-.000292.8200861-.819409.8200861-2.1487934-.0003531-2.9685554l-5.8009391-5.801939c-.8194757-.8194757-2.1493107-.8194757-2.9687864 0-.8204757.8204757-.8204757 2.1493107 0 2.9697864l5.801 5.801zm-1.4142136 1.4142136l-5.801-5.801c-1.6015243-1.6015243-1.6015243-4.1966893 0-5.7982136 1.6005243-1.6005243 4.1966893-1.6005243 5.7972745.000061l5.8006469 5.801647c1.6019139 1.600591 1.6019139 4.1972066.0002922 5.7975056-1.6005243 1.6005243-4.1966893 1.6005243-5.7972136 0z"
                          fillRule="nonzero"
                        />
                        <path
                          d="M40 36.0005c0-4.4184153-3.5815847-8-8-8-4.4184153 0-8 3.5815847-8 8 0 4.4184153 3.5815847 8 8 8 4.4184153 0 8-3.5815847 8-8zm2 0c0 5.5229847-4.4770153 10-10 10s-10-4.4770153-10-10 4.4770153-10 10-10 10 4.4770153 10 10z"
                          fillRule="nonzero"
                        />
                        <path d="M33.41421356 36l1.41421356 1.41421356c.39052426.39052426.39052426 1.0236893 0 1.41421356-.39052425.39052426-1.0236893.39052426-1.41421356 0L32 37.41421356l-1.41421356 1.41421356c-.39052426.39052426-1.0236893.39052426-1.41421356 0-.39052426-.39052425-.39052426-1.0236893 0-1.41421356L30.58578644 36l-1.41421356-1.41421356c-.39052426-.39052426-.39052426-1.0236893 0-1.41421356.39052425-.39052426 1.0236893-.39052426 1.41421356 0L32 34.58578644l1.41421356-1.41421356c.39052426-.39052426 1.0236893-.39052426 1.41421356 0 .39052426.39052425.39052426 1.0236893 0 1.41421356L33.41421356 36z" />
                      </g>
                    </svg>
                    <div className="font-bold text-lg mb-px">
                      Chưa có quà để đổi
                    </div>
                    <div className="text-center">
                      Chưa có quà đổi bằng {unit}.
                    </div>
                  </div>
                )}
                {List && List.length > 0 && (
                  <InfiniteScroll
                    dataLength={List.length}
                    next={() => {
                      if (!isFetching) fetchNextPage();
                    }}
                    hasMore={!!hasNextPage && !isError}
                    loader={
                      <div className="px-3 py-3.5 rounded-sm cursor-pointer bg-white border-b">
                        <div className="h-3.5 bg-gray-200 rounded-full w-full animate-pulse"></div>
                        <div className="h-2.5 mt-2 bg-gray-200 rounded-full w-2/4 animate-pulse"></div>
                      </div>
                    }
                    scrollableTarget="scrollablePoints"
                    refreshFunction={refresh}
                    releaseToRefreshContent={
                      <div className="flex items-center justify-center">
                        <div className="lds-ellipsis">
                          <div className="!bg-app"></div>
                          <div className="!bg-app"></div>
                          <div className="!bg-app"></div>
                          <div className="!bg-app"></div>
                        </div>
                      </div>
                    }
                    pullDownToRefresh
                    pullDownToRefreshThreshold={70}
                    pullDownToRefreshContent={
                      <div className="flex items-center justify-center">
                        <div className="lds-ellipsis">
                          <div className="!bg-app"></div>
                          <div className="!bg-app"></div>
                          <div className="!bg-app"></div>
                          <div className="!bg-app"></div>
                        </div>
                      </div>
                    }
                  >
                    <div className="grid grid-cols-2 gap-4 p-4">
                      {List.map((item) => (
                        <PickerViewPoint
                          key={item.ID}
                          data={item}
                          unit={unit}
                          unavailable={total == null || balance.isError || isRedeeming}
                          insufficient={total != null && Number(item.Point) > Number(total)}
                          onRedeemed={() => setRedeemed(true)}
                        >
                          {({ open }) => (
                            <div
                              className="relative bg-white flex flex-col rounded-lg"
                            >
                              <div>
                                <div
                                  className="text-center pt-2.5 px-2.5"
                                >
                                  <img
                                    style={{
                                      //aspectRatio: "1",
                                      objectFit: "cover",
                                      borderRadius: "8px",
                                    }}
                                    src={checkImageProduct(item.Photo)}
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div
                                className="relative my-4"
                                style={{
                                  height: "1px",
                                  borderTop: "1px dashed #222",
                                }}
                              >
                                <div
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "100%",
                                    background: "rgb(240 244 247)",
                                    left: "-10px",
                                    position: "absolute",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                  }}
                                ></div>
                                <div
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "100%",
                                    background: "rgb(240 244 247)",
                                    right: "-10px",
                                    position: "absolute",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                  }}
                                ></div>
                              </div>
                              <div
                                className="px-4 pb-4 flex justify-between flex-col"
                                style={{
                                  flexGrow: "1",
                                }}
                              >
                                <div>
                                  <div
                                    className="font-medium mb-[3px]"
                                    style={{
                                      fontSize: "15px",
                                      display:
                                        "-webkit-box" /* required for WebkitLineClamp to work */,
                                      WebkitLineClamp: 2 /* limits the text to 3 lines */,
                                      WebkitBoxOrient:
                                        "vertical" /* required for WebkitLineClamp */,
                                      overflow:
                                        "hidden" /* hides any overflowing content */,
                                      textOverflow: "ellipsis",
                                      height: "42px",
                                    }}
                                  >
                                    {item.Title}
                                  </div>
                                  <div className="text-danger font-medium mb-1">
                                    {item.Point} {isStars ? <RewardStar /> : unit}
                                  </div>
                                  <div
                                    className="text-muted"
                                    style={{
                                      display:
                                        "-webkit-box" /* required for WebkitLineClamp to work */,
                                      WebkitLineClamp: 2 /* limits the text to 3 lines */,
                                      WebkitBoxOrient:
                                        "vertical" /* required for WebkitLineClamp */,
                                      overflow:
                                        "hidden" /* hides any overflowing content */,
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {item.Desc}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  aria-label={`Chi tiết ${item.Title}`}
                                  onClick={open}
                                  className="bg-app text-center text-white mt-2.5 min-h-[40px] rounded after:absolute after:inset-0"
                                >
                                  Chi tiết
                                </button>
                              </div>
                            </div>
                          )}
                        </PickerViewPoint>
                      ))}
                    </div>
                  </InfiniteScroll>
                )}

              </div>
            </PullToRefresh>
          )}
        </div>
      </div>
      {createPortal(<Modal
        visible={redeemed}
        zIndex={1100}
        maskStyle={{ zIndex: 1099 }}
        title="Đổi quà thành công"
        onClose={() => setRedeemed(false)}
        actions={[
          { text: "Đóng", close: true },
          {
            text: "Quản lý Voucher",
            highLight: true,
            onClick: () => {
              setRedeemed(false);
              navigate("/user/customer-voucher");
            },
          },
        ]}
      />, document.body)}
    </Page>
  );
};

export default CustomerPointsChange;
