import { useMutation } from '@tanstack/react-query';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { createSearchParams } from 'react-router-dom';
import { Icon, Page, Tabs, Text, useNavigate } from "zmp-ui"
import BookingAPI from '../../api/booking.api';
import { useQueryParams } from '../../hook';
import { useLayout } from "../../layout/LayoutProvider"
import BookingFinish from './BookingFinish';
import BookingService from './BookingService';
import BookingTime from "./BookingTime"

const initialValue = {
  AtHome: false,
  MemberID: '',
  RootIdS: [],
  BookDate: '',
  Desc: '',
  StockID: '',
  FullName: '',
  Phone: '',
  UserServiceIDs: ''
}

const BookingPage = () => {
  const navigate = useNavigate();
  const { Auth, CurrentStocks } = useLayout();

  const queryParams = useQueryParams();
  let queryKey = queryParams?.Type || 'Time'

  const methods = useForm({
    defaultValues: {
      ...initialValue,
      StockID: CurrentStocks?.ID || '',
      MemberID: Auth?.ID || ''
    }
  });
  const { handleSubmit, setValue, reset, watch } = methods;

  useEffect(() => {
    setValue('StockID', CurrentStocks?.ID || '')
  }, [CurrentStocks])

  useEffect(() => {
    setValue('MemberID', Auth?.ID || '')
  }, [Auth])

  const addBookingMutation = useMutation({
    mutationFn: (body) => BookingAPI.add(body),
    mutationKey: ['addBooking']
  });

  const onSubmit = values => {
    const dataSubmit = {
      booking: [
        {
          ...values,
          RootIdS: values?.RootIdS ? values?.RootIdS.toString() : '',
          BookDate: values?.BookDate ? moment(values?.BookDate).format('YYYY-MM-DD HH:mm') : '',
          StockID: values?.StockID || 0,
        },
      ],
    };

    addBookingMutation.mutate(dataSubmit, {
      onSuccess: () => {
        reset()
        navigate({
          pathname: "/booking",
          search: createSearchParams({
            Type: "Finish",
          }).toString(),
        })
      }
    })
  };

  const onChangeTabs = (e) => {
    if (queryKey === 'Time' || queryKey === 'Finish') return
    if (queryKey == 'Service' && e === 'Finish') return
    navigate({
      pathname: "/booking",
      search: createSearchParams({
        Type: e,
      }).toString(),
    })
  }

  return (
    <Page className="page" hideScrollbar>
      <div className="navbar fixed top-0 left-0 min-w-[100vw] max-w-[100vw] z-[999] bg-white">
        <div className="w-2/3 relative flex items-center h-full pl-10">
          <div
            className="absolute left-0 w-10 h-full flex justify-center items-center cursor-pointer"
            onClick={() => {
              if (queryKey === 'Time') {
                navigate("/")
              } else {
                navigate(-1)
              }
            }}
          >
            <Icon icon="zi-chevron-left-header" className="text-app" />
          </div>
          <Text.Title className="text-app">Đặt lịch dịch vụ</Text.Title>
        </div>
      </div>
      <FormProvider {...methods} >
        <form className="h-full border-t" onSubmit={handleSubmit(onSubmit)}>
          <Tabs activeKey={queryKey} className="tab-scrollbar zaui-cols-3 tab-booking" onChange={onChangeTabs}>
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