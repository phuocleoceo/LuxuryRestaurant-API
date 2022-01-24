import callAPI from './apiService';

export const GET_ALL_USER = (filters) => callAPI.get("user", { params: filters });