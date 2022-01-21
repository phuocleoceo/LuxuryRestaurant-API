namespace LuxuryRestaurantAPI.DTO.RequestModel;

public abstract class RequestParameter
{
    const int _maxPageSize = 50;
    private int _pageSize = 10;

    public int PageNumber { get; set; } = 1;

    public int PageSize
    {
        get => _pageSize;

        set => _pageSize = (value > _maxPageSize) ? _maxPageSize : value;
    }
}
