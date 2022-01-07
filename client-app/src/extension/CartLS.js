const init = {
    count: 0,
    foodInCart: []
};

export const SaveToLocalStorage = (cart) =>
{
    localStorage.setItem("plc-cart", JSON.stringify(cart));
}

export const GetFromLocalStorage = () =>
{
    return JSON.parse(localStorage.getItem("plc-cart")) || init;
}

export const ClearLocalStorage = () =>
{
    localStorage.removeItem("plc-cart");
}