import React from "react";
import { openChat } from "zmp-sdk";
import { ProcessENV } from "../../../utils/process";
import { PickerOrder } from "./PickerOrder";

export const NavigationOrder = ({ item }) => {
  const openChatScreen = () => {
    openChat({
      type: "oa",
      id: ProcessENV.ZaloOaID,
      message: item.Title,
    });
  };
  return (
    <div className="fixed bottom-0 left-0 w-full pb-safe-bottom bg-white">
      <div className="grid grid-cols-4 h-12">
        <div
          className="bg-success text-white flex items-center justify-center relative"
          onClick={openChatScreen}
        >
          <svg
            enableBackground="new 0 0 15 15"
            viewBox="0 0 15 15"
            role="img"
            className="w-6 h-6 stroke-white fill-white"
          >
            <g stroke="none">
              <path d="m11.2 4.1c-1.1-1.3-3-2.2-5-2.2-3.4 0-6.2 2.3-6.2 5.2 0 1.7.9 3.2 2.4 4.2l-.7 1.4s-.2.4.1.6c.3.3 1.1-.1 1.1-.1l2.4-.9c.3.1.6.1.9.1.7 0 1.5-.1 2.1-.3.5.2 1 .2 1.6.2h.6l2.1 1.5c.6.4.8.1.8-.4v-2.2c.9-.8 1.5-1.8 1.5-3 0-2-1.6-3.6-3.7-4.1zm-5.6 7.3h-.5-.2l-1.8.7.5-1.1-.7-.5c-1.3-.8-2-2-2-3.4 0-2.3 2.3-4.2 5.2-4.2 2.8 0 5.2 1.9 5.2 4.2s-2.4 4.3-5.2 4.3c-.2 0-.4 0-.5 0zm6.8-.8v1.2c0 .6-.1.4-.4.2l-1-.8c-.4.1-.8.1-1.2.1 1.5-1 2.5-2.5 2.5-4.2 0-.6-.1-1.1-.3-1.7 1.2.6 1.9 1.6 1.9 2.7 0 1-.5 1.9-1.5 2.5z" />
              <circle cx="3.1" cy="7.1" r=".8" />
              <circle cx="9.1" cy="7.1" r=".8" />
              <circle cx="6.1" cy="7.1" r=".8" />
            </g>
          </svg>
          <div className="absolute h-7 w-[1px] bg-white right-0 opacity-50"></div>
        </div>
        <PickerOrder item={item} buttonText="Thêm vào giỏ hàng">
          {({ open }) => (
            <div
              className="bg-success text-white flex items-center justify-center cursor-pointer"
              onClick={open}
            >
              <svg
                enableBackground="new 0 0 15 15"
                viewBox="0 0 15 15"
                role="img"
                className="w-6 h-6 stroke-white fill-white"
              >
                <path
                  d="m .5.5h2.2l2.5 10.5h7.2l2.1-7.5h-10.8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit={10}
                />
                <circle cx={6} cy="13.5" r={1} />
                <circle cx="11.5" cy="13.5" r={1} />
                <path
                  d="m7.5 7h3"
                  fill="none"
                  strokeLinecap="round"
                  strokeMiterlimit={10}
                />
                <path
                  d="m9 8.5v-3"
                  fill="none"
                  strokeLinecap="round"
                  strokeMiterlimit={10}
                />
              </svg>
            </div>
          )}
        </PickerOrder>
        <PickerOrder item={item} buttonText="Mua ngay">
          {({ open }) => (
            <div
              className="col-span-2 bg-app flex items-center justify-center text-white cursor-pointer"
              onClick={open}
            >
              Mua ngay
            </div>
          )}
        </PickerOrder>
      </div>
    </div>
  );
};
