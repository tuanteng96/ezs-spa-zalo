import React from "react";
import { NavLink } from "react-router-dom";
import { Icon, Page, Text } from "zmp-ui";

const UserPage = () => {
  return (
    <Page className="page" hideScrollbar>
      <div className="navbar fixed top-0 left-0 min-w-[100vw] max-w-[100vw] z-[999] transition px-3 bg-app">
        <div className="w-2/3 relative flex items-center h-full">
          <Text.Title className="text-white truncate transition">
            Hồ sơ
          </Text.Title>
        </div>
      </div>
      <NavLink to="/" className="bg-white p-3 flex items-center">
        <div className="w-12">
          <img
            className="shadow-3xl rounded-full w-full"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          />
        </div>
        <div className="pl-3 flex-1">
          <div className="text-[16px] font-medium leading-6">
            Nguyễn Tài Tuấn
          </div>
          <div className="text-gray-700 text-[14px]">Thông tin cá nhân</div>
        </div>
        <div className="w-12 h-12 flex items-center justify-center text-app">
          <Icon icon="zi-edit-text" />
        </div>
      </NavLink>
      <div className="bg-white mt-2">
        <NavLink to="/checkin" className="flex px-3 py-4 items-center border-b">
          <div className="text-app">
            <Icon icon="zi-switch-users" />
          </div>
          <div className="font-medium flex-1 pl-3">Check In</div>
          <div className="text-muted">
            <Icon icon="zi-chevron-right" />
          </div>
        </NavLink>
        <NavLink to="/user/customer-booking-manage" className="flex px-3 py-4 items-center border-b">
          <div className="text-app">
            <Icon icon="zi-calendar" />
          </div>
          <div className="font-medium flex-1 pl-3">Quản lý đặt lịch</div>
          <div className="text-muted">
            <Icon icon="zi-chevron-right" />
          </div>
        </NavLink>
        <NavLink
          to="/user/customer-service"
          className="flex px-3 py-4 items-center"
        >
          <div className="text-app">
            <Icon icon="zi-heart" />
          </div>
          <div className="font-medium flex-1 pl-3">Quản lý thẻ dịch vụ</div>
          <div className="text-muted">
            <Icon icon="zi-chevron-right" />
          </div>
        </NavLink>
      </div>
      <div className="bg-white mt-2">
        <NavLink
          to="/user/customer-wallet-card"
          className="px-3 py-4 flex items-center"
        >
          <div className="w-7">
            <img
              className="w-7"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6IzAwNzFCQzsiIGQ9Ik00MDMuNTI1LDIxNi45NDlINjUuMDg1Yy0xNC4zNzksMC0yNi4wMzQtMTEuNjU1LTI2LjAzNC0yNi4wMzQNCgljMC0xNC4zNzksMTEuNjU1LTI2LjAzNCwyNi4wMzQtMjYuMDM0aDMzOC40NDFWMjE2Ljk0OXoiLz4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZFRDg1NjsiIGN4PSIyNDcuMzIyIiBjeT0iMTczLjU1OSIgcj0iOTUuNDU4Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMjlBQkUyOyIgZD0iTTM5LjA1MSwyNjkuMDE3djIxNi45NDljMCwxNC4zNzksMTEuNjU1LDI2LjAzNCwyNi4wMzQsMjYuMDM0bDAsMGgzODEuODMxVjIxNi45NDlINjUuMDg1DQoJYy0xNC4zNzksMC0yNi4wMzQtMTEuNjU1LTI2LjAzNC0yNi4wMzRWMjY5LjAxN3oiLz4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNDRDk4Mjk7IiBkPSJNMjM4LjY0NCwxNy4zNTZIMjU2djUyLjA2OGgtMTcuMzU2VjE3LjM1NnoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojQ0Q5ODI5OyIgZD0iTTI3My4zNTYsNTIuMDY4aDE3LjM1NlY4NC42MWgtMTcuMzU2VjUyLjA2OHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojQ0Q5ODI5OyIgZD0iTTIwMy45MzIsMzQuNzEyaDE3LjM1NlY4NC42MWgtMTcuMzU2VjM0LjcxMnoiLz4NCjwvZz4NCjxwYXRoIHN0eWxlPSJmaWxsOiMwMDcxQkM7IiBkPSJNNDIwLjg4MSwzMTIuNDA3aDM0LjcxMmM5LjU4OSwwLDE3LjM1Niw3Ljc2NywxNy4zNTYsMTcuMzU2djY5LjQyNA0KCWMwLDkuNTg5LTcuNzY3LDE3LjM1Ni0xNy4zNTYsMTcuMzU2SDMyNS40MjRjLTI4Ljc1OSwwLTUyLjA2OC0yMy4zMDktNTIuMDY4LTUyLjA2OGMwLTI4Ljc1OSwyMy4zMDktNTIuMDY4LDUyLjA2OC01Mi4wNjhINDIwLjg4MXoNCgkiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGQkIwM0I7IiBkPSJNNjUuMDg1LDIxNi45NDloMTcuMzU2VjUxMkg2NS4wODVWMjE2Ljk0OXoiLz4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNDRDk4Mjk7IiBkPSJNMjczLjM1NiwxNy4zNTZoMTcuMzU2djE3LjM1NmgtMTcuMzU2VjE3LjM1NnoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojQ0Q5ODI5OyIgZD0iTTIwMy45MzIsMGgxNy4zNTZ2MTcuMzU2aC0xNy4zNTZWMHoiLz4NCjwvZz4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZCQjAzQjsiIGN4PSIzMjUuNDI0IiBjeT0iMzY0LjQ3NSIgcj0iMTcuMzU2Ii8+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojQ0Q5ODI5OyIgZD0iTTI1NiwxMzEuNDI4di05LjkzNmgtMTcuMzU2djkuOTM2Yy0xMy4wMTcsNC4wNTMtMjAuMjgsMTcuODg1LTE2LjIzNiwzMC44OTQNCgkJYzIuMDA1LDYuNDMsNi41NDMsMTEuNzY3LDEyLjU3NCwxNC43N2wxNi45MTMsOC40NjFjMy42NjIsMS44MzEsNS4xNDYsNi4yODMsMy4zMTUsOS45NDVjLTEuMjUsMi41MDgtMy44MTgsNC4wOTYtNi42MjEsNC4wOTYNCgkJaC0yLjUzNGMtNC4wODctMC4wMDktNy40MDItMy4zMjQtNy40MTEtNy40MTF2LTEuMjY3aC0xNy4zNTZ2MS4yNjdjMC4wMTcsMTMuNjc2LDExLjA5LDI0Ljc1LDI0Ljc2NywyNC43NjdoMi41MzQNCgkJYzEzLjY3NiwwLDI0Ljc2Ny0xMS4wOSwyNC43NjctMjQuNzY3YzAtOS4zODEtNS4zMDItMTcuOTYzLTEzLjY5NC0yMi4xNTVsLTE2LjkxMy04LjQ2MWMtMy42NjItMS44MzEtNS4xNDYtNi4yODMtMy4zMTUtOS45NDUNCgkJYzEuMjUtMi41MDgsMy44MTgtNC4wOTYsNi42MjEtNC4wOTZoMi41MzRjNC4wODcsMC4wMDksNy40MDIsMy4zMjQsNy40MTEsNy40MTF2MS4yNjdoMTcuMzU2di0xLjI2Nw0KCQlDMjczLjMxMywxNDQuMTUsMjY2LjI5MiwxMzQuNjM5LDI1NiwxMzEuNDI4eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNDRDk4Mjk7IiBkPSJNMjkwLjcxMiwxNjQuODgxaDE3LjM1NnYxNy4zNTZoLTE3LjM1NlYxNjQuODgxeiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNDRDk4Mjk7IiBkPSJNMTg2LjU3NiwxNjQuODgxaDE3LjM1NnYxNy4zNTZoLTE3LjM1NlYxNjQuODgxeiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo="
            />
          </div>
          <div className="flex-1 pl-3">
            <div className="flex items-center justify-between relative before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-[#f5f5fa] before:-bottom-4">
              <div>
                <div className="font-medium">Ví & thẻ tiền</div>
                <div className="text-muted text-[14px]">
                  Quản lý ví & thẻ tiền của bạn
                </div>
              </div>
              <div className="text-muted">
                <Icon icon="zi-chevron-right" />
              </div>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/user/customer-diary"
          className="px-3 py-4 flex items-center"
        >
          <div className="w-7">
            <img
              className="w-7"
              src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0zMiAxNmgzNTJjMTcuNjcxODc1IDAgMzIgMTQuMzI4MTI1IDMyIDMydjQzMmMwIDE3LjY3MTg3NS0xNC4zMjgxMjUgMzItMzIgMzJoLTM1MmMtMTcuNjcxODc1IDAtMzItMTQuMzI4MTI1LTMyLTMydi00MzJjMC0xNy42NzE4NzUgMTQuMzI4MTI1LTMyIDMyLTMyem0wIDAiIGZpbGw9IiNlY2NlOTMiLz48cGF0aCBkPSJtMzIgMzc0LjYyNXYtMzI2LjYyNWgzNTJ2NDMyaC0yNDYuNjI1em0wIDAiIGZpbGw9IiNlZmVmZWYiLz48cGF0aCBkPSJtMTM3LjM3NSAzNzQuNjI1djEwNS4zNzVsLTEwNS4zNzUtMTA1LjM3NXptMCAwIiBmaWxsPSIjZTc2ZTU0Ii8+PHBhdGggZD0ibTEyOCA2NHYtNjRoMTYwdjY0YzAgMTcuNjcxODc1LTE0LjMyODEyNSAzMi0zMiAzMmgtOTZjLTE3LjY3MTg3NSAwLTMyLTE0LjMyODEyNS0zMi0zMnptMCAwIiBmaWxsPSIjZTc2ZTU0Ii8+PHBhdGggZD0ibTUxMiAzNjhjMCA3OS41MjczNDQtNjQuNDcyNjU2IDE0NC0xNDQgMTQ0cy0xNDQtNjQuNDcyNjU2LTE0NC0xNDQgNjQuNDcyNjU2LTE0NCAxNDQtMTQ0IDE0NCA2NC40NzI2NTYgMTQ0IDE0NHptMCAwIiBmaWxsPSIjNDhjOGVmIi8+PHBhdGggZD0ibTMzNS4wMDc4MTIgNDI5LjY0ODQzOC0zMS4wMDc4MTItMzEuMDIzNDM4Yy02LjI0NjA5NC02LjI1LTYuMjQ2MDk0LTE2LjM3ODkwNiAwLTIyLjYyNXMxNi4zNzUtNi4yNDYwOTQgMjIuNjI1IDBsMTAuMzY3MTg4IDEwLjM1MTU2MiA3Mi40NjQ4NDMtNjAuMzk4NDM3YzYuNzg5MDYzLTUuNjY0MDYzIDE2Ljg4NjcxOS00Ljc0NjA5NCAyMi41NDI5NjkgMi4wNDY4NzUgNS42NjQwNjIgNi43ODkwNjIgNC43NDYwOTQgMTYuODg2NzE5LTIuMDQ2ODc1IDIyLjU0Mjk2OXptMCAwIiBmaWxsPSIjZmZmIi8+PGcgZmlsbD0iIzc3OTU5ZSI+PHBhdGggZD0ibTE3NiAxMjhoMTI4YzguODM1OTM4IDAgMTYgNy4xNjQwNjIgMTYgMTZzLTcuMTY0MDYyIDE2LTE2IDE2aC0xMjhjLTguODM1OTM4IDAtMTYtNy4xNjQwNjItMTYtMTZzNy4xNjQwNjItMTYgMTYtMTZ6bTAgMCIvPjxwYXRoIGQ9Im05NiAxMjhoMzJ2MzJoLTMyem0wIDAiLz48cGF0aCBkPSJtOTYgMTkyaDMydjMyaC0zMnptMCAwIi8+PHBhdGggZD0ibTk2IDI1NmgzMnYzMmgtMzJ6bTAgMCIvPjxwYXRoIGQ9Im05NiAzMjBoMzJ2MzJoLTMyem0wIDAiLz48cGF0aCBkPSJtMTc2IDE5Mmg5NmM4LjgzNTkzOCAwIDE2IDcuMTY0MDYyIDE2IDE2cy03LjE2NDA2MiAxNi0xNiAxNmgtOTZjLTguODM1OTM4IDAtMTYtNy4xNjQwNjItMTYtMTZzNy4xNjQwNjItMTYgMTYtMTZ6bTAgMCIvPjxwYXRoIGQ9Im0xNzYgMjU2aDMyYzguODM1OTM4IDAgMTYgNy4xNjQwNjIgMTYgMTZzLTcuMTY0MDYyIDE2LTE2IDE2aC0zMmMtOC44MzU5MzggMC0xNi03LjE2NDA2Mi0xNi0xNnM3LjE2NDA2Mi0xNiAxNi0xNnptMCAwIi8+PC9nPjwvc3ZnPg=="
            />
          </div>
          <div className="flex-1 pl-3">
            <div className="flex items-center justify-between relative before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-[#f5f5fa] before:-bottom-4">
              <div>
                <div className="font-medium">Nhật ký</div>
                <div className="text-muted text-[14px]">
                  Lưu trữ các nhật ký của bạn
                </div>
              </div>
              <div className="text-muted">
                <Icon icon="zi-chevron-right" />
              </div>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/user/customer-orders"
          className="px-3 py-4 flex items-center"
        >
          <div className="w-7">
            <img
              className="w-7"
              src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTEyIDUxMiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxnPjxwYXRoIGQ9Im01MTIgMzA0Ljgydjk5Ljk4YzAgMTUuNDktMTIuNTYgMjguMDYtMjguMDYgMjguMDZoLTEzNi4xM2wtMS41LTMwLjEtMTMuNS0yNzAuNjJoNzkuNzdjMTUuNSAwIDI4LjA2IDEyLjU3IDI4LjA2IDI4LjA2djExNi4zaDQzLjA1YzE1LjYzIDAgMjguMzEgMTIuNjggMjguMzEgMjguMzJ6IiBmaWxsPSIjZWVmMGY1Ii8+PHBhdGggZD0ibTUxMiAzMDQuODJ2OTkuOThjMCAxNS40OS0xMi41NiAyOC4wNi0yOC4wNiAyOC4wNmgtMTM2LjEzbC0xLjUtMzAuMWM4LjM4LS42OSAxNi4xNS00LjkxIDIxLjEtMTEuNzkgMTMuMDQtMTguMTQgMzQuMzMtMjkuOTUgNTguMzctMjkuOTUgOS45NiAwIDE5LjQ1IDIuMDMgMjguMDcgNS42OSAxMy4zNiA1LjY4IDI4LjE1LTQuNCAyOC4xNS0xOC45MXYtNDIuOThjMC0xNS42NC0xMi42OC0yOC4zMi0yOC4zMS0yOC4zMmgzMGMxNS42MyAwIDI4LjMxIDEyLjY4IDI4LjMxIDI4LjMyeiIgZmlsbD0iI2RhZTFlYSIvPjxwYXRoIGQ9Im0zODIuNTggMTMyLjE0aDMwYzE1LjUgMCAyOC4wNiAxMi41NyAyOC4wNiAyOC4wNnYxMTYuM2gtMzB2LTExNi4zYzAtMTUuNDktMTIuNTYtMjguMDYtMjguMDYtMjguMDZ6IiBmaWxsPSIjZGFlMWVhIi8+PHBhdGggZD0ibTM0Ny44MSAxMDQuMjZ2MjczLjcxbC0yMjAuNDctMTkuMDItMTI3LjM0LTEwLjk4di0yNDMuNzFjMC0xNS4wMyAxMi4xOC0yNy4yMSAyNy4yMS0yNy4yMWgyOTMuMzljMTUuMDMgMCAyNy4yMSAxMi4xOCAyNy4yMSAyNy4yMXoiIGZpbGw9IiMwMGMyZjMiLz48cGF0aCBkPSJtMzQ3LjgxIDEwNC4yNnYyNzMuNzFsLTIyMC40Ny0xOS4wMmM5LjQ0LTUuNjYgMTUuOTUtMTYuMDMgMTUuOTUtMjguMTQgMC0xMy44LTguNzEtMjYtMjEuNjctMzAuNzctNTcuODUtMjEuMjktOTkuMTItNzYuODktOTkuMTItMTQyLjEzIDAtMjkuNzQgOC41Ny01Ny40NyAyMy4zOC04MC44NmgyNzQuNzJjMTUuMDMgMCAyNy4yMSAxMi4xOCAyNy4yMSAyNy4yMXoiIGZpbGw9IiMxZTkwZmYiLz48cGF0aCBkPSJtMzQ3LjgxIDM0Ny45N3Y4NC44OWgtMzIwLjZjLTE1LjAzIDAtMjcuMjEtMTIuMTgtMjcuMjEtMjcuMjF2LTU3LjY4eiIgZmlsbD0iI2I5Y2ZkZiIvPjxwYXRoIGQ9Im00NDAuNjQgMTYxLjk1djExNC41NWgtNTQuNjRjLTIuOTYgMC01LjM2LTIuNC01LjM2LTUuMzZ2LTEwMy44M2MwLTIuOTYgMi40LTUuMzYgNS4zNi01LjM2eiIgZmlsbD0iIzAwYzJmMyIvPjxwYXRoIGQ9Im01MTIgMzE1LjQ4djMwaC0zOC42MWMtOC4yOCAwLTE1LTYuNzEtMTUtMTUgMC00LjE0IDEuNjgtNy44OSA0LjQtMTAuNjEgMi43MS0yLjcxIDYuNDYtNC4zOSAxMC42LTQuMzl6IiBmaWxsPSIjZmJkZjYzIi8+PHBhdGggZD0ibTQwNS40OCAzMTUuNDgyaC0xNy4zNGMtNC4xNDMgMC03LjUgMy4zNTgtNy41IDcuNXMzLjM1NyA3LjUgNy41IDcuNWgxNy4zNGM0LjE0MyAwIDcuNS0zLjM1OCA3LjUtNy41cy0zLjM1OC03LjUtNy41LTcuNXoiIGZpbGw9IiNiOWNmZGYiLz48cGF0aCBkPSJtNDEwLjY0IDE2MS45NWgzMHYxMTQuNTVoLTMweiIgZmlsbD0iIzFlOTBmZiIvPjxwYXRoIGQ9Im00ODIgMzE1LjQ4aDMwdjMwaC0zMHoiIGZpbGw9IiNmOWQxMWYiLz48cGF0aCBkPSJtMzQ3LjgxIDM0Ny45N3Y4NC44OWgtMzIwLjZjLTE1LjAzIDAtMjcuMjEtMTIuMTgtMjcuMjEtMjcuMjF2LTMwYzAgLjk1LjA1IDEuODguMTQgMi44IDEuNjQgMTUuOTggMjEuODcgMjEuNTYgMzIgOS4xIDEzLjE4LTE2LjE5IDMzLjI2LTI2LjUzIDU1Ljc2LTI2LjUzIDUuNDMgMCAxMC43Mi42IDE1LjgxIDEuNzQgMi40LjU0IDQuNzguOCA3LjEyLjggMTEuNDUgMCAyMS44My02LjE3IDI3LjYzLTE1LjU5eiIgZmlsbD0iIzkwYWJiZCIvPjxnPjxwYXRoIGQ9Im00MjUuNzggMzg4LjY4M2MtMjQuMzU5IDAtNDQuMTc4IDE5LjgxOC00NC4xNzggNDQuMTc4czE5LjgxOCA0NC4xNzggNDQuMTc4IDQ0LjE3OCA0NC4xNzktMTkuODE4IDQ0LjE3OS00NC4xNzgtMTkuODE5LTQ0LjE3OC00NC4xNzktNDQuMTc4eiIgZmlsbD0iIzU2Nzg4YiIvPjxwYXRoIGQ9Im0xMzIuMDggNDMyLjg2YzAgMjQuMzYtMTkuODIgNDQuMTgtNDQuMTggNDQuMTgtNS4yNiAwLTEwLjMxLS45My0xNS0yLjYzLTE3LTYuMTQtMjkuMTgtMjIuNDUtMjkuMTgtNDEuNTVzMTIuMTgtMzUuNDEgMjkuMTgtNDEuNTVjNC42OS0xLjcgOS43NC0yLjYzIDE1LTIuNjMgMjQuMzYgMCA0NC4xOCAxOS44MiA0NC4xOCA0NC4xOHoiIGZpbGw9IiM1Njc4OGIiLz48ZyBmaWxsPSIjNDE1ZTZmIj48cGF0aCBkPSJtMTMyLjA4IDQzMi44NmMwIDI0LjM2LTE5LjgyIDQ0LjE4LTQ0LjE4IDQ0LjE4LTUuMjYgMC0xMC4zMS0uOTMtMTUtMi42MyAxNy02LjE0IDI5LjE4LTIyLjQ1IDI5LjE4LTQxLjU1cy0xMi4xOC0zNS40MS0yOS4xOC00MS41NWM0LjY5LTEuNyA5Ljc0LTIuNjMgMTUtMi42MyAyNC4zNiAwIDQ0LjE4IDE5LjgyIDQ0LjE4IDQ0LjE4eiIvPjxwYXRoIGQ9Im00NjkuOTU4IDQzMi44NmMwIDI0LjM2LTE5LjgyIDQ0LjE4LTQ0LjE4IDQ0LjE4LTUuMjYgMC0xMC4zMS0uOTMtMTUtMi42MyAxNy02LjE0IDI5LjE4LTIyLjQ1IDI5LjE4LTQxLjU1cy0xMi4xOC0zNS40MS0yOS4xOC00MS41NWM0LjY5LTEuNyA5Ljc0LTIuNjMgMTUtMi42MyAyNC4zNiAwIDQ0LjE4IDE5LjgyIDQ0LjE4IDQ0LjE4eiIvPjwvZz48L2c+PC9nPjxwYXRoIGQ9Im0yOTYuODUgMTU3LjkxYzAgNTQuNDQtMzYuMTYgMTAyLjY2LTg4LjE5IDExNy45NmwtMjkuNDUgMjkuNDVjLTEuMzggMS4zOC0zLjE2IDIuMTEtNC45NiAyLjE5LS4xMi4wMS0uMjMuMDEtLjM1LjAxLTEuOTEgMC0zLjgzLS43My01LjMtMi4ybC0yOS40NS0yOS40NWMtNTIuMDMtMTUuMy04OC4xOS02My41Mi04OC4xOS0xMTcuOTYgMC02Mi43MSA0Ny4yLTExNC42MiAxMDcuOTQtMTIyLjA0IDQuOTItLjYgOS45Mi0uOTEgMTUtLjkxIDY3LjggMCAxMjIuOTUgNTUuMTYgMTIyLjk1IDEyMi45NXoiIGZpbGw9IiNlZDIwNjEiLz48cGF0aCBkPSJtMjk2Ljg1IDE1Ny45MWMwIDU0LjQ0LTM2LjE2IDEwMi42Ni04OC4xOSAxMTcuOTZsLTI5LjQ1IDI5LjQ1Yy0xLjM4IDEuMzgtMy4xNiAyLjExLTQuOTYgMi4xOWw0LjQxLTMxLjY0YzUyLjAzLTE1LjMgODguMTktNjMuNTIgODguMTktMTE3Ljk2IDAtNjIuNzEtNDcuMi0xMTQuNjItMTA3Ljk1LTEyMi4wNCA0LjkyLS42IDkuOTItLjkxIDE1LS45MSA2Ny44IDAgMTIyLjk1IDU1LjE2IDEyMi45NSAxMjIuOTV6IiBmaWxsPSIjYzcxZTU0Ii8+PHBhdGggZD0ibTI0NC4zNyAxNTcuOTFjMCAzOC44NS0zMS42MSA3MC40Ny03MC40NyA3MC40Ny01LjE0IDAtMTAuMTYtLjU1LTE0Ljk5LTEuNjItMzEuNjctNi44OC01NS40Ny0zNS4xNC01NS40Ny02OC44NSAwLTMzLjcyIDIzLjgtNjEuOTggNTUuNDctNjguODYgNC44My0xLjA2IDkuODUtMS42MSAxNC45OS0xLjYxIDM4Ljg2IDAgNzAuNDcgMzEuNjEgNzAuNDcgNzAuNDd6IiBmaWxsPSIjZWVmMGY1Ii8+PHBhdGggZD0ibTI0NC4zNyAxNTcuOTFjMCAzOC44NS0zMS42MSA3MC40Ny03MC40NyA3MC40Ny01LjE0IDAtMTAuMTYtLjU1LTE0Ljk5LTEuNjIgMzEuNjctNi44OSA1NS40Ni0zNS4xNSA1NS40Ni02OC44NSAwLTMzLjcxLTIzLjc5LTYxLjk3LTU1LjQ2LTY4Ljg2IDQuODMtMS4wNiA5Ljg1LTEuNjEgMTQuOTktMS42MSAzOC44NiAwIDcwLjQ3IDMxLjYxIDcwLjQ3IDcwLjQ3eiIgZmlsbD0iI2RhZTFlYSIvPjwvZz48L3N2Zz4="
            />
          </div>
          <div className="flex-1 pl-3">
            <div className="flex items-center justify-between relative before:content-[''] before:absolute before:w-full before:h-[1px] before:bg-[#f5f5fa] before:-bottom-4">
              <div>
                <div className="font-medium">Đơn hàng</div>
                <div className="text-muted text-[14px]">
                  Quản lý đơn hàng của bạn
                </div>
              </div>
              <div className="text-muted">
                <Icon icon="zi-chevron-right" />
              </div>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/user/customer-voucher"
          className="px-3 py-4 flex items-center"
        >
          <div className="w-7">
            <img
              className="w-7"
              src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTEyIDUxMiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxnPjxwYXRoIGQ9Im00NjQgNDMyaC0zNTJjMC0xNy42NzMtMTQuMzI3LTMyLTMyLTMydi0yMjRjMTcuNjczIDAgMzItMTQuMzI3IDMyLTMyaDM1MmMwIDE3LjY3MyAxNC4zMjcgMzIgMzIgMzJ2MjI0Yy0xNy42NzMgMC0zMiAxNC4zMjctMzIgMzJ6IiBmaWxsPSIjMzIyODNjIi8+PC9nPjxnPjxwYXRoIGQ9Im00MDAgMzY4aC0zNTJjMC0xNy42NzMtMTQuMzI3LTMyLTMyLTMydi0yMjRjMTcuNjczIDAgMzItMTQuMzI3IDMyLTMyaDM1MmMwIDE3LjY3MyAxNC4zMjcgMzIgMzIgMzJ2MjI0Yy0xNy42NzMgMC0zMiAxNC4zMjctMzIgMzJ6IiBmaWxsPSIjZmY0NjQ2Ii8+PC9nPjxnPjxnPjxwYXRoIGQ9Im0yMDAgMzI4aC0xMTJjLTguODM3IDAtMTYtNy4xNjMtMTYtMTZ2LTExMmgxNDR2MTEyYzAgOC44MzctNy4xNjMgMTYtMTYgMTZ6IiBmaWxsPSIjYTVjM2RjIi8+PC9nPjxnPjxwYXRoIGQ9Im0xMjAgMzI4aC00OGMtOC44MzcgMC0xNi03LjE2My0xNi0xNnYtMTEyaDgwdjExMmMwIDguODM3LTcuMTYzIDE2LTE2IDE2eiIgZmlsbD0iI2U2ZTZlYiIvPjwvZz48Zz48cGF0aCBkPSJtNTYgMjAwaDgwdjE2aC04MHoiIGZpbGw9IiNhNWMzZGMiLz48L2c+PGc+PHBhdGggZD0ibTQ4IDE2MGgxNzZjNC40MTggMCA4IDMuNTgyIDggOHYyNGMwIDQuNDE4LTMuNTgyIDgtOCA4aC0xNzZjLTQuNDE4IDAtOC0zLjU4Mi04LTh2LTI0YzAtNC40MTggMy41ODItOCA4LTh6IiBmaWxsPSIjYTVjM2RjIi8+PC9nPjxnPjxwYXRoIGQ9Im00OCAxNjBoODhjNC40MTggMCA4IDMuNTgyIDggOHYyNGMwIDQuNDE4LTMuNTgyIDgtOCA4aC04OGMtNC40MTggMC04LTMuNTgyLTgtOHYtMjRjMC00LjQxOCAzLjU4Mi04IDgtOHoiIGZpbGw9IiNlNmU2ZWIiLz48L2c+PGc+PHBhdGggZD0ibTg4IDIwMGgxNnYxMjhoLTE2eiIgZmlsbD0iIzQ2M2M0YiIvPjwvZz48Zz48cGF0aCBkPSJtODggMjAwaDE2djE2aC0xNnoiIGZpbGw9IiMzMjI4M2MiLz48L2c+PGc+PHBhdGggZD0ibTgwIDE2MGgxNnY0MGgtMTZ6IiBmaWxsPSIjNDYzYzRiIi8+PC9nPjxnPjxwYXRoIGQ9Im0xNzYgMTYwaDE2djQwaC0xNnoiIGZpbGw9IiMzMjI4M2MiLz48L2c+PGc+PHBhdGggZD0ibTE2OCAyMDBoMTZ2MTI4aC0xNnoiIGZpbGw9IiMzMjI4M2MiLz48L2c+PHBhdGggZD0ibTE5NiAxMDRjLTE1LjAzMyAwLTI5LjE2OCA1Ljg1NC0zOS44IDE2LjQ4NWwtMjAuMiAyMC4yMDEtMjAuMjAxLTIwLjIwMWMtMTAuNjMxLTEwLjYzMS0yNC43NjYtMTYuNDg1LTM5Ljc5OS0xNi40ODUtMTUuNDM5IDAtMjggMTIuNTYxLTI4IDI4czEyLjU2MSAyOCAyOCAyOGgxMjBjMTUuNDM5IDAgMjgtMTIuNTYxIDI4LTI4cy0xMi41NjEtMjgtMjgtMjh6bS0xMjAgNDBjLTYuNjE3IDAtMTItNS4zODMtMTItMTJzNS4zODMtMTIgMTItMTJjMTAuNzYgMCAyMC44NzcgNC4xOSAyOC40ODUgMTEuNzk5bDEyLjIwMiAxMi4yMDF6bTEyMCAwaC00MC42ODdsMTIuMi0xMi4yMDFjNy42MS03LjYwOSAxNy43MjctMTEuNzk5IDI4LjQ4Ny0xMS43OTkgNi42MTcgMCAxMiA1LjM4MyAxMiAxMnMtNS4zODMgMTItMTIgMTJ6IiBmaWxsPSIjMzIyODNjIi8+PC9nPjxnPjxnPjxwYXRoIGQ9Im0yNTYgMTEyaDE2djMyaC0xNnoiIGZpbGw9IiNlNmU2ZWIiLz48L2c+PGc+PHBhdGggZD0ibTI1NiA4MGgxNnYxNmgtMTZ6IiBmaWxsPSIjZTZlNmViIi8+PC9nPjxnPjxwYXRoIGQ9Im0yNTYgMzUyaDE2djE2aC0xNnoiIGZpbGw9IiNlNmU2ZWIiLz48L2c+PGc+PHBhdGggZD0ibTI1NiAxNjBoMTZ2MzJoLTE2eiIgZmlsbD0iI2U2ZTZlYiIvPjwvZz48Zz48cGF0aCBkPSJtMjU2IDIwOGgxNnYzMmgtMTZ6IiBmaWxsPSIjZTZlNmViIi8+PC9nPjxnPjxwYXRoIGQ9Im0yNTYgMjU2aDE2djMyaC0xNnoiIGZpbGw9IiNlNmU2ZWIiLz48L2c+PGc+PHBhdGggZD0ibTI1NiAzMDRoMTZ2MzJoLTE2eiIgZmlsbD0iI2U2ZTZlYiIvPjwvZz48L2c+PGc+PHBhdGggZD0ibTMyMCAyMDBjLTEzLjIzMyAwLTI0LTEwLjc2Ni0yNC0yNHMxMC43NjctMjQgMjQtMjQgMjQgMTAuNzY2IDI0IDI0LTEwLjc2NyAyNC0yNCAyNHptMC0zMmMtNC40MTEgMC04IDMuNTg5LTggOHMzLjU4OSA4IDggOCA4LTMuNTg5IDgtOC0zLjU4OS04LTgtOHoiIGZpbGw9IiNlNmU2ZWIiLz48L2c+PGc+PHBhdGggZD0ibTM4NCAyOTZjLTEzLjIzMyAwLTI0LTEwLjc2Ni0yNC0yNHMxMC43NjctMjQgMjQtMjQgMjQgMTAuNzY2IDI0IDI0LTEwLjc2NyAyNC0yNCAyNHptMC0zMmMtNC40MTEgMC04IDMuNTg5LTggOHMzLjU4OSA4IDggOCA4LTMuNTg5IDgtOC0zLjU4OS04LTgtOHoiIGZpbGw9IiNlNmU2ZWIiLz48L2c+PGc+PHBhdGggZD0ibTMxOS45OTQgMjk2LjAwMmMtMS4yMDMgMC0yLjQyMy0uMjcyLTMuNTcyLS44NDYtMy45NTEtMS45NzYtNS41NTMtNi43ODEtMy41NzctMTAuNzMzbDY0LTEyOGMxLjk3Ny0zLjk1MiA2Ljc4LTUuNTUyIDEwLjczMy0zLjU3OCAzLjk1MSAxLjk3NiA1LjU1MyA2Ljc4MSAzLjU3NyAxMC43MzNsLTY0IDEyOGMtMS40MDEgMi44MDMtNC4yMjYgNC40MjQtNy4xNjEgNC40MjR6IiBmaWxsPSIjZTZlNmViIi8+PC9nPjwvZz48L3N2Zz4="
            />
          </div>
          <div className="flex-1 pl-3">
            <div className="flex items-center justify-between relative">
              <div>
                <div className="font-medium">Mã giảm giá</div>
                <div className="text-muted text-[14px]">
                  Kho mã giảm giá bạn đang có
                </div>
              </div>
              <div className="text-muted">
                <Icon icon="zi-chevron-right" />
              </div>
            </div>
          </div>
        </NavLink>
      </div>
    </Page>
  );
};
export default UserPage;
