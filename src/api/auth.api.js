import http from "../utils/http"

const AuthAPI = {
  authen: ({ ZaloID = '', token = '' }) => http.get(`/app/index.aspx?cmd=authen&token=${token}&zaloid=${ZaloID}`)
}

export default AuthAPI