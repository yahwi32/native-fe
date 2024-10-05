export const THRESHOLD_NOTI = 3 * 1000;

export type ContentModalType = {
  title: string;
  content?: string;
};

export enum TITLE_MODAL {
  ADD_DEVICE = "Do you want to add this device?",
  DELETE_DEVICE_TITLE = "Are you sure you want to delete this device?",
  DELETE_DEVICE_CONTENT = "The device will be erased and cannot be restored.",
}
