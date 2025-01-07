import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface NotificationInt {
  id: string;
  message: string;
  type: 'error' | 'success';
}

interface NotificationState {
  notifications: NotificationInt[];
}

const initialState: NotificationState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  initialState,
  name: 'notification',
  reducers: {
    addNotification: (
      state,
      action: PayloadAction<{ message: string; type: 'error' | 'success' }>
    ) => {
      const newNotification = { id: `${Date.now()}`, ...action.payload };

      state.notifications = [...state.notifications, newNotification];
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;
