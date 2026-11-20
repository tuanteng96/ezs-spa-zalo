import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import AuthAPI from "../../api/auth.api";
import BookingAPI from "../../api/booking.api";
import ConfigsAPI from "../../api/configs.api";

export const rewardNumber = new Intl.NumberFormat("vi-VN");

export async function getPointHistory({ MemberID, Token, Pi = 1 }) {
  const { data } = await AuthAPI.points({
    Token,
    data: {
      StockID: "",
      DateStart: "",
      DateEnd: "",
      Pi,
      Ps: 10,
      Order: "ID desc",
      MemberID,
      Sao: "0",
    },
  });
  if (data?.error) throw new Error(data.error);
  return data ?? {};
}

export function useStarExchange({ MemberID, Token, enabled, includeHistory }) {
  const configQuery = useQuery({
    queryKey: ["StarExchange", "config", MemberID, Token],
    queryFn: async () => {
      const { data } = await ConfigsAPI.getNames("doisao", { ignoreRoot: true });
      if (data?.error) throw new Error(data.error);
      const value = data?.data?.[0]?.Value;
      return value ? JSON.parse(value) : null;
    },
    enabled,
  });

  const config = configQuery.data;
  const historyQuery = useQuery({
    queryKey: ["StarExchange", "history", MemberID, Token, config],
    queryFn: () => getStarExchangeHistory({ config, MemberID, Token }),
    enabled: enabled && configQuery.isSuccess && (includeHistory || !!config?.Items?.length),
  });

  return {
    total: configQuery.isSuccess && !config?.Items?.length ? 0 : historyQuery.data?.total,
    history: historyQuery.data?.history ?? [],
    isLoading: configQuery.isLoading || historyQuery.isInitialLoading,
    isError: configQuery.isError || historyQuery.isError,
    refetch: async () => {
      const result = await configQuery.refetch();
      // A changed config enables a new history query on the next render.
      if (result.isSuccess && result.data === config && (includeHistory || config?.Items?.length)) {
        await historyQuery.refetch();
      }
    },
  };
}

async function getStarExchangeHistory({ config, MemberID, Token }) {
  const period = { QUARTER: "quarter", YEAR: "year" }[config?.Type] || "month";
  const now = moment();
  const from = now.clone().startOf(period).format("YYYY-MM-DD");
  const to = now.clone().endOf(period).format("YYYY-MM-DD");
  const [services, exchanges] = await Promise.all([
    config?.Items?.length
      ? BookingAPI.getBooking({
          From: from,
          To: to,
          MemberID,
          StockID: "",
          Status: "THUC_HIEN_XONG",
          UserServiceIDs: "",
          StatusMember: "",
          StatusBook: "",
          StatusAtHome: "",
        }, Token)
      : null,
    AuthAPI.getListVoucherExchange({ Token, data: { MemberID, from, to, key: "Đổi sao" } }),
  ]);
  const error = services?.data?.error || exchanges.data?.error;
  if (error) throw new Error(error);

  const starsByService = new Map(
    (config?.Items ?? []).map(({ ServiceID, Stars }) => [String(ServiceID), Number(Stars) || 0])
  );
  const bookings = (services?.data?.osList ?? []).flatMap(({ os }) => {
    if (!os) return [];
    return [{
      type: "booking",
      id: os.ID,
      date: os.BookDate,
      stars: starsByService.get(String(os.ProdServiceID2 || os.ProdServiceID)) ?? 0,
      detail: os.Title,
    }];
  });
  const vouchers = (exchanges.data?.data ?? []).map(({ ID, CreateDate, Desc, Code }) => {
    const match = /^\s*Đổi sao\s*\(\s*(\d+(?:\.\d+)?)\s*\)\s*$/.exec(Desc);
    return {
      type: "exchange",
      id: ID,
      date: CreateDate,
      stars: match ? -Number(match[1]) : null,
      detail: Code,
    };
  });
  const history = [...bookings, ...vouchers].sort(
    (left, right) => (Date.parse(right.date) || 0) - (Date.parse(left.date) || 0)
  );
  const earned = bookings.reduce((sum, entry) => sum + entry.stars, 0);
  const redeemed = vouchers.reduce((sum, entry) => sum - (entry.stars ?? 0), 0);
  return { total: Math.max(0, earned - redeemed), history };
}
