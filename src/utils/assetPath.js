import { ProcessENV } from "./process";

export const toAbsolutePath = (pathname) =>
  ProcessENV.URL + "/upload/image/" + pathname;
