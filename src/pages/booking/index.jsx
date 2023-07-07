import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { createSearchParams, useLocation } from "react-router-dom";
import { Icon, Page, Tabs, Text, useNavigate } from "zmp-ui";
import BookingAPI from "../../api/booking.api";
import { useQueryParams } from "../../hook";
import { useLayout } from "../../layout/LayoutProvider";
import BookingFinish from "./BookingFinish";
import BookingService from "./BookingService";
import BookingTime from "./BookingTime";

const initialValue = {
  AtHome: false,
  MemberID: "",
  RootIdS: [],
  BookDate: "",
  Desc: "",
  StockID: "",
  FullName: "",
  Phone: "",
  UserServiceIDs: "",
};

const BookingPage = () => {
  const navigate = useNavigate();
  const { Auth, CurrentStocks } = useLayout();
  const { state } = useLocation();

  const queryParams = useQueryParams();
  let queryKey = queryParams?.Type || "Time";

  const methods = useForm({
    defaultValues: !state?.formState
      ? {
          ...initialValue,
          StockID: CurrentStocks?.ID || "",
          MemberID: Auth?.ID || "",
        }
      : {
          ...initialValue,
          BookDate: state?.formState?.BookDate
            ? moment(state?.formState?.BookDate, "YYYY-MM-DD HH:mm:ss").toDate()
            : "",
          ID: state?.formState?.ID,
          AtHome: state?.formState?.AtHome,
          MemberID: state?.formState?.MemberID || Auth?.ID,
          RootIdS: state?.formState?.Roots
            ? state?.formState?.Roots.map((x) => x.ID)
            : [],
          Desc: state?.formState?.Desc,
          StockID: state?.formState?.StockID || "",
          FullName: state?.formState?.Member?.FullName || "",
          Phone: state?.formState?.Member?.MobilePhone || "",
          UserServiceIDs:
            state?.formState?.UserServices &&
            state?.formState?.UserServices.length > 0
              ? state?.formState.UserServices[0].ID
              : "",
        },
  });
  const { handleSubmit, setValue, reset } = methods;

  useEffect(() => {
    if (!state?.formState) setValue("StockID", CurrentStocks?.ID || "");
  }, [CurrentStocks, state?.formState]);

  useEffect(() => {
    if (!state?.formState) setValue("MemberID", Auth?.ID || "");
  }, [Auth, state?.formState]);

  const addBookingMutation = useMutation({
    mutationFn: (body) => BookingAPI.add(body),
    mutationKey: ["addBooking"],
  });

  const onSubmit = (values) => {
    const dataSubmit = {
      booking: [
        {
          ...values,
          RootIdS: values?.RootIdS ? values?.RootIdS.toString() : "",
          BookDate: values?.BookDate
            ? moment(values?.BookDate).format("YYYY-MM-DD HH:mm")
            : "",
          StockID: values?.StockID || 0,
        },
      ],
    };

    addBookingMutation.mutate(dataSubmit, {
      onSuccess: () => {
        reset();
        navigate({
          pathname: "/booking",
          search: createSearchParams({
            Type: "Finish",
          }).toString(),
        });
      },
    });
  };

  const onChangeTabs = (e) => {
    if (queryKey === "Time" || queryKey === "Finish") return;
    if (queryKey == "Service" && e === "Finish") return;
    navigate({
      pathname: "/booking",
      search: createSearchParams({
        Type: e,
      }).toString(),
    });
  };

  return (
    <Page className="page" hideScrollbar>
      <div className="navbar fixed top-0 left-0 min-w-[100vw] max-w-[100vw] z-[999] bg-white">
        <div className="w-2/3 relative flex items-center h-full pl-10">
          <div
            className="absolute left-0 w-10 h-full flex justify-center items-center cursor-pointer"
            onClick={() => {
              if (queryKey === "Time") {
                navigate(state?.prevState || "/");
              } else {
                navigate(-1);
              }
            }}
          >
            <Icon icon="zi-chevron-left-header" className="text-app" />
          </div>
          <Text.Title className="text-app">Đặt lịch dịch vụ</Text.Title>
        </div>
      </div>
      <FormProvider {...methods}>
        <form className="h-full border-t" onSubmit={handleSubmit(onSubmit)}>
          <Tabs
            activeKey={queryKey}
            className="tab-scrollbar zaui-cols-3 tab-booking"
            onChange={onChangeTabs}
          >
            <Tabs.Tab key="Time" label="Thời gian">
              <BookingTime />
            </Tabs.Tab>
            <Tabs.Tab key="Service" label="Dịch vụ">
              <BookingService addBookingMutation={addBookingMutation} />
            </Tabs.Tab>
            <Tabs.Tab key="Finish" label="Hoàn tất">
              <BookingFinish />
            </Tabs.Tab>
          </Tabs>
        </form>
      </FormProvider>
    </Page>
  );
};

export default BookingPage;
