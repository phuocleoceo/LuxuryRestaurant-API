import callAPI from './apiService';

export const GET_ALL_USER = () => callAPI.get("user");