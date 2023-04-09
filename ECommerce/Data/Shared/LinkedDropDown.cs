namespace ECommerce.Data.Shared
{
    public class LinkedDropDown
    {
        public int Key { get; set; }
        public int ChildId { get; set; }
        public string ChildName { get; set; }
        public int ParentId { get; set; }
    }
}
