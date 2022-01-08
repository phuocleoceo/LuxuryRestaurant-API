export const SET_USER = (data) =>
{
    localStorage.setItem("plc-user", JSON.stringify(data));
}

export const GET_USER = () =>
{
    return JSON.parse(localStorage.getItem("plc-user"));
}

export const REMOVE_USER = () =>
{
    localStorage.removeItem("plc-user");
}

export const GET_ACCESS_TOKEN = () =>
{
    const user = GET_USER();
    return user ? user.accessToken : "";
}

export const GET_REFRESH_TOKEN = () =>
{
    const user = GET_USER();
    return user ? user.refreshToken : "";
}

export const GET_USER_INFOR = () =>
{
    const user = GET_USER();
    return user ? user.user : null;
}