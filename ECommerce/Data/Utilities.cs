using ECommerce.Data.Products;
using System.Security.Claims;

namespace ECommerce.Data
{
    public class Utilities
    {
        public static string GetFullName(ClaimsPrincipal claimsPrincipal)
        {
            return claimsPrincipal.Claims.Where(i => i.Type == "FullName").FirstOrDefault().Value;
        }

        public static int[] GetArray(string arrayString,string delimiter)
        {
            int[] values = new int[] { };
            if(arrayString != null)
            {
                values=arrayString.Split(delimiter).Select(i=>Convert.ToInt32(i)).ToArray();
            }
            return values;
        }
    }

    public static class CommonUtilites
    {
        public static IQueryable<T> PaginateData<T>(this IQueryable<T> records, int pageNumber, int pageSize)
        {

            var skip = (pageNumber - 1) * pageSize;
            var take = pageSize;

            return records.Skip(skip).Take(take);
        }
    }
}
