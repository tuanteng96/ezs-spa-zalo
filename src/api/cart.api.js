import http from "../utils/http";

const CartAPI = {
  list: ({ token = "", body }) =>
    http.post(
      `/api/v3/orderclient?cmd=get&token=${token}`,
      JSON.stringify(body),
    ),
  preCheckVoucher: ({ token, orderid, vcode }) =>
    http.get(
      `/api/v3/VoucherClient?cmd=precheck&token=${token}&orderid=${orderid}&vcode=${vcode}`,
    ),
    orderVdeCode({Code, Token}) {
      return http.post(`/api/v3/voucherApp@vdecode?vencode=${Code}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
    },
    orderGetCode({Code, Token}) {
      return http.post(`/api/v3/voucherApp@getcode?vcode=${Code}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
    },
    recheckVoucher({Code, Token}) {
      return http.get(`/api/v3/voucherApp@getcode?vcode=${Code}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
    },
    getVoucherReCheck({Code, MemberID, CrMemberID, Token}) {
      return http.get(`/api/v3/voucherApp@vencode?vcode=${Code}&id1=${MemberID}&id2=${CrMemberID}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
    },
};

export default CartAPI;
