import callAPI from './apiService';

export const GET_SALES_PER_DOW = () => callAPI.get("statistic/salesperdow");