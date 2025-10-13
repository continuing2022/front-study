import baseUrl from "./baseUrl";

export const getUsers = () => {
  return baseUrl.get('/users');
};

export const getUserById = (id) => {
  return baseUrl.get(`/users/${id}`);
};

export const createUser = (userData) => {
  return baseUrl.post('/users', userData);
};
