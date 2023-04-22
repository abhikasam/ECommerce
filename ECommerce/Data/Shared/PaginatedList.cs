namespace ECommerce.Data.Shared
{
    public class PaginatedList<T>
    {
        public PaginatedList() { }
        public PaginatedList(int pageSize) 
        { 
            this.TotalPages = 0;
            this.PageNumber= 0;
            this.PageSize = pageSize;
            this.Result=Array.Empty<T>().AsQueryable();
        }

        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public IQueryable<T> Result { get; set; }

    }

    public static class PaginatedListExt
    {
        public static PaginatedList<T> PaginateData<T>(this IQueryable<T> records, int pageNumber, int pageSize)
        {
            var skip = (pageNumber - 1) * pageSize;
            var take = pageSize;
            int recordCount = records.Count();

            PaginatedList<T> paginatedList=new Shared.PaginatedList<T>();
            paginatedList.PageNumber= pageNumber;
            paginatedList.PageSize= pageSize;
            paginatedList.TotalPages= (recordCount+pageSize)/pageSize;

            if(recordCount%pageSize==0)
            {
                paginatedList.TotalPages--;
            }

            paginatedList.PageNumber=Math.Min(paginatedList.PageNumber,paginatedList.TotalPages);

            if (records.Any())
            {
                paginatedList.Result = records.Skip(skip).Take(take);
            }
            else
            {
                paginatedList.Result=Array.Empty<T>().AsQueryable();
                paginatedList.TotalPages = 0;
                paginatedList.PageNumber=0;
            }

            return paginatedList;
        }
    }

}
