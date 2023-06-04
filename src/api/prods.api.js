import http from "../utils/http";

const ProdsAPI = {
  search: ({ key = '', cates = '', pi = 1, ps = 10, token = '', stockid = 0, status = '' }) => http.get(`/app/index.aspx?cmd=search_prods&token=${token}&key=${key}&cates=${cates}&pi=${pi}&ps=${ps}&stockid=${stockid}&status=${status}`)
}

export default ProdsAPI