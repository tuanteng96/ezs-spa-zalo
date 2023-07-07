import http from "../utils/http";

const BookingAPI = {
  add: (data) => http.post(`/api/v3/mbook?cmd=booking`, JSON.stringify(data)),
  delete: (data) =>
    http.post(`/api/v3/mbook?cmd=booking`, JSON.stringify(data)),
  list: ({ MemberID = "" }) =>
    http.get(`/api/v3/mbook?cmd=getbook&memberid=${MemberID}`),
};

export default BookingAPI;
