namespace FinSight.api.Exceptions
{
    public class AlphaVantageRateLimitException : Exception
    {
        public AlphaVantageRateLimitException()
            : base("AlphaVantage API rate limit reached.")
        {
        }
    }
}