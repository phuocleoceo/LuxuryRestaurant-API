import callAPI from './apiService';

export const GET_FOOD = (filters) => callAPI.get("food", { params: filters });

export const GET_FULL = () => callAPI.get("food/getfull");

export const GET_LIST = (listId) => callAPI.get("food/getlist?listId=" + listId);

export const GET_FOOD_BY_ID = (id) => callAPI.get("food/" + id);

export const DELETE_FOOD = (id) => callAPI.delete("food/" + id);

export const POST_FOOD = (body) => callAPI.post("food", body);

export const PUT_FOOD = (id, body) => callAPI.put("food/" + id, body);