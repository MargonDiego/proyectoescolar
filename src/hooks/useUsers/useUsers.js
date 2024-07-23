// src/hooks/useUsers.js
import { useQuery, useMutation, useQueryClient } from 'react-query';

// Simulación de llamadas a API
const fetchUsers = async () => {
  // Simula un retraso de red
  await new Promise(resolve => setTimeout(resolve, 1000));
  return initialUsers; // Asume que initialUsers está definido en algún lugar
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