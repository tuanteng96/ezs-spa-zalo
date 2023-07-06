import http from "../utils/http";

const BookingAPI = {
  add: (data) => http.post(`/api/v3/mbook?cmd=booking`, JSON.stringify(data))
};

export default BookingAPI;
