import http from "../utils/http";

const AuthAPI = {
  authen: ({ ZaloID = "", token = "" }) =>
    http.get(`/app/index.aspx?cmd=authen&token=${token}&zaloid=${ZaloID}`),
  barcode: (MemberID) =>
    http.get(`/services/preview.aspx?cmd=Barcode&mid=${MemberID}`),
  wallet: (data) => http.post(`/services/preview.aspx?cmd=list_money`, data),
  moneyCard: (MemberID) =>
    http.get(`/api/v3/moneycard?cmd=get&memberid=${MemberID}`),
  moneyCardHistory: (ID) =>
    http.get(`/api/v3/moneycard?cmd=detail&id_the_tien=${ID}`),
  diary: (token) => http.post(`/app/index.aspx?cmd=noti&token=${token}`),
  vouchers: (MemberID) =>
    http.post(`/app/index.aspx?cmd=voucherandaff&mid=${MemberID}`),
  orders: (token = "") =>
    http.get(`/app/index.aspx?cmd=orders&token=${token}&IsUser=0`),
  serviceCard: ({ Token = "", MemberID = "" }) =>
    http.get(
      `/services/preview.aspx?a=1&token=${Token}&cmd=loadOrderService&MemberID=${MemberID}&IsMember=1&fromOrderAdd=0`
    ),
};

export default AuthAPI;
