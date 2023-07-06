import React from 'react'
import { Icon, Page, Text, useNavigate } from "zmp-ui"

const CustomerBookingManage = () => {
  const navigate = useNavigate();

  return (
    <Page className="page !pb-safe-bottom" hideScrollbar>
      <div className="navbar fixed top-0 left-0 min-w-[100vw] max-w-[100vw] z-[999] bg-white">
        <div className="w-2/3 relative flex items-center h-full pl-10">
          <div
            className="absolute left-0 w-10 h-full flex justify-center items-center cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <Icon icon="zi-chevron-left-header" className="text-app" />
          </div>
          <Text.Title className="text-app">
            Quản lý đặt lịch
          </Text.Title>
        </div>
      </div>
    </Page>
  )
}

export default CustomerBookingManage