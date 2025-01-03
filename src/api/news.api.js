import http from "../utils/http";

const NewsAPI = {
  getInfoToCateID : (cateid) => http.get(`/api/v3/content?cmd=id&id=${cateid}&tb=categories`), 
  getListToID: (ID) =>
    http.get("/api/gl/select2?cmd=art&includeSource=1&channels=" + ID),
  getDetailID: (ID) => http.get("/api/v3/article?cmd=get&ids=" + ID),
};

export default NewsAPI;
