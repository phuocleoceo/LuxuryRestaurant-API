import
{
    ClearLocalStorage,
    GetFromLocalStorage,
    SaveToLocalStorage, init
} from '../../extension/CartLS';

import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: "cart",
    initialState: GetFromLocalStorage(),
    reducers: {
        ADD_TO_CART: (state, action) =>
        {
            const food = action.payload;
            const index = state.foodInCart.findIndex(c => c.id === food.id);
            if (index === -1)
            {
                const f = {
                    ...food,
                    quantity: 1
                };
                state.foodInCart.push(f);
                state.count++;
            }
            else
            {
                state.foodInCart[index].quantity++;
            }
            SaveToLocalStorage(state);
            return state;
        },
        REMOVE_CART: (state, action) =>
        {
            const deleteID = action.payload;
            state = {
                count: state.count - 1,
                foodInCart: state.foodInCart.filter(c => c.id !== deleteID)
            };
            SaveToLocalStorage(state);
            return state;
        },
        INCREASE_QUANTITY: (state, action) =>
        {
            const id = action.payload;
            const index = state.foodInCart.findIndex(food => food.id === id);
            state.foodInCart[index].quantity++;
            SaveToLocalStorage(state);
            return state;
        },
        DECREASE_QUANTITY: (state, action) =>
        {
            const id = action.payload;
            const index = state.foodInCart.findIndex(food => food.id === id);
            if (state.foodInCart[index].quantity > 1)
            {
                state.foodInCart[index].quantity--;
            }
            else
            {
                // DELETE
                return {
                    count: state.count - 1,
                    foodInCart: state.foodInCart.filter(c => c.id !== id)
                };
            }
            SaveToLocalStorage(state);
            return state;
        },
        CLEAR_CART: (state, action) =>
        {
            ClearLocalStorage();
            return init;
        }
    },
});

export const { ADD_TO_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, REMOVE_CART, CLEAR_CART } = cartSlice.actions
export default cartSlice.reducer

