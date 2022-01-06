import callAPI from './apiService';

export const GET_FOOD = () => callAPI.get("food");

export const GET_FOOD_BY_ID = (id) => callAPI.get("food/" + id);

export const DELETE_FOOD = (id) => callAPI.delete("food/" + id);

export const POST_FOOD = (body) => callAPI.post("food", body);

export const PUT_FOOD = (id, body) => callAPI.put("food/" + id, body);