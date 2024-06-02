using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        // Inside this controller we're going to use dependency injection to get
        //our StoreContext inside here so that we've got access to the products table in our DB.
        // Adaugam un constructor typing ctor.
        // Now, to use dependency injection, we create a private field inside our class and assign that
        //private field to the context that we're addign in our constructor. We can use a quick fix, 
        //left click on "context" -> bec -> Initialize field from parameter -> we get 2 lines: 1 and 2.

        private readonly StoreContext _context; //1

        public ProductsController(StoreContext context)
        {
            _context = context; //2
        }

        // // Next create an endpoint and we specify the method (the Http method) -> HttpGet because we 
        // //want to get a list of products.
        // // In general, inside a API Controller, we specify the type of tesult that we're 
        // //returning (a list of all products).
        // [HttpGet]
        // public ActionResult<List<Product>> GetProducts() //return a list of type Product and create the method.
        // {
        //     var products = context.Products.ToList();
        //     return Ok(products); //Ok is a 200 response type and also include our products.
        // }

        // // This is going to get an individual Product
        // [HttpGet("{id}")] // api/products/3
        // public ActionResult<Product> GetProduct(int id)
        // {
        //     return context.Products.Find(id);
        // }



        // Instead of using those methods, we're going to upgrade them to an async methods which are useful
        //when we deal with multiple threads
         [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts() //return a list of type Product and create the method.
        {
            return await _context.Products.ToListAsync();
        }


        // This is going to get an individual Product
        [HttpGet("{id}")] // api/products/3
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _context.Products.FindAsync(id);
        }

    }
}