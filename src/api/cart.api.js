import http from "../utils/http"

const CartAPI = {
  list: ({ token = '', body }) => http.post(`/api/v3/orderclient?cmd=get&token=${token}`, JSON.stringify(body)),
}

export default CartAPI