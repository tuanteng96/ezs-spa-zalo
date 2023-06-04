import http from "../utils/http"

const AdvAPI = {
  getAdvName: name => http.get('/app/index.aspx?cmd=adv&pos=' + name)
}

export default AdvAPI