import { ProcessENV } from "./process";

export const formatString = {
  htmlDecode: (content = "") => {
    let e = document.createElement("div");
    e.innerHTML = content;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  },
  formatVND: (price) => {
    if (!price || price === 0) {
      return "0";
    } else {
      return price.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") + "đ";
    }
  },
  formatVNDPositive: (price) => {
    if (!price || price === 0) {
      return "0";
    } else {
      return (
        Math.abs(price)
          .toFixed(0)
          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") + "đ"
      );
    }
  },
  fixedContentDomain: (content) => {
    if (!content) return "";
    return content.replace(/src=\"\//g, 'src="' + ProcessENV.URL + "/");
  },
  getIdParams: (url) => {
    return url && url.substring(url.lastIndexOf("/") + 1).split("?")[0];
  },
  getNameBank: (item) => {
    let names = item.ngan_hang.split("-");
    return names[names.length - 1];
  },
  getGroupsName: (Auth, InitialValues = "Thông tin cá nhân") => {
    if (
      Auth?.acc_type === "M" &&
      Auth?.acc_group > 0 &&
      Auth?.MemberGroups.length > 0
    ) {
      return Auth?.MemberGroups[0].Title;
    } else if (Auth?.ID === 1) {
      return "Quản trị viên";
    } else {
      return InitialValues;
    }
  },
  getStockName: (ID, Stocks) => {
    const index = Stocks && Stocks.findIndex((x) => x.ID === ID);
    if (index > -1) {
      return Stocks[index].Title;
    }
    return "Không xác định";
  },
};
