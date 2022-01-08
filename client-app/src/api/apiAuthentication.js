import callAPI from './apiService';

export const REGISTER = (body) => callAPI.post("authentication/register", body);

export const LOGIN = (body) => callAPI.post("authentication/login", body);