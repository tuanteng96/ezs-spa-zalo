import React from "react";
import { followOA } from "zmp-sdk";
import { Icon, useSnackbar } from "zmp-ui";
import { useConfigs } from "../../../layout/MasterLayout";

const Follow = () => {
  const { openSnackbar } = useSnackbar();
  let { GlobalConfig } = useConfigs();

  const follow = () => {
    followOA({
      id: GlobalConfig?.ZALO?.ID,
      success: (res) => {
        openSnackbar({
          text: "Đăng ký thành công !",
          type: "success",
        });
      },
    });
  };

  if (GlobalConfig?.ZALO?.type !== "oa") return <></>

  return (
    <div
      className="fixed right-5 z-10"
      style={{
        bottom: "calc(var(--zaui-safe-area-inset-bottom, 0px) + 48px + 30px)",
      }}
      onClick={follow}
    >
      <div className="w-14 relative">
        <img
          className="rounded-full aspect-square shadow-4xl border border-white"
          src="https://ezs.vn/wp-content/themes/ezsthemes/assets/img/icon.jpg"
        />
        <div className="absolute text-primary left-2/4 -bottom-[10px] -translate-x-2/4 bg-white rounded-full w-6 h-6">
          <div className="absolute">
            <Icon icon="zi-plus-circle-solid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Follow };
