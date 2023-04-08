using System;
using System.Collections.Generic;

namespace ECommerce.Models.Ecommerce
{
    public partial class Size
    {
        public Size()
        {
            SizeMappings = new HashSet<SizeMapping>();
        }

        public int SizeId { get; set; }
        public string SizeName { get; set; }

        public virtual ICollection<SizeMapping> SizeMappings { get; set; }
    }
}
