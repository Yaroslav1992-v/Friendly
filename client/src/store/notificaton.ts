import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  Notification,
  NotificationType,
  NotificationsGroup,
} from "../props/props";
import notificationService from "../services/notificationService";
import { createNotificationData } from "./../props/props";
import { AppDispatch } from "./createStore";
import { updateChat } from "./chats";
interface NotificationsState {
  isLoading: boolean;
  error: string | null;
  dataLoaded: boolean;
  notifications: Notification[];
}

const initialState: NotificationsState = {
  isLoading: false,
  error: null,
  dataLoaded: false,
  notifications: [],
};

export const NotificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notificationsRequested: (state: NotificationsState) => {
      state.isLoading = true;
    },
    notificationsReceived: (
      state: NotificationsState,
      action: PayloadAction<Notification[]>
    ) => {
      state.dataLoaded = true;
      state.notifications = action.payload;
      state.isLoading = false;
    },
    notificationsRead: (
      state: NotificationsState,
      action: PayloadAction<string[]>
    ) => {
      action.payload.forEach((r) => {
        const index = state.notifications.findIndex((n) => n._id === r);
        state.notifications[index].isRead = true;
      });

      state.isLoading = false;
    },
    notificationReceived: (
      state: NotificationsState,
      action: PayloadAction<Notification>
    ) => {
      state.notifications.push(action.payload);
    },
    notificationsRemoved: (
      state: NotificationsState,
      action: PayloadAction<string[]>
    ) => {
      const notifications = state.notifications.filter(
        (n) => !action.payload.includes(n._id)
      );
      state.notifications = notifications;
    },

    notificationsCreateFailed: (
      state: NotificationsState,
      action: PayloadAction<string>
    ) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    notificationsByTypeRemoved: (
      state: NotificationsState,
      action: PayloadAction<{ type: string; typeId: string; author: string }>
    ) => {
      const { typeId, type, author } = action.payload;
      const notifications = state.notifications.filter(
        (n) =>
          !(n.type === type && n.typeId === typeId && n.author._id === author)
      );

      state.notifications = notifications;
    },
    notificationsRequestFailed: (
      state: NotificationsState,
      action: PayloadAction<string>
    ) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const createNotification =
  (notification: createNotificationData) => async (dispatch: Dispatch) => {
    try {
      return await notificationService.createNotification(notification);
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(notificationsCreateFailed(message));
    }
  };
export const recieveNotification =
  (notif: Notification) => (dispatch: AppDispatch) => {
    dispatch(notificationReceived(notif));
    if (notif.type === "message") {
      dispatch(
        updateChat({
          chatId: notif.typeId,
          content: notif.content,
          createdAt: notif.createdAt,
          user: notif.author._id,
          _id: notif._id,
        })
      );
    }
  };
export const removeNotificationsByType =
  (typeId: string, type: string, author: string) =>
  async (dispatch: Dispatch) => {
    try {
      const deletetNot = await notificationService.removeNotificationsByType(
        type,
        typeId,
        author
      );
      dispatch(notificationsByTypeRemoved({ type, typeId, author }));
      return deletetNot;
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(notificationsRequestFailed(message));
    }
  };
export const removeNotifications =
  (ids: string[]) => async (dispatch: Dispatch) => {
    try {
      const deletetNot = await notificationService.removeNotifications(ids);
      dispatch(notificationsRemoved(ids));
      return deletetNot;
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(notificationsRequestFailed(message));
    }
  };
export const loadNotifications =
  (userId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(notificationsRequested());
      const data = await notificationService.getNotifications(userId);
      dispatch(notificationsReceived(data));
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(notificationsRequestFailed(message));
    }
  };
export const changeNotsToRead =
  (notsIds: string[]) => async (dispatch: Dispatch) => {
    try {
      dispatch(notificationsRequested());
      await notificationService.readNotifications(notsIds);
      dispatch(notificationsRead(notsIds));
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(notificationsRequestFailed(message));
    }
  };
export const getUnreadIds =
  () =>
  (state: { notifications: NotificationsState }): string[] => {
    const ids: string[] = [];
    state.notifications.notifications.forEach((n) => {
      if (!n.isRead) {
        ids.push(n._id);
      }
    });
    return ids;
  };
export const getNotifications =
  () =>
  (state: { notifications: NotificationsState }): NotificationsGroup[] => {
    let { notifications: nots } = state.notifications;
    const groupNots: NotificationsGroup[] = [];
    for (let i = 0; i < nots.length; i++) {
      groupNots.push({
        ...nots[i],
        notificationsId: [nots[i]._id],
        authors: [],
        messages: { count: 1, lastMessage: "" },
      });
      for (let j = i + 1; j < nots.length; j++) {
        if (
          nots[j].type === "message" &&
          groupNots[i].type === "message" &&
          nots[j].author._id === groupNots[i].author._id
        ) {
          let { count, lastMessage } = groupNots[i].messages;
          count++;
          lastMessage = nots[j].content;
          groupNots[i].messages = { count, lastMessage };
          nots = [...nots.slice(0, j), ...nots.slice(j + 1)];
          j--;
        } else if (
          nots[j].type === groupNots[i].type &&
          nots[j].typeId === groupNots[i].typeId
        ) {
          if (
            groupNots[i].authors.length < 1 &&
            groupNots[i].type !== "follow"
          ) {
            groupNots[i].authors = [...groupNots[i].authors, nots[j].author];
          }
          groupNots[i].notificationsId = [
            ...groupNots[i].notificationsId,
            nots[j]._id,
          ];
          nots = [...nots.slice(0, j), ...nots.slice(j + 1)];
          j--;
        }
      }
    }
    return groupNots;
  };

export const countNotificationsType =
  (typeId: string, type: string) =>
  (state: { notifications: NotificationsState }) => {
    let count = 0;
    const { notifications } = state.notifications;
    for (let i = 0; i < notifications.length; i++) {
      if (
        notifications[i].typeId === typeId &&
        notifications[i].type === type
      ) {
        count++;
      }
    }
    return count;
  };
export const notficationsCount =
  () =>
  (state: { notifications: NotificationsState }): number =>
    state.notifications.notifications.reduce((count, notification) => {
      if (!notification.isRead) {
        return count + 1;
      }
      return count;
    }, 0);
export const unreadMessagesCount =
  () =>
  (state: { notifications: NotificationsState }): number =>
    state.notifications.notifications.reduce((count, notification) => {
      if (!notification.isRead && notification.type === "message") {
        return count + 1;
      }
      return count;
    }, 0);
export const getNotificationsLoading =
  () =>
  (state: { notifications: NotificationsState }): boolean =>
    state.notifications.isLoading;
export const findNotification =
  (type: string, typeId: string, author: string) =>
  (state: { notifications: NotificationsState }): boolean =>
    state.notifications.isLoading;
export const getAllNotifications =
  () => (state: { notifications: NotificationsState }) =>
    state.notifications.notifications;
const { reducer: notificationsReducer, actions } = NotificationsSlice;
const {
  notificationsRequested,
  notificationsReceived,
  notificationsByTypeRemoved,
  notificationsCreateFailed,
  notificationsRequestFailed,
  notificationReceived,
  notificationsRead,
  notificationsRemoved,
} = actions;

export default notificationsReducer;
