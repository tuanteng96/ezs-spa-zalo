import http from "../utils/http";

const ConfigsAPI = {
  global: () => http.get(`/brand/global/global.json?${new Date().getTime()}`),
  getNames: (names, { ignoreRoot = false } = {}) => {
    const url = `/api/v3/config?cmd=getnames&names=${names}`;
    return ignoreRoot
      ? http.request({ method: "get", url: `${url}&ignore_root=1` })
      : http.get(url);
  },
};

export default ConfigsAPI;
