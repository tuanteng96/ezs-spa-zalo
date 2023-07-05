import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { createSearchParams } from 'react-router-dom';
import { Icon, Page, Tabs, Text, useNavigate } from "zmp-ui"
import { useQueryParams } from '../../hook';
import { useLayout } from "../../layout/LayoutProvider"
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
  const { Auth, AccessToken, CurrentStocks } = useLayout();

  const queryParams = useQueryParams();
  let queryKey = queryParams?.Type || 'Time'

  const methods = useForm({
    defaultValues: initialValue
  });
  const { handleSubmit, setValue, watch } = methods;

  useEffect(() => {
    setValue('StockID', CurrentStocks?.ID || '')
  }, [CurrentStocks])

  const onSubmit = data => console.log(data);

  const onChangeTabs = (e) => {
    if (queryKey === 'Time') return
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
            onClick={() => navigate(-1)}
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
              <BookingService />
            </Tabs.Tab>
            <Tabs.Tab key="Finish" label="Hoàn tất">
              Tab 3 content
            </Tabs.Tab>
          </Tabs>
        </form>
      </FormProvider>
    </Page>
  );
};

export default BookingPage;