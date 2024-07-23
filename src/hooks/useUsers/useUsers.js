// src/hooks/useUsers/useUsers.js
import { useQuery, useMutation, useQueryClient } from 'react-query';

// Datos iniciales de usuarios
const initialUsers = [
  { id: 1, firstName: 'Admin', lastName: 'User', email: 'admin@example.com', rut: '12345678-9', role: 'admin', avatar: 'https://via.placeholder.com/150', status: 'active' },
  { id: 2, firstName: 'Regular', lastName: 'User', email: 'user@example.com', rut: '98765432-1', role: 'user', avatar: 'https://via.placeholder.com/150', status: 'active' },
  { id: 3, firstName: 'View', lastName: 'Only', email: 'view@example.com', rut: '11223344-5', role: 'viewer', avatar: 'https://via.placeholder.com/150', status: 'inactive' },
];

// Simulación de llamadas a API
const fetchUsers = async () => {
  // Simula un retraso de red
  await new Promise(resolve => setTimeout(resolve, 1000));
  return initialUsers;
};

const addUser = async (newUser) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { ...newUser, id: Date.now() };
};

const updateUser = async (updatedUser) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return updatedUser;
};

const deleteUser = async (userId) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return userId;
};

export const useUsers = () => {
  const queryClient = useQueryClient();

  const { data: users, isLoading, error } = useQuery('users', fetchUsers);

  const addUserMutation = useMutation(addUser, {
    onSuccess: (newUser) => {
      queryClient.setQueryData('users', (oldUsers) => [...oldUsers, newUser]);
    },
  });

  const updateUserMutation = useMutation(updateUser, {
    onSuccess: (updatedUser) => {
      queryClient.setQueryData('users', (oldUsers) =>
        oldUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
    },
  });

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: (deletedUserId) => {
      queryClient.setQueryData('users', (oldUsers) =>
        oldUsers.filter((user) => user.id !== deletedUserId)
      );
    },
  });

  return {
    users,
    isLoading,
    error,
    addUser: addUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
  };
};