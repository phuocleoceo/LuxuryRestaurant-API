import { createSlice } from '@reduxjs/toolkit';
import { GetFromLocalStorage, SaveToLocalStorage } from '../../extension/CartLS';

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
        DELETE_CART: (state, action) =>
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
        }
    },
});

export const { ADD_TO_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, DELETE_CART } = cartSlice.actions
export default cartSlice.reducer

