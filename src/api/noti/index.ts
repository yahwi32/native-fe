import { DefaultError, useMutation, useQuery } from "@tanstack/react-query";

import { getNoti, requestMeasure } from "./noti.api";
import { FallDownType, MeasureType } from "./noti.type";

import { MUTATION_KEYS, QUERY_KEYS } from "@/enum/api";

export const useGetNoti = () => {
  const result = useQuery<FallDownType[], DefaultError>({
    queryKey: [QUERY_KEYS.NOTI],
    queryFn: getNoti,
  });

  return {
    ...result,
  };
};

export const useRequestMeasure = () => {
  const result = useMutation<MeasureType, DefaultError>({
    mutationKey: [MUTATION_KEYS.REQUEST],
    mutationFn: requestMeasure,
  });

  return {
    ...result,
  };
};
