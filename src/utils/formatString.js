import { ProcessENV } from "./process"

export const formatString = {
  formatVND: price => {
    if (!price || price === 0) {
      return '0'
    } else {
      return price.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') + 'đ'
    }
  },
  formatVNDPositive: price => {
    if (!price || price === 0) {
      return '0'
    } else {
      return Math.abs(price)
        .toFixed(0)
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') + 'đ'
    }
  },
  fixedContentDomain: (content) => {
    if (!content) return "";
    return content.replace(/src=\"\//g, 'src="' + ProcessENV.URL + "/");
  },
  getIdParams: (url) => {
    return url && url.substring(url.lastIndexOf('/') + 1).split("?")[0];
  }
}