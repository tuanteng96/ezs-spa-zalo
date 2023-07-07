import http from "../utils/http";

const ConfigsAPI = {
  getNames: (names) => http.get(`/api/v3/config?cmd=getnames&names=${names}`),
};

export default ConfigsAPI;
