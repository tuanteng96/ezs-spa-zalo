import axios from "axios";
import { getStorage } from "zmp-sdk";
import { ProcessENV } from "./process";

// class Http {
//   constructor() {
//     this.accessToken = "";
//     this.accessStock = "";

//     this.instance = axios.create({
//       baseURL: ProcessENV.URL,
//       timeout: 50000,
//       headers: {
//         "content-type": "text/plain",
//       },
//     });
//     this.instance.interceptors.request.use(
//       (config) => {
//         if (this.accessToken) {
//           config.headers.Authorization = "Bearer " + this.accessToken;
//         }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       },
//     );
//     // Add response interceptor
//     this.instance.interceptors.response.use(
//       ({ data, ...response }) => {
//         return {
//           data,
//         };
//       },
//       (error) => {
//         return Promise.reject(error);
//       },
//     );
//   }
// }

// const http = new Http().instance;
// export default http;

/*
 *  axios Global
    window.SERVER = Domain
*/

window.SERVER = ProcessENV.URL

const clientMODE = true;
var clientPROD = false;

var log = localStorage.getItem('log') == '1' || localStorage.getItem('log') == 'http-common';

function GlobalConfigPath(path, fn) {

    if (!window.GlobalConfig) return fn(undefined);
    if (!GlobalConfig.getPath) {
        GlobalConfig.getPath = (path, fn) => {
            //path start with '$.';
            var p = path.startsWith('$.') ? path.substr(2) : path;
            var segs = p.split('.');
            var exist = true;
            var o = GlobalConfig;
            for (var i = 0; i < segs.length; i++) {
                o = o[segs[i]];
                if (!o) {
                    if (i < segs.length - 1) exist = false;
                    break;
                }
            }
            if (exist) return fn(o);
            return false;
        }
    }

    return GlobalConfig.getPath(path, fn);
   
}
function safeBox(fn) {
    try {
        fn();
    } catch {

    }
}

var console2 = {
    log() { }
};

function urlParams(url) {
    var search = url.split('?')[1] || '';
    try {
        return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    } catch {
        return {}
    }
}
//url handling
const handlers = [
    {
        urls: [
            '/app/index.aspx?cmd=adv&pos=APP.MAIN',
            '/app/index.aspx?cmd=adv&pos=APP.MAINSALE',
            '/app/index.aspx?cmd=adv&pos=APP.BANNER',
            '/app/index.aspx?cmd=adv&pos=42',
            '/app/index.aspx?cmd=adv&pos=45',
            '/app/index.aspx?cmd=adv&pos=APP.SALE',
            '/app/index.aspx?cmd=adv&pos=APP.AFTERBEFORE',
            '/app/index.aspx?cmd=adv&pos=WEB.REVIEW',
            '/app/index.aspx?cmd=adv&pos=APP.MUAHANG'
        ],
        onUrl(url, p) {
            return url.indexOf('/app/index.aspx?cmd=adv') > -1;
        },
        get(url, p) {
            //var p = urlParams(url);
            //log && console.log('adv', p.pos);
            var pos = p.pos;
            return new Promise((resolve, reject) => {
                ClientZData().then(x => {
                    var advList = x.getType('AdvEnt');
                    var posList = x.getType('PositionEnt');
                    var id = parseInt(pos) || 0;

                    var tt = pos.toString().toUpperCase();
                    var posObj = null;
                    posList.every(p => {
                        //console.log(p.Title, tt, p.Title == tt);
                        if (p.ID === id || p.Title.toUpperCase() == tt) {
                            if (p.IsPublic) {
                                //console.log(url, p);
                                posObj = p;
                            }
                        }
                        return posObj === null;
                    });
                    //fake cau truc cua axios
                    var response = {
                        data: {
                            data: advList.filter(a =>
                                (posObj != null && a.PosID == posObj.ID)
                                && a.IsPublic == 1
                            ),
                            success: true
                        }
                    };
                    //log && console.log('adv', url, p.pos);
                    resolve(response);
                }).catch(reject);
            })
        }
    },
    {
        //url: '/api/v3/content?cmd=id&id=835&tb=categories',

        onCase(url, p) {
            if (url.indexOf('/api/v3/content?') > -1 && p.tb == 'categories') return 1;
            if (url.indexOf('/api/v3/config?cmd=getnames&') > -1) return 2;
            if (url === '/api/gl/select2?cmd=art&includeSource=1&channels=835') return 3;
            if (url === '/api/v3/web?cmd=getStock') return 4;
            if (url.indexOf('/app/index.aspx?cmd=cate_parentid&') > -1) return 5;
            if (url.indexOf('/api/v3/article?cmd=get') > -1) return 6;
            return 0;
        },
        onUrl(url, p) {
            return this.onCase(url, p) > 0
        },
        get(url, p) {
            var t = this;
            //log && console.log('get', url, t.onCase(url, p));


           
            return new Promise((resolve, reject) => {
                ClientZData().then(x => {
                    var caseValue = t.onCase(url, p);

                    switch (caseValue) {
                        case 1:
                            var id = parseInt(p.id) || 0;
                            var cateList = x.getType('CategoryEnt');

                            resolve({
                                data: {
                                    data: cateList.filter(c => c.ID == id)
                                }
                            });
                            break;
                        case 2:
                            let names = (p.names || '').toUpperCase().split(',');
                            let configList = x.getType('ConfigEnt').filter(c => names.indexOf(c.Name.toUpperCase()) > -1);
                            log && console.log('configList', configList);
                            resolve({
                                data: {
                                    data: configList
                                }
                            })
                            break;
                        case 3:
                            let artList = x.getType('ArticleEnt').filter(a => `,${a.Channels},`.indexOf(`,835,`) > -1);

                            artList.sort((a, b) => { return a.Order - b.Order > 0 ? 1 : -1 });

                            resolve({
                                data: {
                                    data: artList.filter(x => x.IsPublic == 1).map(a => {

                                      

                                        return {
                                            desc: null,
                                            id: a.ID,
                                            photo: a.Thumbnail,
                                            text: a.Title,
                                            source: a
                                        }
                                    })
                                }
                            })
                            break;
                        case 4:
                            var data = {
                                CurrentStockID: 0,
                                all: x.getType('CategoryEnt').filter(c => c.ApplicationKey == 'kho' && c.IsPublic == 1)
                            }

                           
                            resolve({
                                data: {
                                    data: data
                                }
                            })
                            break;
                        case 5:
                            var cateList = x.getType('CategoryEnt');
                            var id = parseInt(p.id) || 0;
                            resolve({
                                data: cateList.filter(c => c.ParentID == id)
                            });
                            break;
                        case 6:

                             

                            fetch(`${SERVER}/api/v3/JsonCache@get?type=ArticleEnt&ids=${p.ids}`, {
                                credentials: 'same-origin',
                                method: 'GET'
                            })
                                .then(x => x.json())
                                .then(rs => {



                                    resolve({
                                        data: {
                                            data: rs.list
                                        }
                                    });
                                }).catch(e => {
                                    reject(e);

                                })

                            //resolve({
                            //    data: {
                            //        data: x.getType('ArticleEnt').filter(a => `,${p.ids},`.indexOf(`,${a.ID},`) > -1)
                            //    }
                            //});
                            break;
                    }
                }).catch(reject)
            });
        }
    },
    {
        onUrl(url) {

            // if (url.indexOf('api/v3/orderclient?') > -1) {
            //     var p = urlParams(url) || {};
            //     switch (p.cmd) {
            //         case 'get':
            //             //log && console.log('orderclient');
            //             return true;

            //     }
            // }

            if (url.indexOf('/api/v3/VoucherClient?cmd=precheck&') > -1) {
                return true;
            }


            if (url.indexOf('/api/v3/app2?get=sv') > -1) {
                Object.getPrototypeOf(url).isForProd = true;
                return true;
            }


            if (clientPROD) {
                if (false
                    || url.indexOf('/api/v3/prod?cmd=getid') > -1
                    || url.indexOf('/app/index.aspx?cmd=search_prods&') > -1
                    || (url.indexOf('/api/v3/app2?get=sv') > -1)
                ) {
                    //url.isForProd = true;
                    Object.getPrototypeOf(url).isForProd = true;
                    return true;
                }

            }
            if (url.indexOf('/app/index.aspx?cmd=voucherandaff&') > -1) return false;
            return false;
        },
        promise(args) {
            return OrderClient.apply(null, arguments);
        }
    },
    {
        onUrl(url, p) {
            if (url.indexOf('/api/v3/noti2?cmd=nextoffset') > -1 && window.NotiResponseData && p.refresh != '1') {
                console2.log('nextoffset');
                return true;
            }
            return false;
        },
        promise(args) {
            return new Promise((resolve, reject) => {
                resolve(window.NotiResponseData)
            })
        },
        onResponse(response) {
            if (response.config && response.config.url.indexOf('/api/v3/noti2?cmd=nextoffset') > -1) {
                console2.log('nextoffset');
                window.NotiResponseData = clone(response);
            }

        }
    },
    {
        onUrl(url, p) {
            //console.log(url);
            if (url.indexOf('/api/v3/noti2/?cmd=clear2') > -1
                || url.indexOf('api/v3/noti2/?cmd=readed2') > -1
            ) {
                window.NotiResponseData && delete window.NotiResponseData;
            }
            return false;
        },
        promise() {
            return null;
        }
    },
    {
        onResponse(response) {
            ///v3/prod?cmd=getid
            //if (response.config && response.config.url.indexOf('v3/prod?cmd=getid') > -1) {
            //    log && console.log('v3/prod?cmd=getid');
            //    var d = response.data.data;
            //    window.Dialog && Dialog.alert(JSON.stringify({
            //        PriceSale: d.product.PriceSale,
            //        StockID: d.CurrentStockID
            //    }));
            //    console.log(d);
            //}
        }
    }

];
function clone(x) {
    if (x == undefined) return undefined;
    if (x == null) return null;
    return JSON.parse(JSON.stringify(x))
}

window.ClientZ = axios.create({
    baseURL: window.SERVER,
    headers: {
        "Content-type": "application/x-www-form-urlencoded",
        //"ISZALO": "1"
    },
});



// Add a request interceptor
ClientZ.interceptors.request.use(
    config => {
      if(config.url.indexOf("zalo.me") === -1) {
        config.headers["ISZALO"] = "1"
      }
      return config
    },
    error => {
        return Promise.reject(error)
    }
);

// Add a response interceptor
ClientZ.interceptors.response.use(
    response => {
        handlers.forEach(h => {
            if (typeof h.onResponse == 'function') {
                try {
                    h.onResponse(response);
                } catch {

                }
            }
        })
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

//url mapping
; (function () {
    if (!clientMODE) return;
    var cz = ClientZ;
    var ClientZ2 = {};
    Object.getOwnPropertyNames(cz).forEach(fn => {

        switch (fn) {
            case 'prototype':
                break;
            default:
                if (typeof cz[fn] == 'function') {
                    ClientZ2[fn] = function () {

                        var getUrl = arguments[0];



                        if (typeof getUrl != 'string') {
                            return cz[fn].apply(cz, arguments);
                        }



                        var p = urlParams(getUrl);

                        var promise = null;
                        handlers.every(h => {

                            if (typeof (h.get) === 'function'
                                && (h.url === getUrl
                                    || (Array.isArray(h.urls) && h.urls.indexOf(getUrl) > -1)
                                    || (typeof h.onUrl === 'function' && h.onUrl(getUrl, p))
                                )
                            ) {
                                promise = h.get(getUrl, p);
                            }



                            if (typeof (h.onUrl) == 'function'
                                && typeof (h.promise) == 'function'
                                && h.onUrl(getUrl, p)) {
                                promise = h['promise'].apply(h, arguments);
                            }

                            return promise === null;
                        });

                        if (promise) {
                            return promise;
                        }
                        return cz[fn].apply(cz, arguments);
                    }
                }
                else {
                    Object.defineProperty(ClientZ2, fn, {
                        get() {
                            return cz[fn];
                        },
                        set(value) {
                            cz[fn] = value;
                        }
                    });
                }
                break;
        }
    })
    window.ClientZ = ClientZ2;
})();
//*/


//ClientZData
; (function () {
    var data = null;
    var key = 'clientz';
    var version = '';
    var timeout = undefined;
    var timeoutHasData = 600;

    var aliasList = "qwertyuiopasdfghjklzxcvbnm";
    var nameOfEnt = "AdvEnt,ArticleEnt,CategoryEnt,ConfigEnt,ExtraValueEnt,MemberGroupEnt,PositionEnt,ProductEnt,ProductJoinEnt,PromotionProgramEnt,MemberConfigEnt".split(',');


    var includes = nameOfEnt.map((n, i) => aliasList[i]).join('');


    function getRawData(dataText) {
        try {
            var dotcomma = dataText.indexOf(';');



            if (dotcomma > 0) {
                version = dataText.substring(0, dotcomma);

                data = eval(`[${dataText.substring(dotcomma + 1)}]`);

                if (!data) {
                    data = [];
                }

                data.getType = function (name) {
                    //log && console.log('data', data, name);
                    var i = nameOfEnt.indexOf(name);
                    if (i > -1) {
                        var arr = data[i];

                       

                        if (Array.isArray(arr)) {

                            var lst = [];
                            if (arr.length > 1) {
                                var props = arr[0]; 
                                for (var i = 1; i < arr.length; i++) {
                                    var x = {};
                                    props.forEach((p, j) => {
                                        x[p] = arr[i][j];
                                    })
                                    lst.push(x);
                                }
                            }
                            // if (name == 'ProductEnt') console.log(name, lst);
                            return lst;

                          

                        }

                    }
                    //loi
                    localStorage.removeItem(key);
                    throw new Error(`clientz:${name} error`);
                }

                data.getId = function (name, id) {
                    return data.getType(name).filter(x => x.ID === id)[0];
                }

                data.getTree = function (app, rootIds, publicPravite) {
                    var cateList = this.getType('CategoryEnt');
                    var ids = [];
                    var filterIds = [];
                    if (typeof rootIds === 'string') {
                        filterIds = rootIds.split(',').map(x => parseInt(x) || 0);
                    }
                    else if (typeof rootIds == 'number') {
                        filterIds.push(rootIds);
                    }
                    else if (Array.isArray(rootIds)) {
                        filterIds = rootIds.map(x => parseInt(x) || 0);
                    }

                    if (publicPravite) {
                        var newIds = [];
                        cateList.forEach(c => {
                            if (filterIds.indexOf(c.ID) > -1 && c.IsPublic) {
                                newIds.push(c.ID);
                            }
                        });
                        filterIds = newIds;
                    }

                    while (filterIds.length > 0) {
                        var pid = filterIds.splice(0, 1)[0];
                        if (pid == undefined || typeof (pid) != 'number') break;
                        ids.push(pid);
                        cateList.forEach(c => {
                            if (c.ApplicationKey === app && c.ParentID == pid) {
                                if (publicPravite == undefined || publicPravite == true) {
                                    filterIds.push(c.ID);
                                    ids.push(c.ID);
                                }

                            }
                        })
                    }

                    return ids;
                }




                window.data = data;

                return {
                    version: version,
                    data: data
                }
            }

        } catch (e) {

        }
        return {
            version: null,
            data: null
        }
    }


    var pending = [];
    var busy = false;
    var recent = false;
    function callPending(success, data) {
        pending.forEach(x => {
            try {
                x[success ? 0 : 1](data);
            } catch {

            }
        });
        pending.length = 0;
    }

    var memoryData = null;

    function ClientZData(_callOpt) {

        var callOpt = {
            debug: false
        }

        if (_callOpt) Object.assign(callOpt, _callOpt);


        return new Promise((resolve, reject) => {

            if (callOpt.debug) {
                //log && console.log('debug', recent, busy);
            }

            if (recent) {

                if (recent.success) {
                    resolve(recent.arg);
                } else {
                    recent(recent.arg);
                }

                return;
            }

            if (busy) {
                pending.push([resolve, reject]);
                return;
            }
            busy = true;
            try {

                if (memoryData) {
                    var raw = memoryData;
                    version = raw.version;
                    data = raw.data;
                    if (version) {
                        timeout = timeoutHasData;
                    }
                    log && console.log('has memoryData **')
                }
                else {
                    var lc = localStorage.getItem(key);
                    if (lc) {
                        var raw = getRawData(lc);
                        version = raw.version;
                        data = raw.data;
                        if (version) {
                            timeout = timeoutHasData;
                        }
                    }
                }

            } catch {

            }

            var opt = {
                baseURL: window.SERVER,
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                }
            };

            if (timeout) opt.timeout = timeout;



            var x = axios.create(opt);


            x.get(`/clientz?v=${version}&includes=${includes}`).then(rs => {


                //console.log(rs);
                if (rs.status == 200) {
                    try {
                        localStorage.setItem(key, rs.data);
                    } catch (e) {
                        log && console.log('Over quota Storage');

                    }

                    var raw = getRawData(rs.data);
                    memoryData = raw;
                    data = raw.data;
                    version = raw.version;
                    //resolve(raw.data);
                    //callPending(true, raw.data);


                } else {
                    if (data) {
                        data.cachedBy = '' + rs.status;
                        //resolve(data);
                        //callPending(true, data);

                    } else {
                        data = null;
                        //reject(e);
                        //callPending(false, e);
                    }
                }
                if (data) {
                    resolve(data);
                    callPending(true, data);
                    recent = {
                        success: true,
                        arg: data
                    }
                } else {
                    reject(rs);
                    callPending(false, rs);
                    recent = {
                        success: true,
                        arg: rs
                    }
                }
                busy = false;

                //delay 1000s,chong lap lai api, trong thoi gian ngan
                setTimeout(() => {
                    recent = null;
                }, 1000)



            }).catch(e => {
                //console.error('ClientZData', e);
                busy = false;
                if (data) {
                    data.cachedBy = 'error';
                    resolve(data);
                    callPending(true, data);
                    recent = {
                        success: true,
                        arg: data
                    }
                } else {
                    reject(e);
                    callPending(false, e);
                    recent = {
                        success: true,
                        arg: e
                    }
                }

                setTimeout(() => {
                    recent = null;
                }, 1000)
            });

        })




    }

    window.ClientZData = ClientZData;

})();



function rawAxios() {
    var opt = {
        baseURL: window.SERVER,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        //timeout:1,
    };

    var x = axios.create(opt);
    return x;
}

function friend(input) {
    if (!input) return '';
    var s = input.toLowerCase().normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    var s1 = '';
    for (var i = 0; i < s.length; i++) {
        var c = s[i];
        if ('1234567890qwertyuiopasdfghjklzxcvbnm'.indexOf(c) > -1) {
            s1 += c;
        } else {
            if (s1.length > 1 && s1[s1.length - 1] != '-' && i < s.length - 1) {
                s1 += '-';
            }
        }
    }
    return s1;
}

function paging(lst, pi, ps) {

    pi = pi <= 1 ? 1 : pi;
    ps = ps <= 0 ? 10 : ps;
    let total = lst.length;
    var pcount = ps == 0 ? 0 : Math.ceil(total / ps);

    return {
        lst: lst.filter((x, i) => {
            return i >= (pi - 1) * ps && i < pi * ps;
        }),
        pi: pi,
        ps: ps,
        total: total,
        pcount: pcount
    }
}

//OrderClient
; (function () {

    var data = [];
    var id = 1;

    var order = {
        SenderName: '',
        SenderPhone: '',
        SenderEmail: '',
        SenderAddress: '',
        SenderLevel: 0,
        Status: '',
        StockID: 0,
        ID: id++,
        Total: 0,
        ToPay: 0,
        TotalValue: 0,
        ToMoney: 0,
        VoucherID: 0,
        VoucherDiscount: 0,
        VoucherFix: 0,
        VCode: ""
    };
    var items = [];
    var voucherCont = {
        tot_nhat: null,
        danh_sach: [],
        danh_sach_an: []
    };
    var setUpvoucherList = false;
    var member = { ID: 0 };
    function dfItem(prod) {
        var p = prod || {};

        return {
            ProdCode: p.DynamicID || '',
            ProdID: p.ID || 0,
            Price: p.PriceProduct || 0,
            PriceOrder: p.PriceOut || 0,
            ProdTitle: p.Title || '',
            IsAddFee: p.IsAddFee || 0,
            StockID: order.StockID,
            Qty: 0,
            ToMoney: 0,
            ToPay: 0,
            ID: id++,
            ProdOrService: p.IsAddFee == 1 ? 2 :
                p.IsService == 1 ? 1 :
                    p.IsNVL ? 3 :
                        p.IsMoney ? 4 : 0,
            ProdType: p.Type || 0,
            ProdManu: p.Manu || 0,

            ProdThumb: p.Thumbnail
        }
    }

    function deleteItem(ID, propName) {
        var i = 0;
        var j = -1;

        var key = propName || 'ID';

        while (i < items.length) {

            if (items[i][key] == ID) {
                j = i;
                break;
            }
            i++;
        }
        if (j > -1) items.splice(j, 1);

    }

    function titleID(x) {
        return {
            ID: x.ID,
            Title: x.Title,
            Thumbnail: x.Thumbnail
        }
    }

    function splitID(input) {
        return input.split(',').map(x => parseInt(x));
    }

    function updateItem(prod, qty) {
        var i = 0;
        var j = -1;
        while (i < items.length) {
            var item = items[i];
            if (item.ProdID == prod.ID) {
                j = i;
                var preQty = item.Qty;
                var newItem = dfItem(prod);
                newItem.Qty = preQty + qty;
                items[i] = newItem;
                break;
            }
            i++;
        }

        if (j === -1) {
            var newItem = dfItem(prod);
            newItem.Qty = qty;
            items.splice(0, 0, newItem);
        }
    }





    function validApply(vEnt, oi, inCase) {
        if (!vEnt || !oi) return;

        var a = !vEnt.Apply;
        var b = vEnt.Apply == "NG,KM";
        var c = (vEnt.Apply.indexOf("KM") == -1 && (!oi.PP_ID && !oi.PP2_ID && oi.PriceOrder == oi.Price));
        var d = (vEnt.Apply.indexOf("KM") > -1 && (oi.PP_ID > 0 || oi.PP2_ID > 0 || oi.PriceOrder < oi.Price));

        var apply = a || b || c || d;
        //log && console.log('apply:' + inCase, a, b, c, d, vEnt.Code, vEnt.Apply, oi);
        if (inCase) {
            var a1 = (!oi.PP_ID && !oi.PP2_ID);
            var a2 = oi.PriceOrder == oi.Price;
            //log && console.log('incase', [vEnt.Apply.indexOf("KM") == -1, a1, a2, oi.Price, oi.PriceOrder]);
            window.oi = oi;
        }
        return apply;
    }
    function toDiscount(amount, percent) {
        return Math.round(amount * percent / 100);
    }

    var WebControl = {
        MaxLen3(input, max) {
            if (!input) return '';
            if (input.length <= max) return input;
            return input.substring(0, max);
        },
        RoundInt(v) {
            return Math.round(v || 0);
        }
    }

    var DateTime = {
        Compare(a, b) {
            var d1 = new Date(a);
            var d2 = new Date(b);
            return d1.getTime() - d2.getTime();
        },
        get Now() {
            return new Date();
        }
    };

    window.DateZ = DateTime;

    var PromotionProgramBLL = {

        OnEach(name, oi, order, prod, callback) {
            var Promotions = data.getType('PromotionProgramEnt');
            var MemberGroups = data.getType('MemberGroupEnt');
            var t = PromotionProgramBLL;
            //log && console.log('t', t);


            if (Array.isArray(Promotions)) {
                Promotions.forEach(p => {


                    if (DateTime.Compare(DateTime.Now, p.FromDate) >= 0
                        && DateTime.Compare(DateTime.Now, p.ToDate) <= 0) {
                        if (p.Items === undefined) {
                            p.Items = JSON.parse(p.Json) || [];
                        }
                        var items = p.Items;
                        if (!Array.isArray(items) || items.length == 0) return;
                        items.forEach(item => {


                            var valid = false;
                            var a = item.Name == name;
                            var b = t.IsValid(oi, order, prod, item, MemberGroups, name);
                            //if (a) {
                            //    console.log([a, b]);
                            //}
                            if (a && b) {
                                var prom = item;
                                callback({
                                    Promotion: p,
                                    Item: prom
                                }, prom);
                                valid = true;
                            }
                            //log && console.log('PromotionProgramBLL.item', name, item, prod, valid);
                        })

                    }

                });
            }
        },

        IsValid(oi, order, prod, promotionItem, MemberGroups, name) {
            var x = promotionItem;
            if (order.IsSkipPP == true) return false;

            //log && console.log('IsValid', name);

            if (x.OnCateIDs) {
                var cates = data.getTree('type', x.OnCateIDs);
                if (cates.indexOf(prod.Type) == -1) return false;
            }

            //log && console.log('IsValid2', name, x.OnProdIDs, prod.ID);

            if (x.OnProdIDs) {
                if (`,${x.OnProdIDs},`.indexOf(`,${prod.ID},`) == -1) return false;
            }

            //log && console.log('IsValid3', x.OnMGIDs);

            if (x.OnMGIDs) {

                var validGroup = false;
                if (Array.isArray(MemberGroups)) {
                    for (var i = 0; i < MemberGroups.length; i++) {
                        var mg = MemberGroups[i];
                        if (`,${x.OnMGIDs},`.indexOf(`,${mg.ID},`) > -1 && `,${mg.MemberIDs},`.indexOf(`,${member.ID},`) > -1) {
                            //return false;
                            validGroup = true;
                            break;
                        }
                        //if (`,${mg.MemberIDs},`.indexOf(`,${member.ID},`) == -1) {
                        //    //return false;
                        //}

                    }
                }

                if (!validGroup) return;
            }

            //log && console.log('IsValid4', name, oi.StockID, x.OnStockIDs);
            if (x.OnStockIDs) {
                //chua build
                if (`,${x.OnStockIDs},`.indexOf(`,${oi.StockID},`) == -1) {
                    return false;
                }
            }

            //log && console.log('IsValid5', name);

            return true;
        },

        OnOrderItemPrice(oi, order, prod) {
            if (order.IsSkipPP == true) return;

            //log && console.log('OnOrderItemPrice');

            var OnEach = this.OnEach;
            var IsValid = this.IsValid;


            //DateTime.Now = new Date();
            var best = [];

            OnEach('KM_GIA', oi, order, prod, (ppv, prom) => {
                var v = WebControl.RoundInt(prom.PriceSale <= 100 ? oi.Price * (100 - prom.PriceSale) / 100 : prom.PriceSale);
                //log && console.log('vvv', v);
                var any = false;
                best.every(x => {
                    if (x.Key === ppv) {
                        any = true;
                        x.Value = Math.min(v, x.Value);
                        return false;
                    }
                    return true;
                })

                if (!any) {
                    best.push({
                        Key: ppv,
                        Value: v
                    })
                }


            })



            if (best.length > 0) {
                var valueList = best.map(x => x.Value || 0).sort();
                var v = valueList[valueList.length - 1] || 0;
                best.forEach(k => {
                    if (k.Value == v) {

                        //log && console.log(' oi.PriceOrder3', oi.PriceOrder, k.Value);

                        oi.PriceOrder = k.Value;
                        var suff = k.Key.Item.PriceSale <= 100 ? `(Giảm ${k.Key.Item.PriceSale}%)` : "";
                        oi.PP_ID = k.Key.Promotion.ID;
                        oi.PP_Title = WebControl.MaxLen3(k.Key.Promotion.Title, 100 - suff.Length) + suff;
                        oi.PP_Value = k.Key.Item.PriceSale;
                    }
                })

            } else {
                if (oi.PP_ID > 0) {
                    //log && console.log(' oi.PriceOrder4', oi.PriceOrder, oi.Price);
                    oi.PriceOrder = oi.Price;
                }
                oi.PP_ID = 0;
                oi.PP_Title = "";
                oi.PP_Value = 0;
            }

        },
        OnOrderItemOS(oi, order, prod) {
            if (order.IsSkipPP == true) return;

            var OnEach = PromotionProgramBLL.OnEach;
            var IsValid = PromotionProgramBLL.IsValid;


            //DateTime.Now = new Date();
            var best = [];

            OnEach('KM_TANG_BUOI', oi, order, prod, (ppv, prom) => {
                var v = parseInt(prom.AddMore) || 0;

                var any = false;
                var max = 0;

                log && console.log('KM_TANG_BUOI', ppv, prom);

                best.every(x => {
                    if (x.Key === ppv) {
                        any = true;
                        x.Value = Math.min(v, x.Value);

                        max = x.Value > max ? x.Value : max;

                        return false;
                    }
                    return true;
                })

                if (!any) {
                    best.push({
                        Key: ppv,
                        Value: v
                    });
                    max = v;
                }



                //var sourceTitle = os.Title;
                //context.best = best;

                var id = oi.PP2_ID;
                var tt = oi.PP2_Title;
                var add = oi.PP2_Value;
                oi.PP2_ID = 0;
                oi.PP2_Title = "";
                oi.PP2_Value = 0;


                if (best.length > 0) {
                    if (oi.PP_ID > 0) {
                        best.every(k => {

                            if (k.Key.Promotion.ID == oi.PP_ID) {
                                var suff = "(Tặng " + k.Key.Item.AddMore + ")";
                                oi.PP2_ID = k.Key.Promotion.ID;
                                oi.PP2_Title = WebControl.MaxLen3(k.Key.Promotion.Title, 100 - suff.length) + suff;
                                oi.PP2_Value = k.Key.Item.AddMore;
                                return false;
                            }

                            return true;
                        })

                    } else {
                        best.every(k => {

                            //log && console.log('max', max, k.Value);

                            if (k.Value == max) {
                                var suff = "(Tặng " + k.Key.Item.AddMore + ")*";
                                oi.PP2_ID = k.Key.Promotion.ID;
                                oi.PP2_Title = WebControl.MaxLen3(k.Key.Promotion.Title, 100 - suff.length) + suff;
                                oi.PP2_Value = k.Key.Item.AddMore;
                                return false;
                            }

                            return true;
                        })
                    }
                }

                //log && console.log('KM_TANG_BUOI', best, oi);
            })

            // log && console.log('OnOrderItemOS', oi)
        }
    }


    function parse(json) {
        try {
            return JSON.parse(json);
        }
        catch
        {

        }
        return null;
    }
    var sortList = [];
    var MemberGroups = null;
    var CurrentMemberID = null;

    function ResetSale(p) {
        p.PriceSale = 0;
        p.hasSale = false;
        p.SaleBegin = null;
        p.SaleEnd = null;
        //SaleDecs = null;

    }

    var debugProdID = 0;


    var Promotion22 = {
        TakeOrNot(prom) {

            var a = prom.FromDate != null && DateTime.Compare(prom.FromDate, DateTime.Now) > 0;
            var b = prom.ToDate != null && DateTime.Compare(prom.ToDate, DateTime.Now) < 0;
            var c = prom.IsPublic != true;


            if ((prom.FromDate != null && DateTime.Compare(prom.FromDate, DateTime.Now) > 0)
                || (prom.ToDate != null && DateTime.Compare(prom.ToDate, DateTime.Now) < 0)
                || prom.IsPublic != true

            ) return false;




            var z = {
                Promotion: prom,
                Items: parse(prom.Json)
            };



            sortList.push(z);
            return true;
        },


        StockID: 0,

        OnProduct(prod, actionOn, onNon) {

            var debug = prod.ID == debugProdID;
            if (debug) log && console.log('OnProduct', prod);

            if (sortList.length == 0) return;
            var maxIndex = -1;
            var StockID = Promotion22.StockID;

            //log && console.log('StockID', StockID);

            for (var i = 0; i < sortList.length; i++) {
                var a = sortList[i];
                if (a.Items == null || a.Items.Count == 0) continue;
                a.BestAdd = null;
                a.BestPrice = null;
                a.Cases = "";

                //log && console.log('maxIndex-i', a);
                var items = Array.isArray(a.Items) ? a.Items : [];
                items.forEach(item => {
                    var _case = "";
                    if (item.OnCateIDs) {

                        if (`,${item.OnCateIDs},`.indexOf(`,${prod.Type},`) == -1) {
                            if (onNon != null) onNon("-1");
                            return;
                        }
                        _case += "1";
                    }

                    if (item.OnProdIDs) {
                        if (`,${item.OnProdIDs},`.indexOf(`,${prod.ID},`) == -1) {
                            if (onNon != null) onNon("-2");
                            return;
                        }
                        _case += "2";
                    }

                    if (item.OnStockIDs) {

                        var condtStock = !StockID || `,${item.OnStockIDs},`.indexOf(`,${StockID},`) == -1;

                        //log && console.log('prom_condt_stock', item.OnStockIDs, StockID, condtStock);

                        if (condtStock) {
                            if (onNon != null) {

                                onNon("-3");
                            }
                            return;
                        }

                        _case += "3";
                    }

                    if (debug) log && console.log('OnProduct.OnStockIDs', item);

                    if (item.OnMGIDs) {



                        if (CurrentMemberID == null) {
                            CurrentMemberID = getMember().acc_id;
                        }
                        if (MemberGroups == null) MemberGroups = data.getType('MemberGroupEnt');

                        //console.log(CurrentMemberID, MemberGroups);
                        var validMGIDs = false;
                        if (CurrentMemberID > 0) {
                            item.OnMGIDs.split(',').every(gid => {
                                var id = parseInt(gid);
                                if (Array.isArray(MemberGroups)) {
                                    MemberGroups.every(g => {
                                        if (g.ID == id) {
                                            validMGIDs = `,${g.MemberIDs},`.indexOf(`,${CurrentMemberID},`) > -1 ? true : validMGIDs;
                                            //log && console.log('group', g, validMGIDs);
                                            return validMGIDs == false;
                                        }
                                        return true;
                                    })
                                }

                                return true;
                            })
                        }

                        //log && console.log('OnMGIDs', item.OnMGIDs, validMGIDs, CurrentMemberID);

                        if (!validMGIDs) {
                            if (onNon != null) onNon("-4");
                            return;
                        }
                        _case += "4";

                    }
                    if (debug) log && console.log('OnProduct.OnMGIDs', item, _case, a);


                    if (item.PriceSale != null && item.PriceSale > 0) {
                        if (item.PriceSale <= 100) {
                            //giảm %
                            if (a.BestPrice > 100) {
                                a.BestPrice = item.PriceSale;
                                a.BestAdd = null;
                                a.Cases = _case;
                            }
                            else {
                                if (a.BestPrice == null || item.PriceSale > a.BestPrice) {
                                    a.BestPrice = item.PriceSale;
                                    a.BestAdd = null;
                                    a.Cases = _case;
                                }

                            }
                        }
                        else
                            if (a.BestPrice && a.BestPrice <= 100) {
                                //a.BestPrice là % nên ưu tiên hơn item.PriceSale - là tiền
                                if (debug) log && console.log('OnProduct.item a.BestPrice <= 100', item, a);
                                return;
                            }
                            else {
                                //cùng giảm tiền
                                if (a.BestPrice == null || item.PriceSale > a.BestPrice) {
                                    a.BestPrice = item.PriceSale;
                                    a.BestAdd = null;
                                    a.Cases = _case;
                                }
                            }
                    }

                    if (debug) log && console.log('OnProduct.item 1', item, a);

                    if (item.AddMore != null & item.AddMore > 0 && prod.IsService == 1) {
                        if (a.BestAdd == null) {
                            a.BestAdd = item.AddMore;
                            a.CasesAdd = _case;
                        }
                        else {
                            if (a.BestAdd == null || item.AddMore > a.BestAdd) {
                                a.BestAdd = item.AddMore;
                                a.CasesAdd = _case;
                            }

                        }
                    }

                    if (debug) log && console.log('OnProduct.item 100', item, a);
                });



                if (a.BestAdd == null && a.BestPrice == null) {
                    //không có item trong ds Items nào khớp với sp
                    continue;
                }

                //Tìm  ra ct tốt nhất trong các chuong trinh thỏa mãn
                if (maxIndex == -1) {
                    maxIndex = i;
                    continue;
                }


                var b = sortList[maxIndex];



                if (b.BestPrice == null) {
                    maxIndex = i;
                }
                else
                    if (a.BestPrice <= 100) {
                        if (b.BestPrice > 100) maxIndex = i;
                        else {
                            if (a.BestPrice >= b.BestPrice) maxIndex = i;
                        }
                    }
                    else if (b.BestPrice <= 100) continue;

            }

            //log && console.log('maxIndex', maxIndex);


            if (prod.ID == debugProdID) log && console.log('OnProduct.maxIndex', maxIndex);

            if (maxIndex > -1) {
                actionOn(sortList[maxIndex]);
            }

        },
        FillBest(product) {
            var lst = Array.isArray(product) ? product : [product];

            lst.forEach(p => { ResetSale(p) });

            var user = getMember();
            var fi = {
                promNames: [],
                applies: [],
                nons: [],
                stockID: parseInt(localStorage.getItem('CurrentStockID')),
                memberID: parseInt(user.acc_id)
            };

            var Programs = data.getType('PromotionProgramEnt');

            // log && console.log('Programs', Programs);

            var OnProduct = Promotion22.OnProduct;
            var TakeOrNot = Promotion22.TakeOrNot;

            sortList.length = 0;

            Programs.forEach(prom => {
                if (TakeOrNot(prom)) {
                    fi.promNames.push(prom.Title);
                };
            });

            //log && console.log('sortList', sortList)

            lst.forEach(p => {

                if (p.ID == debugProdID) {
                    log && console.log('FillBest.each', p)
                }

                OnProduct(p, (sort) => {



                    var prom = sort.Promotion;
                    var bprice = sort.BestPrice;
                    var badd = sort.BestAdd;

                    if (!bprice && !badd) return;

                    p.PromotionInfo =
                    {
                        AddMore: badd,
                        bprice: bprice,
                        FromDate: prom.FromDate,
                        ToDate: prom.ToDate,
                        ID: prom.ID,
                        PriceSale: Math.round(bprice),
                        Title: prom.Title,
                        Cases: sort.Cases,
                        CasesAdd: sort.CasesAdd,
                    };
                    if (p.ID == debugProdID) {
                        log && console.log('FillBest.bprice', bprice)
                    }
                    // log && console.log('bprice', bprice);

                    p.PriceSale = !bprice ? 0 : Math.round(bprice <= 100 ? (100 - bprice) * p.PriceProduct / 100 : bprice);
                    p.SaleDecs = badd != null ? `Tặng ${badd} buổi` : null;
                    p.SaleBegin = sort.Promotion.FromDate;
                    p.SaleEnd = sort.Promotion.ToDate;

                    if (p.PriceSale) {
                        //log && console.log('PriceSale', p, sort);
                    }

                    // log && console.log('OnProduct1', p, sort);

                    fi.applies.push(
                        {
                            p: p,
                            sort: sort,
                            x: 1.0 * (100 - bprice) * p.PriceProduct / 100
                        });

                }, (_case) => {
                    fi.nons.push(
                        {
                            prodId: p.ID,
                            none: _case
                        });
                })
            })




            return fi;

        }
    };

    function getMember() {
        try {
            var m = JSON.parse(localStorage.getItem('user'));
            if (!m) m = { acc_id: 0 };
            return m;
        } catch {

        }
        return {
            acc_id: 0
        };
    }

    var Options = [];

    var ProductInPaths = {
        Fill(lst) {

            if (lst == null || lst.length == 0) return;
            var pid = 0;
            var ds = [];
            var inPaths = [];
            lst.forEach(p => {
                if (inPaths.filter(x => x.CateID == p.Type).length) return;
                inPaths.push({
                    CateID: p.Type,
                    Paths: []
                })
            });

            var Categories = data.getType('CategoryEnt');

            for (var i = 0; i < inPaths.length; i++) {
                var inPath = inPaths[i];
                pid = inPath.CateID;
                while (true) {
                    var c = Categories.filter(z => z.ID == pid)[0];
                    if (c == null) break;
                    if (c.ParentID == 0) break;
                    inPath.Paths.push({
                        ID: c.ID,
                        ParentID: c.ParentID,
                        Title: c.Title
                    });
                    pid = c.ParentID || 0;
                    if (pid == 0) break;
                }
            }

            for (var i = 0; i < lst.length; i++) {
                var p = lst[i];
                inPaths.every(inPath => {
                    if (inPath.CateID == p.Type) {
                        p.Paths = inPath.Paths;
                        return false;
                    }
                    return true;
                });
            }


        }
    };

    var ProductBLL = {
        GetOptions(DynamicID) {
            var join = data.getType('ProductJoinEnt');
            var prodOpts = [];

            data.getType('ProductEnt').forEach(p => {
                join.forEach(j => {
                    if (j.SourceCode == DynamicID && j.TargetCode == p.DynamicID) {
                        var p2 = clone(p);
                        p2.Opt1 = j.Opt1;
                        p2.Opt2 = j.Opt2;
                        prodOpts.push(p2);
                    }
                })
            });
            Promotion22.FillBest(prodOpts);
            Options = prodOpts;

        },
        GetPhoto(prod) {
            var lst = [
                {
                    Value: prod.Thumbnail,
                    RowID: -prod.ID,
                    Table: "p",
                    Role: "thumb"
                }];
            var extra = data.getType('ExtraValueEnt');

            extra.forEach(x => {
                if (x.Table == 'p'
                    && (x.RowID == prod.ID || Options.filter(o => o.ID == x.RowID).length)
                ) {
                    x.Role = "other";
                    lst.push(x);
                }
            })
            Options.forEach(op => {
                if (op.ID == prod.ID) return;
                lst.push({
                    Value: op.Thumbnail,
                    RowID: -op.ID,
                    Table: "p",
                    Role: "opt_thumb"
                })
                extra.forEach(a => {
                    if (a.RowID == op.ID) {
                        a.Role = "opt_other";
                        lst.push(a);
                    }
                })
            });

            return lst;

        },


        getid(url, opt, pram) {
            var id = parseInt(pram.id);
            var p = data.getType('ProductEnt').filter(p => p.ID == id)[0];
            var eo = {};
            eo.product = p;

            var GetPhoto = ProductBLL.GetPhoto;
            var GetOptions = ProductBLL.GetOptions;

            if (p != null && p.ID > 0)
                GetOptions(p.DynamicID);
            eo.images = p != null && p.ID > 0 ? GetPhoto(p) : null;
            eo.options = p != null && p.ID > 0 ? Options : null;
            eo.combos = p.Combo ? JSON.parse(p.Combo) : null;

            var aff = null;
            var aff_value = null;
            var mid = getMember().acc_id;

            var MemberConfigs = data.getType('MemberConfigEnt');

            var SPs = MemberConfigs.filter(x => x.Type == 'GIOI_THIEU_SANPHAM');
            var DMs = MemberConfigs.filter(x => x.Type == 'GIOI_THIEU_DANHMUC');
            var GIOI_THIEU = MemberConfigs.filter(x => x.Type == 'GIOI_THIEU')[0];



            if (SPs && SPs.length) {
                SPs.every(s => {
                    if (`,${s.OnIDs},`.indexOf(`,${p.ID},`) > -1) {
                        aff = { SANPHAM: s };
                        aff_value = { NG: s.NG, KM: s.KM };
                        return false;
                    }
                    return true;
                });
            }
            if (DMs && DMs.length != null && aff == null) {
                DMs.every(DM => {

                    if (DM.OnIDs) {
                        var cates = data.getTree('type', DM.OnIDs, true);
                        if (cates.indexOf(p.Type) > -1) {
                            aff = { DANHMUC: DM };
                            aff_value = { NG: DM.NG, KM: DM.KM };
                        }
                    }

                    return true;
                });
            }

            if (aff == null && GIOI_THIEU != null) {
                aff = { GIOI_THIEU: GIOI_THIEU };
                aff_value = { NG: GIOI_THIEU.NG, KM: GIOI_THIEU.KM };
            }

            eo.aff = aff;
            eo.aff_value = aff_value;
            eo.aff_link = `${(location.origin)}/${p.LinktoMe}?aff=${mid}`;

            log && console.log('eo', eo);

            return {
                data: {
                    data: eo,
                    success: true
                }
            }
        },
        search_prods(url, opt, p) {

            var cates = p.cates;
            var key = p.key || '';
            var pi = Math.max(1, parseInt(p.pi));
            var ps = parseInt(p.ps) || 8;
            var status = p.status;
            var stockid = p.stockid;
            var prods = data.getType('ProductEnt');
            var cateIds = cates == '' ? null : data.getTree('type', cates, true);

            var fr = friend(key) || '';


            //console.log(fr, key);


            var pg = paging(prods.filter(p => {

                if (Array.isArray(cateIds) && cateIds.indexOf(p.Type) == -1) return false;
                if (key) {
                    if (p.DynamicID.indexOf(key) == -1
                        && p.FriendStr.indexOf(fr) == -1
                        && parseInt(key) != p.ID
                    ) {
                        return false;
                    }
                }
                if (status) {
                    var arr = status.split(',');
                    var any = false;

                    arr.every(x => {
                        if (`,${p.Status},`.indexOf(`,${x},`) > -1) {
                            any = true;
                        }
                        return any === false;
                    });

                    if (!any) return false;
                }

                if (stockid) {
                    if (p.OnStocks.indexOf('*') == -1
                        && `,${p.OnStocks},`.indexOf(`,${stockid},`) == -1
                    ) {
                        return false;
                    }
                }
                // console.log(fr, key, stockid, status, true);
                return true;
            }), pi, ps);

            pg.lst = pg.lst.map(x => {
                return {
                    title: x.Title,
                    photo: x.Thumbnail,
                    price: x.PriceProduct,
                    pricesale: x.PriceSale,
                    ready: x.IsReady,
                    srv: x.IsService,
                    fee: x.IsAddFee,
                    id: x.ID,
                    displayPrice: x.IsDisplayPrice,
                    linktome: x.LinktoMe,
                    source: x,
                    SaleDiscountPercent: x.SaleDiscountPercent
                }
            })



            return {
                data: {
                    data: pg,
                    success: true
                }
            }
        },
        GetProductRoot(id, rootIds, stockid) {

            var cateList = null;

            //log && console.log('GetProductRoot', id, rootIds, stockid);

            //log && console.log('xx', data.getType('ProductEnt'));

            var prods = data.getType('ProductEnt').filter(p => {


                if (p.IsService
                    && p.IsRootPublic
                    && !p.Combo
                    && p.OnStocks

                ) {
                    //console.log(p);
                    if (rootIds != null && rootIds.length > 0) {
                        return rootIds.indexOf(p.ID) > -1;
                    }
                    else {
                        if (cateList == null) {
                            cateList = data.getTree("type", id);
                            // log && console.log('catelist', cateList);
                        }
                        return p.Type == id || cateList.indexOf(p.Type) > -1;
                    }

                }

                return false;
            });



            prods.sort((a, b) => {
                if (a.RenewDate == b.RenewDate) return a.ID > b.ID ? -1 : 1;
                return a.RenewDate > b.RenewDate ? -1 : 1;
            });

            var lst = prods.map(p => {
                p.Paths = [];
                return p;
            });

            return lst.filter(x => x.OnStocks.indexOf('*') > -1 || `,${x.OnStocks},`.indexOf(`,${stockid},`) > -1);

        },
        The(id, stockid) {
            if (id == null || id.length == 0) return null;
            var prods = data.getType('ProductEnt').filter(p => {
                var pass = false;
                if (p.Combo) {
                    safeBox(() => {
                        var combo = JSON.parse(p.Combo);
                        pass = combo.filter(c => id.indexOf(c.Id) > -1).length > 0;
                    })
                }
                return pass;
            })

            var lst = prods.filter(x =>
                x.OnStocks.indexOf('*') > -1 || `,${x.OnStocks},`.indexOf(`,${stockid},`) > -1)
                .map(p => {
                    return p;
                });

            return lst;

        },
        GetComboNonSQL(p, rootID) {
            try {
                var arr = JSON.parse(p.Combo);
                if (Array.isArray(arr)) {
                    return arr.filter(x => !rootID || x.Id == rootID)
                }
            } catch {

            }
            return [];
        },
        get_sv(url, opt, p) {
            log && console.log('get_sv');

            var cid = p.cid;
            var Categories = data.getType('CategoryEnt');
            var rootIds = (p.rootIds || '').split(',').map(id => parseInt(id)).filter(id => id);
            var pi = parseInt(p.pi) || 1;
            var ps = parseInt(p.ps) || 4;
            var pcount = 0;
            var total = 0;
            var c = Categories.filter(x => x.ID == cid)[0];

            var stockid = p.stockid;
            var StockID = stockid;

            Promotion22.StockID = StockID;




            if (!c) {
                return {
                    lst: [],
                    MemberSelectStockID: stockid,
                    pcount: 0,
                    pi: 1,
                    ps: 2,
                    total: 0
                }
            }

            var root = ProductBLL.GetProductRoot(c.ID, rootIds, stockid);
            // log && console.log('root', root);
            var prods = Array.isArray(root) ? ProductBLL.The(root.map(x => x.ID), stockid) || [] : [];

            // log && console.log('sv roots', root);



            Promotion22.FillBest(root);
            ProductInPaths.Fill(root);
            ProductInPaths.Fill(prods);
            Promotion22.FillBest(prods);

            var pcount = 0;
            if (pi < 1) pi = 1;
            if (ps <= 0) ps = 10;
            var total = root.length;

            var opts = [];
            if (prods.length) {
                var ProductJoins = data.getType('ProductJoinEnt');

                opts = ProductJoins.filter(x => {

                    return prods.filter(p => p.DynamicID != null && p.DynamicID.toLowerCase() == x.SourceCode).length;
                }).map(x => {

                    return {
                        SourceCode: x.SourceCode,
                        TargetCode: x.TargetCode,
                        Opt1: x.Opt1,
                        Opt2: x.Opt2
                    }
                });

            }
            var crList = null;

            var GetComboNonSQL = ProductBLL.GetComboNonSQL;

            function prodInRoot(rootID) {
                crList = prods.filter(z => (GetComboNonSQL(z, rootID)).filter(c => c.Id == rootID).length);
                crList.sort((a, b) => a.RenewDate > b.RenewDate ? 1 : -1);
                return crList;
            }
            function isOptPublic(dynamicID) {
                if (crList != null) {
                    for (var i = 0; i < crList.length; i++) {
                        var x = crList[i];
                        if (x.IsPublic == 1 && opts != null) {
                            if (opts.filter(o => { return o.TargetCode == dynamicID && o.SourceCode == x.DynamicID; }).length) return true;
                        }
                    }
                }
                return false;
            }

            var lst = [];
            for (var i = 0; i < root.length; i++) {
                var x = root[i];
                var z = {
                    root: {
                        ID: x.ID,
                        Title: x.Title,
                        Desc: x.Desc,
                        Detail: x.Detail,
                        PriceProduct: x.PriceProduct,
                        Thumbnail: x.Thumbnail,
                        PriceSale: x.PriceSale,
                        SaleBegin: x.SaleBegin,
                        SaleEnd: x.SaleEnd,// "2022-03-15T17:13:00.203",
                        IsDisplayPrice: x.IsDisplayPrice,
                        Cates: x.Paths, //[]
                        OnStocks: x.OnStocks,
                        Status: x.Status,
                        IsRootPublic: x.IsRootPublic
                    },
                    items: []
                }
                var coThe = false;
                prodInRoot(x.ID).forEach(x2 => {
                    coThe = true;
                    var IsOptPublic = isOptPublic(x2.DynamicID);

                    if (!x2.IsInStockID) {
                        x2.IsInStockID = function (StockID) {
                            var p = this;
                            if (!p.OnStocks) return false;
                            return `,${p.OnStocks},`.indexOf('*') > -1 || `,${p.OnStocks},`.indexOf(`,${StockID},`) > -1
                        }
                    }

                    if (!x2.IsInStockID(StockID)) return;
                    z.items.push(
                        {
                            ID: x2.ID,
                            Title: x2.Title,
                            Desc: x2.Desc,
                            Detail: x2.Detail,
                            PriceProduct: x2.PriceProduct,
                            Thumbnail: x2.Thumbnail,
                            PriceSale: x2.PriceSale,
                            SaleBegin: x2.SaleBegin,
                            SaleEnd: x2.SaleEnd,
                            IsDisplayPrice: x2.IsDisplayPrice,

                            IsPublic: x2.IsPublic,
                            IsOptPublic: IsOptPublic,
                            OnStocks: x2.OnStocks,
                            Status: x2.Status,
                            IsRootPublic: x2.IsRootPublic
                        });
                })
                if (coThe && z.items.Count == 0) continue;
                lst.push(z);
            }

            //log && console.log('lst',lst);

            var pg = paging(lst, pi, ps);
            pg.MemberSelectStockID = 0;

            //log && console.log('get_sv', lst);

            return new Promise((resolve) => {
                fetch(`${SERVER}/api/v3/JsonCache@get?type=ProductEnt&ids=${p.rootIds}`, {
                    credentials: 'same-origin'
                })
                    .then(x => x.json()).then(rs => {
                        //var p = rs.list[0] || {};
                        //if (pg.length > 0 && pg[0].root) pg[0].root.Detail = p.Detail;
                        pg.lst.forEach(r => {

                            rs.list.every(z => {
                                if (z.ID == r.root.ID) {
                                    r.root.Detail = z.Detail;
                                    return false;
                                }
                                return true;
                            })

                        })
                        

                        resolve({
                            data: pg
                        })

                    }).catch(e => {
                        resolve({
                            data: pg
                        })
                    });
            })


        }
    }


    function getVoucherForOrder() {
        var rs = voucherCont;
        var arr = [];
        if (rs && Array.isArray(rs.danh_sach) && data) {
            var prods = data.getType('ProductEnt');

            rs.danh_sach.forEach(vItem => {
                if (!vItem.Voucher) return;
                var vo = clone(vItem.Voucher);
                vo.Items = [];

                var OrderQtyCount = 0;

                //console.log(vo.Code);

                items.forEach(oi => {
                    var prod = prods.filter(p => p.ID == oi.ProdID)[0];

                    //console.log(vo.Code, oi.ID);

                    if (prod == null) return;

                    //log && console.log('voucherForOrder', vo, oi);

                    if (!validApply(vo, oi)) {
                        //log && console.log('!validApply',vo.Code, oi.ID, prod);
                        //OrderQtyCount += oi.Qty ?? 0;
                        log && console.log('getVoucherForOrder.validApply invalid');
                        return;
                    }
                    var v = vo;


                    var pass = false;

                    var invalidCase = '';

                    var forMe = !v.MemberID || v.MemberID == member.ID;

                    //log && console.log('forMe', forMe, `,${v.ForProds},`.indexOf(`,${oi.ProdID},`));

                    if (forMe) {
                        pass = true;
                    }

                    if (forMe ||  v.ForAll) {
                        pass = true;
                    } else {
                        invalidCase += '1';
                        //pass = false;
                    }
                    if (v.ForProds && `,${v.ForProds},`.indexOf(`,${oi.ProdID},`) == -1) {
                        v.invalid = true;
                        invalidCase += '2';
                        pass = false;
                        vo.invalid = true;
                    }

                    log && console.log(['ForCates 1', v.ForCates, data.getTree('type', v.ForCates).indexOf(oi.ProdType), pass]);

                    if ( v.ForCates && data.getTree('type', v.ForCates).indexOf(oi.ProdType) == -1) {
                        v.invalid = true;
                        invalidCase += '3';
                        pass = false;
                        vo.invalid = true;
                    }

                    log && console.log(['ForCates 12', pass]);
                    

                    //console.log(vo.Code, v.OrderItemQtyMax, oi.Qty, pass);

                    if (v.OrderItemQtyMax > 0 && pass) {

                        if (v.OrderItemQtyMax < oi.Qty) {
                            v.invalid = true;
                            pass = false;
                            log && console.log('invalid', vo.Code, [v.OrderItemQtyMax, oi.Qty], oi);
                            invalidCase += '4';
                            //return;
                            log && console.log(['ForCates 13', pass]);
                        }
                    }

                    if (v.OrderQtyMax > 0 && pass) {
                        if (v.OrderQtyMax < OrderQtyCount + oi.Qty) {
                            pass = false;
                            v.invalid = true;
                            log && console.log('invalid2', vo.Code, [v.OrderQtyMax, OrderQtyCount, oi.Qty], oi);
                            invalidCase += '5';
                            //return;
                            log && console.log(['ForCates 14', pass]);
                        }
                    }


                    // log && console.log('getVoucherForOrder.pass', pass, invalidCase, v);


                    if (pass) {

                        var dc = v.Discount <= 100 ? toDiscount(oi.ToMoney, v.Discount) : v.Discount || 0;
                        vo.Items.push({
                            ID: oi.ID,
                            Percent: v.Discount <= 100 ? v.Discount : 0,
                            Discount: dc,
                            NewToPay: oi.ToMoney - dc
                        })
                        OrderQtyCount += oi.Qty ?? 0;
                    }

                    //console.log(vo.Code, OrderQtyCount, pass, oi);

                    log && console.log('pass:' + vo.Code, pass, invalidCase);

                });

                //log && console.log('vo.invalid', vo.invalid, vo);

                if (vo.invalid) {

                    return;
                }



                //log && console.log('end check', vo);
                if (vo.Items.length) {
                    arr.push(vo);
                }
            })
        }
        return arr;
    }



    var calcLog = [];
    function calc() {
        order.Total = 0;
        order.ToPay = 0;
        order.ToMoney = 0;
        order.TotalValue = 0;

        order.VoucherID = 0;
        order.VoucherDiscount = 0;
        order.VoucherFix = 0;

        var vEnt = null;
        var vPercent = false;
        var VoucherFix = 0;
        var prods = data.getType('ProductEnt');

        //console.log(voucherCont);

        

        if (order.VCode) {

            var segs = order.VCode.split('-');
            var vcode = segs[0];
            var vAffid = segs.length > 1 ? parseInt(segs[1]) : 0;



            //vEnt = data.getType('VoucherEnt').filter(x => x.Code == vcode)[0];




            if (Array.isArray(voucherCont.danh_sach)) {
                voucherCont.danh_sach.every(z => {
                    if (z.ma == vcode) {
                        vEnt = z.Voucher;
                        return false;
                    }
                    return true;
                })
            }

            //danh_sach_an
            if (!vEnt) {
                if (Array.isArray(voucherCont.danh_sach_an)) {
                    voucherCont.danh_sach_an.every(z => {
                        if (z.ma == vcode) {
                            vEnt = z.Voucher;
                            return false;
                        }
                        return true;
                    })
                }
            }

            //khac
            if (!vEnt) {
                if (Array.isArray(voucherCont.khac)) {
                    voucherCont.khac.every(z => {
                        if (z.ma == vcode) {
                            vEnt = z.Voucher;
                            return false;
                        }
                        return true;
                    })
                }
            }

            // console.log(vEnt, vcode);
            if (vEnt) {
                vEnt.AffID = vAffid;
            }
            //console.log(vEnt);
            if (!vEnt) {
                order.VCode = "";
            }
            else {

                order.VoucherID = vEnt.ID;
                vPercent = (vEnt.Discount || 0) <= 100;
                if (!vPercent) VoucherFix = vEnt.Discount;

            }
        }

        log && console.log('order.VCode', order.VCode, vEnt);
        if (order.VoucherDeny)
            delete order.VoucherDeny;
        if (vEnt) {
            var d = new Date();
            function _2(x) {
                return x < 10 ? '0' + x : x;
            }
            log && console.log('DenyDay - DenyHour', vEnt.DenyDay, vEnt.DenyHour);
            if (vEnt.DenyDay) {

                var invalidDay = null;
                `${vEnt.DenyDay}`.split(/\;|\'/gmi).every(seg => {
                    var x = seg.trim();
                    var arr = x.split(/\/|\\| |\:/gmi);
                    var z = arr[0].toUpperCase();
                    switch (arr.length) {
                        case 1:
                            switch (z) {
                                case 'CN':
                                    if (d.getDay() == 0) {
                                        invalidDay = z;
                                        break;
                                    }
                                    break;
                                case 'T2':
                                    if (d.getDay() == 1) {
                                        invalidDay = z;
                                        break;
                                    }
                                    break;
                                case 'T3':
                                    if (d.getDay() == 2) {
                                        invalidDay = z;
                                        break;
                                    }
                                    break;
                                case 'T4':
                                    if (d.getDay() == 3) {
                                        invalidDay = z;
                                        break;
                                    }
                                    break;
                                case 'T5':
                                    if (d.getDay() == 4) {
                                        invalidDay = z;
                                        break;
                                    }
                                    break;
                                case 'T6':
                                    if (d.getDay() == 5) {
                                        invalidDay = z;
                                        break;
                                    }
                                    break;
                                case 'T7':
                                    if (d.getDay() == 6) {
                                        invalidDay = z;
                                        break;
                                    }
                                    break;
                                default:
                                    var n = parseInt(arr[0]);
                                    if (n > 0 && n == d.getDate()) {
                                        invalidDay = z;
                                        break;
                                    }
                                    break;
                            }
                            break;
                        case 2:
                            if (`${_2(d.getDate())}/${_2(d.getMonth() + 1)}` == x
                                || `${_2(d.getDate())}/${_2(d.getMonth() + 1)}/${d.getFullYear()}` == x
                            ) {
                                invalidDay = x; break;
                            }
                            break;
                        case 3:
                            if (`${_2(d.getDate())}/${_2(d.getMonth() + 1)}/${d.getFullYear()}` == x) {
                                invalidDay = x; break;
                            }
                            break;
                    }

                    return invalidDay === null;
                })

                if (invalidDay) {
                    order.VoucherDeny = `Khung ngày không hợp lệ - ${invalidDay}`;
                    order.VCode = '';
                    vEnt = null;
                }

            }
            if (vEnt && vEnt.DenyHour && !order.VoucherDeny) {
                var invalidHour = null;
                `${vEnt.DenyHour}`.split(/\,|\;/gmi).every(seg => {
                    var arr = seg.split('-');
                    if (arr.length != 2) return true;
                    var from = arr[0].trim();
                    var to = arr[1].trim();

                    var tod = `${_2(d.getHours())}:${_2(d.getMinutes())}`;

                   

                    if (tod >= from && tod <= to) {
                        invalidHour = seg;
                    }

                    //log && console.log('DenyHour', [from, to, tod, invalidHour])

                    return invalidHour == null;
                })

                if (invalidHour) {
                    order.VCode = '';
                    vEnt = null;
                    order.VoucherDeny = `Khung giờ không hợp lệ - ${invalidHour}`
                }
            }
        }

        var i = 0;


        var OrderItemQtyValue = [];
        var voucherQtyValue = [];

        var totalToMoney = 0;
        var totalValueOnVoucher = 0;

        var OrderQtyCount = 0;
        var voucherInvalid = false;

        var vPerc = false;
        if (vEnt && vEnt.Meta) {
            try {
                var m = JSON.parse(vEnt.Meta);
                if (m && m.Perc) {
                    vPerc = m.Perc;
                }
            } catch {

            }
        }
        log && console.log('vPerc', vPerc);

        while (i < items.length) {
            var oi = items[i];
            var prod = prods.filter(p => p.ID == oi.ProdID)[0];



            oi.PriceOrder = prod.PriceSale || prod.PriceProduct;

            //log && console.log('oi.PriceOrder', oi.PriceOrder, prod.PriceSale, prod.PriceProduct);



            if (oi.Qty == 0 || !prod) {
                items.splice(i, 1);
                continue;
            }

            oi.ProdType = prod.Type;
            oi.hasVoucher = function (v) {
                var oi = this;

                var pass = false;

                //log && console.log('oi.Price', oi.Price, oi.PriceOrder, prod);

                if (!validApply(v, oi, 'inCalc')) {
                    //log && console.log('hasVoucher invalid');
                    return pass;
                }

                var forMe = !v.MemberID || v.MemberID == member.ID;

                //log && console.log('forMe', forMe, `,${v.ForProds},`.indexOf(`,${oi.ProdID},`));

                if (forMe) {
                    pass = true;
                }

                //console.log(validApply(v, oi), oi, v,  prod);

                if (v.MemberID && vPerc) {
                    pass = true;
                }


                if (v.ForAll) {
                    pass = true;
                }
                if (v.ForProds && `,${v.ForProds},`.indexOf(`,${oi.ProdID},`) == -1) {
                    pass = false;
                }

                log && console.log([v.ForCates, data.getTree('type', v.ForCates).indexOf(oi.ProdType)]);


                if ( v.ForCates && data.getTree('type', v.ForCates).indexOf(oi.ProdType) == -1) {
                    pass = false;
                }




                if (v.OrderItemQtyMax > 0 && v.OrderItemQtyMax < oi.Qty && pass) {
                    voucherInvalid = true;
                    //log && console.log('oi.hasVoucherInvalid1', v.OrderItemQtyMax, oi.Qty, v);
                    return false;
                }

                if (v.OrderQtyMax > 0 && v.OrderQtyMax < OrderQtyCount + oi.Qty && pass) {
                    voucherInvalid = true;
                    //log && console.log('oi.hasVoucherInvalid2', v.OrderQtyMax, OrderQtyCount +  oi.Qty);
                    return false;
                }
                if (pass) OrderQtyCount += oi.Qty ?? 0;

                log && console.log('hasVoucher', pass, oi, v);

                return pass;
            }

            oi.Thumbnail = prod.Thumbnail;
            oi.ProdCombo = prod.Combo;

            totalToMoney = oi.Qty * oi.PriceOrder;

            //reset de tinh toan lai
            oi.PP_ID = 0;
            oi.PP_Title = "";
            oi.PP_Value = 0;
            oi.PP2_ID = 0;
            oi.PP2_Title = "";
            oi.PP2_Value = 0;
            //oi.PriceOrder = 0;

            PromotionProgramBLL.OnOrderItemPrice(oi, order, prod, promotionOSInsertContext);
            PromotionProgramBLL.OnOrderItemOS(oi, order, prod, promotionOSInsertContext);
            //log && console.log('PromotionProgramBLL.OnOrderItemOS', oi);

            //log && console.log('oi.PriceOrder2', oi.PriceOrder);



            OrderItemQtyValue.push({
                Qty: oi.Qty,
                Value: oi.Qty * oi.PriceOrder,
                Prod: prod,
                ID: oi.ID
            })
            var has = oi.hasVoucher(vEnt);
            log && console.log('voucherQtyValue*', vEnt, has)
            if (order.VoucherID > 0 && vEnt && has) {
                voucherQtyValue.push({
                    Qty: oi.Qty,
                    Value: oi.Qty * oi.PriceOrder,
                    Prod: prod,
                    ID: oi.ID
                });
                totalValueOnVoucher += oi.Qty * oi.PriceOrder
            } else {
                // log && console.log('voucherQtyValue*', vEnt, has)
            }



            oi.prod = prod;
            i++;
        }


        OrderItemQtyValue.forEach(x => {
            x.RatioValue = totalToMoney == 0 ? 0 : x.Value / totalToMoney;
        });
        voucherQtyValue.forEach(y => {
            y.RatioValue = totalToMoney == 0 ? 0 : y.Value / totalValueOnVoucher;
        });

        //log && console.log('order.VoucherID',order.VoucherID);

        var totalValueBeforeVoucher = 0;
        var totalValueAndOriginBeforeVoucher = 0;
        var RemainVoucherFix = VoucherFix;
        var vHasUsed = false;
        var promotionOSInsertContext = {};

        var thumbs = [];
        var total0 = 0;


        OrderQtyCount = 0;
        items.forEach((oi, oiIndex) => {

            var qtyValue = OrderItemQtyValue.filter(x => x.ID == oi.ID)[0];
            var vQtyValue = voucherQtyValue.filter(x => x.ID == oi.ID)[0] || { RatioValue: 0 };

            var Qty = qtyValue.Qty;
            var prod = qtyValue.Prod;

            Promotion22.StockID = order.StockID;
            //log && console.log('Promotion22.StockID', Promotion22.StockID);
            Promotion22.FillBest(prod);

            oi.Price = prod.PriceProduct;
            oi.PriceOrder = prod.PriceSale || prod.PriceProduct;

            //log && console.log('PriceSale', Promotion22.StockID, order);

            order.ToMoney += oi.Qty * oi.Price;
            total0 += Qty * oi.Price;

            if (oi.ProdThumb) thumbs.push(oi.ProdThumb);



            totalValueBeforeVoucher = Qty * oi.PriceOrder;
            totalValueAndOriginBeforeVoucher = Qty * (oi.PriceOrderOrigin || oi.PriceOrder);
            //


            oi.ToMoney = Math.round(oi.Qty * oi.PriceOrder);
            oi.VoucherCode = "";
            oi.VoucherValue = 0;

            //console.log(vPercent, vQtyValue, VoucherFix);

            if (order.VoucherID > 0) {
                oi.VoucherCode = '';
                oi.VoucherValue = 0;
                oi.ToPay = oi.ToMoney;
                if (validApply(vEnt, oi)) {



                    if (oi.hasVoucher(vEnt)) {
                        var v = vEnt;
                        oi.VoucherCode = vEnt.Code;

                        if (vEnt.ValueType == 2) {
                            //no code here
                            oi.ToPay = (vEnt.Discount || 0) * (oi.Qty || 0);
                            oi.VoucherValue = oi.ToMoney - oi.ToPay;
                            //oi.VoucherValue = Math.max(0, oi.VoucherValue || 0);
                            oi.VoucherValue = oi.VoucherValue < 0 ? oi.ToMoney : oi.VoucherValue;

                        }

                        else if (vPercent) {

                            var dc = v.Discount <= 100 ? toDiscount(oi.ToMoney, v.Discount) : (v.Discount || 0);

                            oi.VoucherValue = dc;
                        } else {
                            oi.VoucherValue = parseFloat(VoucherFix) * vQtyValue.RatioValue;
                            oi.VoucherValue = Math.round(oi.VoucherValue);
                            if (!oi.VoucherValue) oi.VoucherValue = 0;
                            RemainVoucherFix = Math.max(0, RemainVoucherFix - oi.VoucherValue);

                            //console.log(RemainVoucherFix);
                        }

                        vHasUsed = vEnt.ValueType == 2 || oi.VoucherValue != 0 ? true : vHasUsed;
                        // log && console.log('oi.VoucherCode', oi.VoucherCode, vHasUsed);
                    }


                }





            }

            oi.VoucherValue = Math.min(oi.VoucherValue, (oi.ToMoney ?? 0));

            //log && console.log('oi.VoucherValue', oi.VoucherValue, vQtyValue, voucherQtyValue);

            if (RemainVoucherFix > 0 && oiIndex == items.length) {
                oi.VoucherValue += Math.round(RemainVoucherFix);//fixe lỗi thiếu 1đ khi chia đều
            }

            if (!vEnt || vEnt.ValueType != 2)
                oi.ToPay = oi.ToMoney - oi.VoucherValue;
            //log && console.log('RemainVoucherFix', RemainVoucherFix, oi.VoucherValue, oi.ToPay, vQtyValue.RatioValue);
            if (vPercent) {
                oi.ToPay = Math.round(oi.ToPay, 1);
                oi.VoucherValue = oi.ToMoney - oi.ToPay;
            }




            //
            //if (vHasUsed && vEnt && vEnt.ValueType == 2) {
            //    if (oi.PriceOrderOrigin == null) {
            //        oi.PriceOrderOrigin = oi.PriceOrder;
            //    }

            //    oi.PriceOrder = vEnt.Discount;
            //    oi.ToMoney = WebControl.RoundInt(oi.Qty * oi.PriceOrder ?? 0);

            //    oi.VoucherValue = WebControl.RoundInt((oi.Qty ?? 0) * (oi.PriceOrderOrigin ?? 0) - (oi.ToPay ?? 0));
            //    oi.ToPay = oi.ToMoney;
            //}


            //

            order.Total += oi.Qty;
            order.TotalValue += oi.ToPay;
            delete oi.prod;
        })

        //log && console.log('voucherInvalid', voucherInvalid);

        var _ToPay = order.ToPay;
      
        log && console.log('_ToPay', _ToPay);

        if (vEnt && vEnt.OrderItemQtyMin) {
            var totalForVMin = 0;
            var totalForVMinCount = 0;
            var hasMinError = false;


            items.forEach(oi => {
                if (
                    !vEnt.ForProds && !vEnt.ForCates 
                    || vEnt.ForProds && `${vEnt.ForProds}`.split(',').filter(v => v == `${oi.ProdID}`).length
                    || vEnt.ForCates && `${vEnt.ForCates}`.split(',').filter(v => v == `${oi.ProdType}`).length) {
                    totalForVMin += oi.Qty || 0;
                }
            })

           
            if (totalForVMin < vEnt.OrderItemQtyMin && vEnt.OrderItemQtyMin > 0) {
                voucherInvalid = true;
                hasMinError = true;
                items.forEach(oi => {
                    oi.ToPay = oi.ToMoney;
                    oi.VoucherCode = "";
                    oi.VoucherValue = 0;
                })
            }


        }


        if (voucherInvalid) {
            vEnt = null;
            //order.Total = oi.Qty;
            order.TotalValue = 0;

            items.forEach(oi => {
                oi.VoucherCode = '';
                oi.VoucherValue = 0;
                oi.ToPay = oi.ToMoney;
                order.Total += oi.Qty;
                order.TotalValue += oi.ToPay;
            })
        }

        //order.VoucherDiscount = vEnt ? order.ToMoney - order.TotalValue : 0;
        order.ToPay = order.TotalValue;
        order.RemainPay = - order.ToPay;
        if (thumbs.length > 0) order.Thumb1 = thumbs[0];
        if (thumbs.length > 1) order.Thumb2 = thumbs[1];
        if (thumbs.length > 2) order.Thumb3 = thumbs[2];


        order.TotalProdValue = total0;
        order.Voucher = null;


        var hasApplyVoucher = items.filter(x => x.VoucherCode).length > 0;

        if (vEnt && hasApplyVoucher && !order.VoucherDeny) {
            order.Voucher = vEnt;
            order.VoucherDiscount = order.ToMoney - order.TotalValue;
            order.VoucherFix = VoucherFix;
            order.VoucherDiscount = vEnt.Discount <= 100 ? vEnt.Discount : 0;
            //console.log(vEnt, order.Voucher, order.VoucherDiscount);
            //order.Voucher.Discount = order.VoucherDiscount;
        } else {
            order.VCode = '';
            order.Voucher = null;
            order.VoucherID = 0;
            order.VoucherFix = 0;
            order.VoucherSamePrice = null;
        }


        if (vEnt != null && vEnt.ValueType == 2 && hasApplyVoucher && !order.VoucherDeny) {

            log && console.log('totalValueAndOriginBeforeVoucher', totalValueAndOriginBeforeVoucher);

            order.VoucherSamePrice = order.VoucherFix;
            order.VoucherFix = 0;
            order.ToMoney = order.TotalValue;
            order.TotalValue = totalValueAndOriginBeforeVoucher;

        }
        else {
            order.VoucherSamePrice = null;
        }

        //log && console.log('order', order);

        order.MetaJSON = '';
        window.order = order;
        window.items = items;

        if (vAffid && vEnt && GlobalConfigPath('$.Admin.maff', v => v == true) && !member.AFFMemberID) {
            member.AFFMemberID = vAffid;
            var user = getMember();
            user.AFFMemberID = vAffid;
            localStorage.setItem('user', JSON.stringify(user));
        }
    }

    var recentvoucherandaff = {
        data: null,
        time: null
    }

    function getServerVouchers() {
        return new Promise((resolve) => {
            var opt = {
                baseURL: window.SERVER,
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                },
                //timeout:1,
            };
            if (recentvoucherandaff.time && new Date().getTime() - recentvoucherandaff.time < 1000) {
                voucherCont = recentvoucherandaff.data;
                window.VoucherInfo = recentvoucherandaff.data;
                log && console.log('recentvoucherandaff');
                resolve();

                return;

            }

            var x = axios.create(opt);
            x.get(`/app/index.aspx?cmd=voucherandaff&mid=${member.ID}&a=1`)
                .then(rs => {
                    //console.log(rs);
                    voucherCont = rs.data.data;
                    window.VoucherInfo = rs.data.data;

                    recentvoucherandaff.data = rs.data.data;
                    recentvoucherandaff.time = new Date().getTime();

                    resolve();
                }).catch(e => {
                    //voucherCont.danh_sach.length = 0;
                    //voucherCont.tot_nhat = null;
                    resolve();
                })
        })
    }
    function reset() {
        items.length = 0;
        for (var k in order) {
            switch (typeof order[k]) {
                case 'number':
                    order[k] = 0;
                    break;
                case 'string':
                    order[k] = '';
                    break;
                default:
                    if (Array.isArray(order[k])) {
                        order[k].length = 0;
                    } else {
                        order[k] = null;
                    }
                    break;
            }
        }
    }

    //only one first
    var orderz = localStorage.getItem('orderz');
    if (orderz) {
        try {
            var arr = JSON.parse(orderz);
            order = arr[0];
            items = arr[1];
        } catch {

        }
    }

    window.OrderClient = function () {
        var args = arguments;
        return new Promise((resolve, reject) => {

            calcLog.length = 0;

            ClientZData().then(_data => {
                console.log('_data',_data);
                try {
                    data = _data;

                    var url = args[0];
                    var opt = args[1] || {};
                    var Param = urlParams(url);
                    //log && console.log('input', opt, Param);
                    window.url = url;

                    MemberGroups = null;
                    CurrentMemberID = null;

                    if (Object.getPrototypeOf(url).isForProd) {

                        switch (Param.cmd) {
                            case 'getid':
                                resolve(ProductBLL.getid(url, opt, Param));
                                return;
                            case 'search_prods':
                                resolve(ProductBLL.search_prods(url, opt, Param));
                                return;

                        }

                        if (Param.get == 'sv') {

                            ProductBLL.get_sv(url, opt, Param).then(rs => {
                                resolve(rs);
                            })

                            
                           
                            return;
                        }

                    }


                    var prods = data.getType('ProductEnt');

                    var mem = getMember();
                    member = mem;
                    member.ID = mem.acc_id;

                    if (Param.cmd == "voucherandaff") {
                        getServerVouchers().then(() => {
                            resolve({
                                success: true,
                                data: {
                                    data: voucherCont
                                }
                            });
                        })
                        return;
                    }

                    if (order.SenderID != member.ID) {
                        reset();
                    }


                    //log && console.log('vinput', Param, Param.cmd, opt);


                    var isCalc = false;
                    var od = opt.order || {};
                    var isSend = false;
                    var voucherChange = opt.voucherForOrder === true ? true : false;

                    if (typeof od === 'object') {
                        for (var k in od) {
                            if (k == 'ID') continue;
                            if (k == 'VCode') {
                                if (od.VCode == null || od.VCode == undefined) continue;
                                if (order[k] != od[k]) voucherChange = true;
                            }
                            if (k == 'Status' && order[k] != od[k] && od[k] == 'user_sent') isSend = true;
                            order[k] = od[k];
                        }
                    }

                    if (opt && opt.forceStockID) {
                        var stockID = parseInt(opt.forceStockID) || 0;
                        if (order.StockID != stockID) {
                            order.StockID = stockID;
                            order.Source = stockID;
                            isCalc = true;
                        }
                    }


                    if (Param.cmd === 'precheck') {
                        var vinput = Param.vcode;
                        voucherChange = true;
                        order.VCode = vinput;
                        //log && console.log('vinput', vinput);
                    }


                    function output(isend) {
                        order.VoucherCode = order.VCode;
                        var result = {
                            data: {
                                success: true,
                                data: {
                                    dfItem: dfItem(),
                                    items: clone(items),
                                    order: clone(order),
                                    vouchers: getVoucherForOrder(),
                                    mm: 0
                                }
                            }
                        }

                        if (isend) {
                            reset();
                            localStorage.removeItem('orderz');
                        } else {
                            localStorage.setItem('orderz', JSON.stringify([order, items]));
                        }
                        log && console.log('output', result, order.VoucherCode);
                        resolve(result)
                    }

                    var CurrentStockID = parseInt(localStorage.getItem('CurrentStockID'));
                    function fn() {
                        order.SenderAddress = member.HomeAddress || '';
                        order.SenderName = member.FullName || '';
                        order.SenderPhone = member.MobilePhone || '';
                        order.SenderEmail = member.Email || '';

                        log && console.log('member.AFFMemberID', [member.AFFMemberID, order.AffId, GlobalConfigPath('$.Admin.maff', v => v == true)])

                        if (member.AFFMemberID && !order.AffId && GlobalConfigPath('$.Admin.maff', v => v == true)) {
                           // order.AffId = member.AFFMemberID;
                        }

                        //log && console.log('VCode',order.VCode);

                        if (Array.isArray(opt.adds)) {
                            //opt= {"order":{"ID":0,"SenderID":32870,...},"adds":[{"ProdID":17597,"Qty":1}]}
                            opt.adds.forEach(add => {

                               

                                var _prod = prods.filter(p => p.ID == add.ProdID)[0];

                                var prod = clone(_prod);


                                if (!prod || add.Qty == 0) {
                                    //remove
                                    deleteItem(prod.ID, 'ProdID');
                                } else {
                                    updateItem(prod, add.Qty);
                                }
                                isCalc = true;
                            });
                        }

                        if (Array.isArray(opt.edits)) {
                            opt.edits.forEach(edit => {
                                var oi = items.filter(oi => oi.ID == edit.ID)[0];
                                if (!oi) return;
                                if (oi.Qty == 0) {
                                    //remove
                                    deleteItem(oi.ID);
                                } else {
                                    for (var k in edit) {
                                        oi[k] = edit[k];
                                    }
                                }
                                isCalc = true;
                            });
                        }

                        if (Array.isArray(opt.deleteds)) {
                            //opt= {order: {…}, deleteds: [{ID},...]...}
                            opt.deleteds.forEach(del => {
                                deleteItem(del.ID);
                                isCalc = true;
                            });
                        }

                        if (CurrentStockID && CurrentStockID != order.StockID) {
                            log && console.log('isCalc by #stocks');
                            order.StockID = CurrentStockID;
                            items.forEach(oi => {
                                oi.StockID = CurrentStockID;
                            })
                            isCalc = true;
                        }

                        //log && console.log('Vcode', order.VCode);

                        if (isCalc) {
                            log && console.log('calc');
                            calc();
                        }

                        output();
                    }

                    if (isSend) {

                        rawAxios().post(`/api/v3/orderclient24@Send?token=${localStorage.getItem('token')}`, {
                            client: {
                                items: items,
                                order: order,
                            }
                        }).then(rs => {
                            log && console.log('rs', rs);
                            if (rs.data.errors) {
                                order.Status = '';
                                resolve({
                                    data: {
                                        success: true,
                                        data: {
                                            errors: rs.data.errors
                                        },
                                        errors: rs.data.errors
                                    }
                                });

                                return;
                            }
                            var od = rs.data.Order;
                            if (od && od.ID) {
                                order.ID = od.ID;
                            }
                            output(true);
                            //reset();
                            console.log(rs);
                            window.OnOrderClient && window.OnOrderClient({
                                Order: rs.data.Order,
                                action: 'ORDER_NEW'
                            })
                          

                        }).catch(e => {
                            //reject(e);
                            console.error(e);
                        });

                        return;
                    }

                    isCalc = voucherChange ? true : isCalc;

                    log && console.log('isCalc', isCalc);

                    if (!isCalc) {

                        if (CurrentStockID && CurrentStockID != order.StockID) {
                            isCalc = true;

                        }
                    }




                    if (voucherChange) {
                        if (order.VCode == '' && !opt.voucherForOrder) {
                            order.Voucher = null;
                            fn();
                        } else {
                            //console.log('getServerVouchers');
                            getServerVouchers().then(fn);
                        }

                    } else {
                        fn();
                    }



                } catch (e) {
                    reject({
                        error: e
                    });
                }
            }).catch(e => {
                reject(e);
            });




        })
    }

})();

let http = ClientZ
export default http
