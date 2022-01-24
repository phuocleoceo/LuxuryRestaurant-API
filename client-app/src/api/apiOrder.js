import callAPI from './apiService';

export const CHECK_OUT = (body) => callAPI.post("order/checkout", body);

export const GET_ALL_ORDER = (filters) => callAPI.get("order/getall", { params: filters });