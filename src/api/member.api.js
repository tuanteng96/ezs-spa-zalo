import http from "../utils/http";

const MemberAPI = {
  listDV: ({ StockID = '' }) => http.get("/api/gl/select2?cmd=user&includeRoles=1&includeSource=1&crstockid=${StockID}&roles=DV"),
};

export default MemberAPI;
