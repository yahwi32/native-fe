import { DefaultError, useQuery } from "@tanstack/react-query";

import { getNoti } from "./noti.api";
import { FallDownType } from "./noti.type";

import { QUERY_KEYS } from "@/enum/api";

export const useGetNoti = () => {
  const result = useQuery<FallDownType[], DefaultError>({
    queryKey: [QUERY_KEYS.NOTI],
    queryFn: getNoti,
  });

  return {
    ...result,
  };
};
