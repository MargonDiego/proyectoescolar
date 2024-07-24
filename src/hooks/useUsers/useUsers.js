// src/hooks/useUsers/useUsers.js
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useState, useEffect } from 'react';

const initialUsers = [
  { id: 1, firstName: 'Admin', lastName: 'User', email: 'admin@example.com', password: 'password', rut: '12345678-9', role: 'admin', avatar: 'https://via.placeholder.com/150', status: 'active' },
  { id: 2, firstName: 'Regular', lastName: 'User', email: 'user@example.com', password: 'password', rut: '98765432-1', role: 'user', avatar: 'https://via.placeholder.com/150', status: 'active' },
  { id: 3, firstName: 'View', lastName: 'Only', email: 'view@example.com', password: 'password', rut: '11223344-5', role: 'viewer', avatar: 'https://via.placeholder.com/150', status: 'inactive' },
];

const fetchUsers = async () => {
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

const loginUser = async (credentials) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const user = initialUsers.find(u => (u.email === credentials.emailOrRut || u.rut === credentials.emailOrRut) && u.password === credentials.password);
  if (user) {
    return { ...user, password: undefined };
  }
  throw new Error('Invalid credentials');
};

export const useUsers = () => {
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

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

  const loginMutation = useMutation(loginUser, {
    onSuccess: (user) => {
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    },
  });

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  return {
    users,
    currentUser,
    isLoading,
    error,
    addUser: addUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
    login: loginMutation.mutate,
    logout,
  };
};