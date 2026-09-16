import http from "../utils/http";

const AuthAPI = {
  login: ({ USN = "", PWD = "" }) =>
  http.get(`/app/index.aspx?cmd=authen&USN=${USN}&PWD=${encodeURIComponent(
    PWD
  )}&deviceid=&v=2`),
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
  vouchers: (MemberID) => {
    return http.post(`/app/index.aspx?cmd=voucherandaff&mid=${MemberID}`)
  },
  orders: (token = "") =>
    http.get(`/app/index.aspx?cmd=orders&token=${token}&IsUser=0`),
  serviceCard: ({ Token = "", MemberID = "" }) =>
    http.get(
      `/services/preview.aspx?a=1&token=${Token}&cmd=loadOrderService&MemberID=${MemberID}&IsMember=1&fromOrderAdd=0`,
    ),
    points: ({data, Token}) => http.post(`/api/v3/MemberPoint27@Get`, JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${Token}`
        }
    }),
    getPointsVoucher(body) {
      return http.post(`/api/v4/gift@get`, JSON.stringify(body));
    },
    changePointVoucher(body) {
      return http.post(`/api/v4/gift@swap`, JSON.stringify(body));
    },
    getAffs({data, Token = ''}) {
      return http.post(
        `/api/v3/member23@MemberByAffMemberID`, JSON.stringify(data), {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        }
      );
    },
    rating: (MemberID = "") =>
    http.get(`/api/v3/OrderService?cmd=get_service_unrate&mid=${MemberID}`),
    updateRating: ({MemberID, data}) => http.post(`/api/v3/OrderService?cmd=get_service_unrate&mid=${MemberID}`, data),
    getHistoryService: ({MemberID, Token}) => http.get(`https://cserbeauty.com/services/preview.aspx?a=1&token=${Token}&cmd=loadOrderService&MemberID=${MemberID}&IsMember=0&fromOrderAdd=0
    `),
    getImageStaff2(data) {
      return http.post(`/api/v3/OrderService?cmd=attachmentList`, JSON.stringify(data));
    },
    getMemberGroups(body) {
      return http.get(
        `api/v3/membergroup?${new URLSearchParams(body).toString()}`
      );
    },
    getVoucher({AccessToken, MemberID}) {
      return http.post(`/app/index.aspx?cmd=voucherandaff&mid=${MemberID}`, null, {
        Authorization: `Bearer ${AccessToken}`,
      });
    },
    getVoucherAff ({AccessToken, ...body}) {
      return http.post(`/api/v3/voucherApp@GetList`, JSON.stringify(body),  {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      });
    },
    addDupVoucher({AccessToken, ...data}) {
      return http.post(`/api/v3/voucherApp@dup`, JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      });
    },
    recheckVoucher({code, AccessToken}) {
      return http.get(`/api/v3/voucherApp@GetVoucher?vcode=${code}`, {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      });
    },
    getVoucherReCheck({ Code, MemberID, CrMemberID, AccessToken }) {
      return http.get(
        `/api/v3/voucherApp@vencode?vcode=${Code}&id1=${MemberID}&id2=${CrMemberID}`,
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
    },
    getTopMemberBook({ data, AccessToken }) {
      return http.post(
        `/api/v5/Auth@TopMemberBook`, data,
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
    },
    getTopOrderService({ data, AccessToken }) {
      return http.post(
        `/api/v5/Auth@TopOrderService`, data,
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        },
      );
    }
};

export default AuthAPI;
