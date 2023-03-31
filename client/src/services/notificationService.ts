import { createNotificationData, Notification } from "../props/props";
import httpService from "./httpService";

const apiEndPoint = "/notifications/";
const notificationService = {
  createNotification: async (
    notification: createNotificationData
  ): Promise<Notification> => {
    const { data } = await httpService.post(`${apiEndPoint}create`, {
      ...notification,
    });

    return data;
  },
  getNotifications: async (userId: string): Promise<Notification[]> => {
    const { data } = await httpService.get(
      `${apiEndPoint}getNotifications/${userId}`
    );
    return data;
  },
  readNotifications: async (nots: string[]): Promise<void> => {
    await httpService.patch(`${apiEndPoint}readNotifications/`, {
      nots,
    });
  },
  removeNotification: async (notificationId: string): Promise<number> => {
    const data = await httpService.delete(
      `${apiEndPoint}removeNotification/${notificationId}`
    );
    return data.status;
  },
  removeNotificationsByType: async (
    type: string,
    typeId: string,
    author: string
  ): Promise<number> => {
    const data = await httpService.post(
      `${apiEndPoint}removeNotificationByType`,
      {
        data: { type, typeId, author },
      }
    );
    return data.status;
  },

  removeNotifications: async (notIds: string[]): Promise<Notification> => {
    const { data } = await httpService.post(
      `${apiEndPoint}removeNotifications`,
      notIds
    );
    return data;
  },
  markAsRead: async (notificationId: string): Promise<Notification> => {
    const { data } = await httpService.patch(`${apiEndPoint}markAsRead`, {
      data: { notificationId },
    });
    return data;
  },
};

export default notificationService;
