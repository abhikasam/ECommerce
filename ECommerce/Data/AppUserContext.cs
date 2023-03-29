using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ECommerce.Data.Account;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ECommerce.Data
{
    public class AppUserContext: IdentityDbContext<User>
    {
        public AppUserContext(DbContextOptions<AppUserContext> options): base(options)
        {
        }
    }
}
