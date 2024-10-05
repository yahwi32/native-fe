import { APIResponseType } from "../axios.type";

export type FallDownType = {
  device_id: string;
  alert_type: string;
  hanled: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type MeasureType = {
  status: boolean;
};

export type FallDownResponseType = APIResponseType<FallDownType[]>;
export type MeasureResponseType = APIResponseType<MeasureType>;
