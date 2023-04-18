namespace ECommerce.Data.Shared
{
    public static class GenericExt
    {
        public static int[] GetArray(this string arrayString, string delimiter)
        {
            int[] values = new int[] { };
            if (arrayString != null)
            {
                values = arrayString.Split(delimiter).Select(i => Convert.ToInt32(i)).ToArray();
            }
            return values;
        }

    }
}
