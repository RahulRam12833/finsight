### Database Setup

- The connection string in `appsettings.json` uses `localhost` as the SQL Server instance.
- For local development, create an `appsettings.Development.json` file

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=YOUR-PC-NAME\\SQLEXPRESS;Initial Catalog=dbname;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"
  }
}
```
