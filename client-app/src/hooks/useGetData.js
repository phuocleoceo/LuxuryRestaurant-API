import { useState, useEffect } from 'react';

export default function useGetData(AXIOS_GET)
{
    const [isLoading, setIsLoading] = useState(true);
    const [responseData, setResponseData] = useState([]);

    useEffect(() =>
    {
        const getData = async () =>
        {
            const response = await AXIOS_GET();
            if (response.status === 200)
            {
                setIsLoading(false);
                setResponseData(response.data);
            }
        };
        getData();
    }, [AXIOS_GET]);

    return {
        isLoading,
        responseData
    };
};


