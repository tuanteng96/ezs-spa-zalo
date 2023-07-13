import http from "../utils/http";

const ConfigsAPI = {
  global: () => http.get(`/brand/global/global.json?${new Date().getTime()}`),
  getNames: (names) => http.get(`/api/v3/config?cmd=getnames&names=${names}`),
};

export default ConfigsAPI;
