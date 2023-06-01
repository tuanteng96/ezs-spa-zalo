import React, { useEffect } from 'react'
import { BottomNavigation, Box, Icon } from 'zmp-ui'

const MasterLayout = ({ children }) => {
  return (
    <>
      {children}
      <BottomNavigation fixed onChange={(key) => console.log(key)}>
        <BottomNavigation.Item
          key="chat"
          label="Trang chủ"
          icon={<Icon icon="zi-home" />}
          activeIcon={<Icon icon="zi-home" />}
          linkTo="/"
        />
        <BottomNavigation.Item
          label="Danh mục"
          key="discovery"
          icon={<Icon icon="zi-more-grid" />}
          activeIcon={<Icon icon="zi-more-grid-solid" />}
        />
        <BottomNavigation.Item
          key="timeline"
          label="Giỏ hàng"
          icon={<Box className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#767a7f" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {/* <Box className="absolute -right-2 -top-[2px] p-[2px] bg-background rounded-full">
              <Text
                className="w-4 h-4 bg-red-500 rounded-full text-white"
                size="xxxxSmall"
              >
                2
              </Text>
            </Box> */}
          </Box>}
          activeIcon={<Icon icon="zi-notif-solid" />}
          linkTo="/form"
        />
        <BottomNavigation.Item
          label="Nhắn tin"
          key="contact"
          icon={<Icon icon="zi-chat" />}
          activeIcon={<Icon icon="zi-chat" />}
          linkTo="/about"
        />
        <BottomNavigation.Item
          key="me"
          label="Tài khoản"
          icon={<Icon icon="zi-user" />}
          activeIcon={<Icon icon="zi-user-solid" />}
          linkTo="/user"
        />
      </BottomNavigation>
    </>
  )
}

export { MasterLayout }