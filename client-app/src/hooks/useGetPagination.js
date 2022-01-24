import { useState, useEffect } from 'react';

export default function useGetPagination(AXIOS_GET)
{
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [forceReload, setForceReload] = useState(true);

    useEffect(() =>
    {
        const getData = async () =>
        {
            const response = await AXIOS_GET();
            if (response.status === 200)
            {
                setIsLoading(false);
                const { data, pagination } = response.data;
                setData(data);
                setPagination(pagination);
            }
        };
        getData();
    }, [AXIOS_GET, forceReload]);

    const handleForceReload = () => setForceReload(!forceReload);

    return {
        isLoading,
        data,
        pagination,
        handleForceReload
    };
};


