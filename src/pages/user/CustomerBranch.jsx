import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import { Icon, Page, Select, Text, useNavigate } from "zmp-ui";
import { useLayout } from "../../layout/LayoutProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  CheckBadgeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import AdvAPI from "../../api/adv.api";
import clsx from "clsx";
import {
  MapIcon,
  PaperAirplaneIcon,
  PhoneArrowDownLeftIcon,
} from "@heroicons/react/24/outline";
import { openWebview } from "zmp-sdk";
import { Link } from "react-router-dom";

const CustomerBranch = () => {
  const navigate = useNavigate();
  let [CrStock, setCrStock] = useState(null);
  let { Stocks, GlobalConfig } = useLayout();
  const [ListStocks, setListStocks] = useState([]);

  const [StocksList, setStocksList] = useState([]);
  const [ProvincesList, setProvincesList] = useState([]);

  let [ActiveProvinces, setActiveProvinces] = useState(null);
  let [ActiveDistricts, setActiveDistricts] = useState(null);

  useEffect(() => {
    setListStocks((prevState) => [...prevState, ...Stocks]);
    if (Stocks && Stocks.length > 0) {
      setCrStock(Stocks[0]);
    }
  }, [Stocks]);

  useQuery({
    queryKey: ["AdvBranch"],
    queryFn: async () => {
      const { data } = await AdvAPI.getAdvName("APP.COSO");
      return data?.data
        ? data?.data.map((x) => ({
          ...x,
          Map: x.Link,
          LinkSEO: x.FileName,
          DescSEO: x.Follow,
        }))
        : [];
    },
    onSuccess: (data) => {
      setListStocks((prevState) => [...prevState, ...data]);
    },
  });

  useEffect(() => {
    if (ListStocks) {
      let newStocks = [];
      let Provinces = [];

      for (let x of ListStocks) {
        let obj = {
          ...x,
        };
        let newDesc = x.DescSEO ? JSON.parse(x.DescSEO) : null;

        if (newDesc && newDesc.place && newDesc.place.length > 0) {
          obj.Province = newDesc.place.filter((o) => o.Parentid > 0)[0];
          obj.District = newDesc.place.filter((o) => !o.Parentid)[0];
        }
        newStocks.push(obj);
      }

      for (let province of newStocks) {
        let index = Provinces.findIndex(
          (x) =>
            province?.Province?.Parentid &&
            Number(province?.Province?.Parentid) === Number(x.Parentid),
        );
        if (index > -1) {
          let indexDistr = Provinces[index].Districts.findIndex(
            (o) => o.ID === province?.District?.ID,
          );
          if (indexDistr === -1) {
            Provinces[index].Districts.push({
              ...province?.District,
              label: province?.District?.Title || null,
              value: province?.District?.ID || null,
            });
          }
        } else if (province?.Province) {
          Provinces.push({
            ...province?.Province,
            label: province?.Province?.Title || null,
            value: province?.Province?.Parentid
              ? province?.Province?.Parentid.toString()
              : null,
            Districts: [
              {
                ...province?.District,
                label: province?.District?.Title || null,
                value: province?.District?.ID || null,
              },
            ],
          });
        }
      }

      newStocks = newStocks?.sort(
        (a, b) =>
          Number(a?.Province?.Parentid || 0) -
          Number(b?.Province?.Parentid || 0),
      );
      setStocksList(newStocks);
      setProvincesList(Provinces);
    }
  }, [ListStocks]);

  const openMaps = (item) => {
    openWebview({
      url: `https://www.google.com/maps/dir/?api=1&destination=${item?.Desc.split(
        " ",
      ).join("+")}`,
    });
  };

  return (
    <Page className="page !pb-0" hideScrollbar>
      <div className="navbar fixed top-0 left-0 min-w-[100vw] max-w-[100vw] z-[999] bg-white">
        <div className="w-2/3 relative flex items-center h-full pl-10">
          <div
            className="absolute left-0 w-10 h-full flex justify-center items-center cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <Icon icon="zi-chevron-left-header" className="text-app" />
          </div>
          <Text.Title className="text-app">Hệ thống chi nhánh</Text.Title>
        </div>
      </div>
      {GlobalConfig?.APP?.ByProvince ? (
        <div className="h-full relative flex flex-col">
          <div className="px-4 grid grid-cols-2 gap-4 py-3 bg-white border-t">
            <div>
              <Select
                placeholder="Chọn tỉnh / thành phố"
                label="Tỉnh / Thành phố"
                onChange={(val) => setActiveProvinces(val)}
                value={ActiveProvinces}
                closeOnSelect
                className="select-not-label"
              >
                {ProvincesList &&
                  ProvincesList.map((item, index) => (
                    <Option
                      value={JSON.stringify(item)}
                      title={item.label}
                      key={index}
                    />
                  ))}
              </Select>
            </div>
            <div>
              <Select
                placeholder="Chọn quận / huyện"
                label="Quận / Huyện"
                onChange={(val) => setActiveDistricts(val)}
                value={ActiveDistricts}
                closeOnSelect
                className="select-not-label"
                disabled={!ActiveDistricts}
              >
                {ActiveProvinces &&
                  JSON.parse(ActiveProvinces).Districts &&
                  JSON.parse(ActiveProvinces).Districts.map((item, index) => (
                    <Option
                      value={JSON.stringify(item.value)}
                      title={item.label}
                      key={index}
                    />
                  ))}
              </Select>
            </div>
          </div>
          <div className="grow overflow-auto p-4">
            <div className="pb-safe-bottom">
              {StocksList &&
                StocksList.map((item, index) => (
                  <Link
                    to={`/user/customer-branch/${item.ID}`}
                    state={item}
                    className={clsx(
                      "border capitalize cursor-pointer relative rounded-lg mb-3 last:mb-0 p-4 bg-white block",
                    )}
                    key={index}
                  >
                    <div className="truncate mb-1 font-semibold text-[16px]">
                      {item.Title}
                    </div>
                    <div
                      className="text-muted font-light"
                      dangerouslySetInnerHTML={{
                        __html: item.Desc || "Đang cập nhập",
                      }}
                    />
                    <div className="flex justify-between mt-2 text-primary">
                      <div className="flex">
                        <PhoneArrowDownLeftIcon className="w-5 mr-1" />
                        {item.FileName || "Đang cập nhập"}
                      </div>
                      <div className="flex">
                        <MapIcon className="w-5 mr-1" />
                        Chỉ đường
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full relative">
          {CrStock?.Map && (
            <iframe
              className="h-full w-full border-0"
              src={CrStock?.Map}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
          <div className="absolute bottom-0 left-0 w-full z-10 pb-safe">
            <div className="p-3">
              <Swiper
                spaceBetween={10}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                slidesPerView="auto"
              >
                {ListStocks.map((maps, index) => (
                  <SwiperSlide style={{ width: "70%" }} key={index}>
                    <div
                      className="bg-white rounded p-3 h-full min-h-[140px] flex flex-col justify-between relative"
                      onClick={() => setCrStock(maps)}
                    >
                      <div
                        className="text-primary absolute right-3 top-3 -rotate-45"
                        onClick={() => openMaps(maps)}
                      >
                        <PaperAirplaneIcon className="w-6" />
                      </div>

                      <div className="font-semibold mb-2 flex items-center">
                        <CheckBadgeIcon
                          className={clsx(
                            "w-5 mr-1.5 transition",
                            maps.ID === CrStock?.ID && "text-success",
                          )}
                        />
                        <span>{maps?.Title}</span>
                      </div>
                      <div>
                        <div className="flex mb-px">
                          <div className="pt-px">
                            <MapPinIcon className="w-3.5 text-muted" />
                          </div>
                          <div
                            className="text-[13px] pl-1.5 flex-1"
                            dangerouslySetInnerHTML={{
                              __html: maps?.Desc || "Chưa xác định",
                            }}
                          ></div>
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="w-3.5 text-muted" />
                          <div
                            className="text-[13px] pl-1.5 flex-1"
                            dangerouslySetInnerHTML={{
                              __html: maps?.LinkSEO || "Chưa xác định",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-success text-xs flex items-center">
                          <div className="w-[5px] h-[5px] rounded-full bg-success mr-1.5"></div>
                          Đang mở cửa
                        </div>
                        <div className="flex items-center space-x-1">
                          {Array(5)
                            .fill()
                            .map((_, index) => (
                              <svg
                                className="w-3.5 h-3.5 text-yellow-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                                key={index}
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                            ))}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
};

export default CustomerBranch;
