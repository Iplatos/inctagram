import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { NotificationType } from '@/shared/api/socket-api/socket-api.types';
import { Socket, io } from 'socket.io-client';

import { selectAccessToken } from '../app-slice';

const socketUrl = process.env.NEXT_PUBLIC_BASE_URL!;

const WS_EVENT_PATH = {
  ERROR: 'error',
  MESSAGE_DELETED: 'notification-deleted',
  MESSAGE_SEND: 'notification-sent',
  NOTIFICATIONS: 'notifications',
  RECEIVE_MESSAGE: 'receive-notification',
  UPDATE_MESSAGE: 'update-notification',
};

const useWebSocket = () => {
  const accessToken = useSelector(selectAccessToken);
  const socketRef = useRef<Socket | null>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    if (!accessToken) {
      console.warn('Access token is missing. Skipping WebSocket connection.');

      return;
    }
    const queryParams = { query: { accessToken } };
    const socket: Socket = io(socketUrl, queryParams);

    socketRef.current = socket;

    socket.on(WS_EVENT_PATH.NOTIFICATIONS, notifications => {
      setNotifications(prev => [...prev, ...notifications]);
    });

    return () => {
      socket.disconnect();
      console.log('WebSocket connection closed.');
    };
  }, [accessToken]);

  return { notifications };
};

export default useWebSocket;
