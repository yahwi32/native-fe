import instance from "../axios";

import { FallDownResponseType, MeasureResponseType } from "./noti.type";

import useAppStore from "@/store/app";

export const getNoti = async () => {
  const device = useAppStore.getState().device;

  const data: FallDownResponseType = await instance.get(`/fall-alerts/device/${device ?? "66d948021a49420250e10923"}`);

  return data.data;
};

export const requestMeasure = async () => {
  const device = useAppStore.getState().device;

  const data: MeasureResponseType = await instance.post(`realtime/heart/request`, {
    device_id: `${device ?? "66d948021a49420250e10923"}`,
  });

  return data.data;
};
