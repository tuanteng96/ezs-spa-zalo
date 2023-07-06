import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker, Icon, Tabs, useNavigate, useSnackbar } from 'zmp-ui';
import ConfigsAPI from '../../api/configs.api';
import { useLayout } from '../../layout/LayoutProvider';
import Carousel from 'nuka-carousel'
import clsx from 'clsx';
import { createSearchParams } from 'react-router-dom';

const GroupByCount = (List, Count) => {
  return List.reduce((acc, x, i) => {
    const idx = Math.floor(i / Count)
    acc[idx] = [...(acc[idx] || []), x]
    return acc
  }, [])
}

const settings = {
  wrapAround: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  slideIndex: 0,
  cellSpacing: 10,
  renderBottomCenterControls: () => false,
  renderCenterLeftControls: null,
  renderCenterRightControls: ({ nextDisabled, nextSlide }) => (
    <div
      className="relative font-medium text-sm"
      onClick={nextSlide}
    >
      <div className="pr-9 text-muted">
        Chọn khung giờ khác
      </div>
      <div className="absolute right-0 top-2/4 -translate-y-2/4 text-app">
        <div className="animate-bounceRight"><Icon icon="zi-arrow-right" /></div>
      </div>
    </div>
  )
}

const BookingTime = () => {
  const navigate = useNavigate();
  const { Stocks } = useLayout();

  const [key, setKey] = useState("0")
  const [ListChoose, setListChoose] = useState([])
  const [DateChoose, setDateChoose] = useState()

  const { watch, control, setValue } = useFormContext()
  const { StockID, BookDate } = watch()

  const myRefDate = useRef()

  const { openSnackbar } = useSnackbar();

  useEffect(() => {

    if (BookDate) {
      if (
        moment(BookDate).format('DD-MM-YYYY') ===
        moment().format('DD-MM-YYYY')
      ) {
        setKey('0')
        setDateChoose('')
      } else if (
        moment(BookDate).format('DD-MM-YYYY') ===
        moment().add(1, 'days').format('DD-MM-YYYY')
      ) {
        setKey('1')
        setDateChoose('')
      } else {
        setKey('2')
        setDateChoose(moment(BookDate).toDate())
      }
    }
  }, [])

  const { data: ListLock } = useQuery({
    queryKey: ["ListDisable"],
    queryFn: async () => {
      const { data } = await ConfigsAPI.getNames("giocam");
      let result
      if (data && data.data && data?.data.length > 0) {
        result = data?.data[0].Value ? JSON.parse(data.data[0].Value) : null
      }
      return result || [];
    }
  });

  useEffect(() => {
    getListChoose(DateChoose)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DateChoose, ListLock, StockID])

  const getListChoose = DateChoose => {
    const { TimeOpen, TimeClose, TimeNext } = { "TimeOpen": { "hour": "10", "minute": "00", "second": "00" }, "TimeClose": { "hour": "21", "minute": "00", "second": "00" }, "TimeNext": 15, "AtHome": true, "hideNoteTime": true }
    const newListChoose = []
    let ListDisable = []
    if (ListLock && ListLock.length > 0) {
      const indexLock = ListLock.findIndex(
        item => Number(item.StockID) === Number(StockID)
      )

      if (indexLock > -1) {
        ListDisable = ListLock[indexLock].ListDisable
      }
    }
    for (let index = 0; index < 3; index++) {
      let day = moment().add(index, 'days').toDate()
      if (DateChoose && index === 2) {
        day = DateChoose
      }
      let startDate = moment(day).set(TimeOpen)
      let closeDate = moment(day).set(TimeClose)
      var duration = moment.duration(closeDate.diff(startDate))
      var MinutesTotal = duration.asMinutes()
      let newListTime = []
      for (let minute = 0; minute <= MinutesTotal; minute += TimeNext) {
        const datetime = moment(startDate).add(minute, 'minute').toDate()
        let isDayOff = false
        if (ListDisable && ListDisable.length > 0) {
          const indexDayOf = ListDisable.findIndex(
            x =>
              moment(x.Date, 'DD/MM/YYYY').format('DD/MM/YYYY') ===
              moment(datetime).format('DD/MM/YYYY')
          )
          if (indexDayOf > -1) {
            if (
              ListDisable[indexDayOf].TimeClose &&
              ListDisable[indexDayOf].TimeClose.length > 0
            ) {
              isDayOff = ListDisable[indexDayOf].TimeClose.some(time => {
                const DateStartDayOf = moment(
                  ListDisable[indexDayOf].Date + time.Start,
                  'DD/MM/YYYY HH:mm'
                )
                const DateEndDayOf = moment(
                  ListDisable[indexDayOf].Date + time.End,
                  'DD/MM/YYYY HH:mm'
                )
                let isStart =
                  moment(datetime, 'HH:mm').isSameOrAfter(
                    moment(DateStartDayOf, 'HH:mm')
                  ) ||
                  moment(datetime).format('HH:mm') ===
                  moment(DateStartDayOf).format('HH:mm')
                let isEnd =
                  moment(datetime, 'HH:mm').isSameOrBefore(
                    moment(DateEndDayOf, 'HH:mm')
                  ) ||
                  moment(datetime).format('HH:mm') ===
                  moment(DateEndDayOf).format('HH:mm')
                return isStart && isEnd
              })
            } else {
              isDayOff = true
            }
          }
        }
        newListTime.push({
          Time: datetime,
          Disable: moment().diff(datetime, 'minutes') > 0 || isDayOff
        })
      }

      const TotalDisable = newListTime.filter(o => o.Disable)
      const slideIndex =
        TotalDisable.length > 0 ? Math.floor((TotalDisable.length - 1) / 4) : 0

      let newObj = {
        day: day,
        children: newListTime,
        childrenGroup: GroupByCount(newListTime, 4),
        slideIndex: slideIndex
      }
      newListChoose.push(newObj)
    }
    setListChoose(newListChoose)
  }

  const onNext = () => {
    if (!StockID) {
      openSnackbar({
        text: "Bạn vui lòng chọn cơ sở muốn đặt lịch?",
        type: "error",
      });
    }
    else if (!BookDate) {
      openSnackbar({
        text: "Bạn vui lòng chọn thời gian đặt lịch?",
        type: "error",
      });
    }
    else {
      navigate({
        pathname: "/booking",
        search: createSearchParams({
          Type: "Service",
        }).toString(),
      })
    }
  }

  return (
    <div className="overflow-auto h-full no-scrollbar">
      <div className="bg-white p-3 mt-1.5">
        <div className="mb-3 uppercase font-semibold text-sm">1. Chọn cơ sở gần bạn</div>
        <div className={clsx("grid gap-3", Stocks.length > 1 && 'grid-cols-2')}>
          <Controller
            name="StockID"
            control={control}
            render={({
              field: { ref, ...field },
              fieldState
            }) => (
              <>
                {
                  Stocks && Stocks.map((stock, index) => (
                    <div
                      className={
                        clsx("flex items-center justify-center p-3 rounded-sm cursor-pointer transition", Number(field.value) === stock.ID ? 'bg-app text-white' : 'bg-light')
                      }
                      key={index}
                      onClick={() => field.onChange(stock.ID)}
                    >
                      <div className="font-medium truncate">{stock.Title}</div>
                    </div>
                  ))
                }
              </>
            )}
          />
        </div>
      </div>
      <div className="bg-white p-3 border-t">
        <div className="mb-3 uppercase font-semibold text-sm">2. Chọn thời gian</div>
        <div
          className="hidden"
        >
          <DatePicker
            value={DateChoose ? DateChoose : new Date()}
            mask
            maskClosable
            dateFormat="dd/mm/yyyy"
            title="Chọn ngày đặt lịch"
            suffix={<div ref={myRefDate} />}
            onChange={(value) => {
              setKey("2")
              setDateChoose(value)
              setValue('BookDate', '')
            }}
            startDate={new Date()}
          />
        </div>
        <Controller
          name="BookDate"
          control={control}
          render={({
            field: { ref, ...field },
            fieldState
          }) => (
            <>
              <Tabs
                className="tabs-time-booking"
                activeKey={key}
                onTabClick={(e) => {
                  if (Number(e) < 2) {
                    setKey(e)
                    setDateChoose('')
                    setValue('BookDate', '')
                  }
                  else {
                    myRefDate?.current?.click()
                  }
                }}
              >
                {
                  ListChoose && ListChoose.map((item, index) => (
                    <Tabs.Tab key={index} label={index === 2 ? DateChoose ? moment(DateChoose).format("DD/MM/YYYY") : 'Ngày khác' : moment(item.day).calendar({
                      sameDay: now =>
                        `[Hôm nay]`,
                      nextDay: now =>
                        `[Ngày mai]`
                    })}>
                      <div className="pb-10 slider-booking-time -mx-[5px]">
                        <Carousel key={key} {...{ ...settings, slideIndex: item.slideIndex }}>
                          {item.childrenGroup &&
                            item.childrenGroup.map((group, groupIndex) => (
                              <div key={groupIndex}>
                                {group &&
                                  group.map((time, timeIndex) => (
                                    <div
                                      className="position-relative mb-2.5 last:mb-0"
                                      key={timeIndex}
                                    >
                                      <div
                                        className={clsx(
                                          'h-10 rounded-sm border flex items-center justify-center text-[13px] font-semibold cursor-pointer transition',
                                          time.Disable && 'disabled bg-stripes text-muted',
                                          field.value && moment(field.value).diff(
                                            time.Time,
                                            'minutes'
                                          ) === 0 && 'bg-app text-white !border-app'
                                        )}
                                        onClick={() => !time.Disable && field.onChange(time.Time)}
                                      >
                                        {moment(time.Time).format('HH:mm A')}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            ))}
                        </Carousel>
                      </div>
                    </Tabs.Tab>
                  ))
                }
              </Tabs>
            </>
          )}
        />
      </div>
      <div className="bg-white text-danger p-3 text-sm border-t mb-2">
        (*) Nếu khung giờ bạn chọn đã kín lịch, chúng tôi sẽ liên hệ trực tiếp
        để thông báo.
      </div>
      <div className="fixed bottom-0 left-0 w-full pb-safe-bottom bg-white">
        <div className="h-12">
          <button onClick={onNext} type="button" className="w-full h-full text-white uppercase font-semibold text-sm bg-app">Chọn dịch vụ</button>
        </div>
      </div>
    </div >
  )
}

export default BookingTime