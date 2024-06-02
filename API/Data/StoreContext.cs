using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; } //DbSets represent a table in our DB 
        //and all the properties from Product class will represent a column in the table
    }
}