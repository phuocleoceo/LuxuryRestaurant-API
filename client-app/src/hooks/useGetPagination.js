import { useState, useEffect } from 'react';
import queryString from 'query-string';

export default function useGetPagination(AXIOS_GET)
{
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [forceReload, setForceReload] = useState(true);

    const [filters, setFilters] = useState({
        PageNumber: 1,
        PageSize: 5
    });

    useEffect(() =>
    {
        const getData = async () =>
        {
            const params = queryString.stringify(filters);
            const response = await AXIOS_GET(params);
            if (response.status === 200)
            {
                setIsLoading(false);
                const { data, pagination } = response.data;
                setData(data);
                setPagination(pagination);
            }
        };
        getData();
    }, [AXIOS_GET, filters, forceReload]);

    const handleForceReload = () => setForceReload(!forceReload);

    const handlePagination = (newPage) =>
    {
        setFilters({
            ...filters,
            PageNumber: newPage
        });
    }

    return {
        isLoading,
        data,
        pagination,
        handlePagination,
        handleForceReload
    };
};


