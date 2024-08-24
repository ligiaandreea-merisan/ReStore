using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// The order is not important.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<StoreContext>(opt => //lambda expression
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();


var app = builder.Build();

// Configure the HTTP request pipeline.
// The order is important.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});

app.UseAuthorization();

app.MapControllers();

// We want to initiallize our DB (because this class is the first executed when we run the project).
// It's needed to be done rigth before app.Run() .
// The idea behind this is we need to get hold of our DbContext service (lambda expression above),
//(but we can't inject our StoreContext inside this class)
//so one way to do that is by creating a "scope" and storing inside this variable.
// Then we create a variable "context" to store our context in.
// Then we'll also get hold of a "logger" so that we can log any error that we get.
// Then we need to execute some code against our context using a try-catch block (for any exceptions)
var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    context.Database.Migrate(); //if DB exist -> no migrations to apply -> nothing happens.
    //if DB doesn't exist -> it's going to create a DB and apply pending migrations.
    DbInitializer.Initialize(context);
}
catch (Exception ex)
{
   logger.LogError(ex, "A problem occured during migration");
}

app.Run();
