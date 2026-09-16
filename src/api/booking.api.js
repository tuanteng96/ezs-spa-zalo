import http from "../utils/http";

const BookingAPI = {
  add: (data) => http.post(`/api/v3/mbook?cmd=booking`, JSON.stringify(data)),
  delete: (data) =>
    http.post(`/api/v3/mbook?cmd=booking`, JSON.stringify(data)),
  list: ({ MemberID = "" }) =>
    http.get(`/api/v3/mbook?cmd=getbook&memberid=${MemberID}`),
  contact: (data) => http.post("/api/v3/contact23@send", JSON.stringify(data)),
  getListBookConfig: (data) => http.post("/api/v3/MemberBookConfig@get", JSON.stringify(data)),
  getBooking({
    MemberID,
    From,
    To,
    StockID,
    Status,
    UserServiceIDs,
    StatusMember,
    StatusBook,
    StatusAtHome,
    Tags = "",
  }) {
    return http.get(
      `/api/v3/MBookApp?cmd=getbooks&memberid=${MemberID}&from=${From}&to=${To}&stockid=${StockID}&status=${Status}&UserServiceIDs=${UserServiceIDs}&StatusMember=${StatusMember}&StatusBook=${StatusBook}&StatusAtHome=${StatusAtHome}&Tags=${Tags}`
    );
  },
  getListStaff(stockid) {
    return http.get(`/api/gl/select2?cmd=user&includeRoles=1&includeSource=1&crstockid=${stockid}&roles=DV`)
  }
};

export default BookingAPI;
