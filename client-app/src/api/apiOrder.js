import callAPI from './apiService';

export const CHECK_OUT = (body) => callAPI.post("order/checkout", body);

export const GET_ALL_ORDER = () => callAPI.get("order/getall");