import { useQuery } from "@tanstack/react-query";
import React from "react"
import { Icon, Page, Text, useNavigate } from "zmp-ui"
import AuthAPI from "../../api/auth.api";
import { useLayout } from "../../layout/LayoutProvider";
import { OrderItem } from "./components/OrderItem";


const CustomerDiary = () => {
  const navigate = useNavigate();
  const { Auth, AccessToken } = useLayout();

  const { data, isLoading } = useQuery({
    queryKey: ["VouchersList", AccessToken],
    queryFn: async () => {
      const { data } = await AuthAPI.orders(AccessToken);
      return data || []
    },
    enabled: Number(Auth?.ID) > -1
  });

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
            Đơn hàng của tôi
            {data && data.length > 0 && <span className="pl-1">({data.length})</span>}
          </Text.Title>
        </div>
      </div>
      <div>
        {
          data && data.length > 0 && data.map((item, index) => (
            <OrderItem item={item} key={index} />
          ))
        }
      </div>
    </Page>
  )
}

export default CustomerDiary