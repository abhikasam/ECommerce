using Microsoft.EntityFrameworkCore;

namespace ECommerce.Models.Ecommerce
{
    public partial class EcommerceContext
    {
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasMany(i => i.Favorites)
                    .WithOne(i => i.Product)
                    .HasForeignKey(i => i.ProductId);

            });

            modelBuilder.Entity<Favourite>(entity =>
            {
                entity.Property(i=>i.FavouriteId).ValueGeneratedOnAdd();

                entity.HasOne(i => i.Product)
                    .WithMany(i => i.Favorites)
                    .HasForeignKey(i => i.FavouriteId);

            });

        }
    }
}
