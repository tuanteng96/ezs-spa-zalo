import { useQuery } from '@tanstack/react-query'
import React, { createContext, useContext } from 'react'
import CartAPI from '../api/cart.api'
import { useLayout } from './LayoutProvider'

const CartContext = createContext()

const useCart = () => {
  return useContext(CartContext)
}

const CartProvider = ({ children }) => {

  const { AccessToken, Auth } = useLayout()

  const { data, isLoading } = useQuery({
    queryKey: ['ListsCart', { AccessToken, Auth }],
    queryFn: async () => {

      const body = {
        order: {
          ID: 0,
          SenderID: Auth?.ID,
          VCode: null,
        },
        addProps: "ProdTitle",
      };

      const { data } = await CartAPI.list({ token: AccessToken, body })
      return data?.data
    },
    enabled: !!AccessToken && Number(Auth?.ID) > 0,
  })

  return (
    <CartContext.Provider value={{
      Orders: data || {
        "order": {
          "Voucher": {
            "ID": 11331,
            "Title": "VC4",
            "Code": "VC4",
            "Discount": 40,
            "CreateDate": "2023-06-07T10:39:50",
            "EndDate": null
          },
          "VoucherCode": "VC4",
          "Discount": "40%",
          "Province": {
            "Title": "Hà Nội",
            "ID": 5
          },
          "District": {
            "Title": "Quận Đống Đa",
            "ID": 37
          },
          "MethodPay": {
            "Title": "Tiền mặt",
            "ID": 1
          },
          "Member": {
            "ID": 32378,
            "FullName": "KH1"
          },
          "Aff": null,
          "Payed": 0,
          "RemainPay": -337500,
          "MMPayed": 0,
          "NPayed": 0,
          "NBonus": 0,
          "Bonus": 0,
          "NUReturn": 0,
          "UReturn": 0,
          "Items": null,
          "thanhtoan": {
            "tong_gia_tri_dh": 337500,
            "thanh_toan_tien": 0,
            "thanh_toan_vi": 0,
            "thanh_toan_ao": 0
          },
          "ID": 42795,
          "Total": 1,
          "TotalValue": 562500,
          "ToMoney": 337500,
          "ToPay": 337500,
          "CreateDate": "2023-06-06T22:01:39",
          "SenderID": 32378,
          "SenderName": "KH1",
          "SenderPhone": "0325489666",
          "SenderEmail": "",
          "SenderAddress": "",
          "SenderOther": "",
          "Status": "init",
          "VCode": "VC4"
        },
        "items": [
          {
            "ID": 48191,
            "OrderID": 42795,
            "ProdID": 17260,
            "ProdTitle": "Nước cân bằng cho da dầu, hỗn hợp & da mụn",
            "Price": 625000,
            "PriceOrder": 562500,
            "CreateDate": "2023-06-07T10:40:37",
            "Qty": 1,
            "Attributes": "",
            "ProdCode": "SP1",
            "VoucherCode": "VC4",
            "VoucherValue": 225000,
            "ToMoney": 562500,
            "ToPay": 337500,
            "ProdThumb": "2022/12/27/nuoc-can-bang-cho-da-dau-hon-hop-da-mun_2022-12-27-090113.png"
          }
        ],
        "dfItem": {
          "ProdID": 0,
          "Qty": 0,
          "PriceOrder": 0
        },
        "mm": 700000,
        "vouchers": [
          {
            "Items": [
              {
                "ID": 48191,
                "Discount": 56250,
                "NewToPay": 506250,
                "Percent": 10
              }
            ],
            "ID": 11325,
            "Title": "VC1",
            "Code": "VC1",
            "Discount": 10,
            "CreateDate": "2023-06-07T10:37:57",
            "EndDate": "2023-06-10T08:56:42.3117904+07:00"
          },
          {
            "Items": [
              {
                "ID": 48191,
                "Discount": 112500,
                "NewToPay": 450000,
                "Percent": 20
              }
            ],
            "ID": 11327,
            "Title": "VC2",
            "Code": "VC2",
            "Discount": 20,
            "CreateDate": "2023-06-07T10:39:27",
            "EndDate": "2023-06-10T08:56:42.3273884+07:00"
          },
          {
            "Items": [
              {
                "ID": 48191,
                "Discount": 168750,
                "NewToPay": 393750,
                "Percent": 30
              }
            ],
            "ID": 11329,
            "Title": "VC3",
            "Code": "VC3",
            "Discount": 30,
            "CreateDate": "2023-06-07T10:39:39",
            "EndDate": "2023-06-10T08:56:42.3273884+07:00"
          },
          {
            "Items": [
              {
                "ID": 48191,
                "Discount": 225000,
                "NewToPay": 337500,
                "Percent": 40
              }
            ],
            "ID": 11331,
            "Title": "VC4",
            "Code": "VC4",
            "Discount": 40,
            "CreateDate": "2023-06-07T10:39:50",
            "EndDate": "2023-06-10T08:56:42.3430441+07:00"
          },
          {
            "Items": [
              {
                "ID": 48191,
                "Discount": 281250,
                "NewToPay": 281250,
                "Percent": 50
              }
            ],
            "ID": 11333,
            "Title": "VC5",
            "Code": "VC5",
            "Discount": 50,
            "CreateDate": "2023-06-07T10:40:01",
            "EndDate": "2023-06-10T08:56:42.3430441+07:00"
          }
        ]
      },
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartProvider, useCart }