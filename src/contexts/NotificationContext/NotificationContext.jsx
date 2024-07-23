import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext'; // Asegúrate de que la ruta sea correcta

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Aquí se simula la obtención de notificaciones del servidor
    // En una implementación real, esto podría ser una llamada a la API o una conexión websocket
    const fetchNotifications = async () => {
      // Simula una llamada a la API
      const mockApiCall = new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, type: 'warning', message: 'Aumento de incidentes en 7º grado', date: '2023-07-19', roles: ['admin', 'teacher'] },
            { id: 2, type: 'info', message: 'Nueva política de convivencia implementada', date: '2023-07-18', roles: ['admin', 'teacher', 'student'] },
            { id: 3, type: 'success', message: 'Reducción del 15% en incidentes este mes', date: '2023-07-17', roles: ['admin'] },
          ]);
        }, 1000);
      });

      const newNotifications = await mockApiCall;
      setNotifications(newNotifications.filter(notif => notif.roles.includes(user.role)));
    };

    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const addNotification = (notification) => {
    setNotifications(prev => [...prev, notification]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);