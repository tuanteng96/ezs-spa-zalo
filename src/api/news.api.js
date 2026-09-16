import http from "../utils/http";

const NewsAPI = {
  getListCategories: (data) => http.post(`/api/v3/cate25@get`, JSON.stringify(data)),
  getInfoToCateID : (cateid) => http.get(`/api/v3/content?cmd=id&id=${cateid}&tb=categories`), 
  getListToID: (ID) =>
    http.get("/api/gl/select2?cmd=art&includeSource=1&channels=" + ID),
  getDetailID: (ID) => http.get("/api/v3/article?cmd=get&ids=" + ID),
  getNewsNameCate: (id) => http.get(`/api/gl/select2?cmd=art&includeSource=1&channelTitle=${id}`),
  getBannerName: (name) => http.get(`/app/index.aspx?cmd=adv&pos=${name}`),
  recheckContact:(data) => http.post("/api/v3/contact23@checkContact", JSON.stringify(data)),
  sendContact: (data) => http.post(`/api/v3/contact23@sendJson`, JSON.stringify(data)),
  checkAuthenVQMM: data => http.post(`/api/v3/contact23@checkContact`, JSON.stringify(data))
};

export default NewsAPI;
