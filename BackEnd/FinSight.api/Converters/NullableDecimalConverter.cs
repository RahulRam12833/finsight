using Newtonsoft.Json;
using System.Globalization;

namespace FinSight.api.Converters
{
    public class NullableDecimalConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(decimal?);
        }

        public override object ReadJson(
            JsonReader reader,
            Type objectType,
            object existingValue,
            JsonSerializer serializer)
        {
            if (reader.Value == null)
                return null;

            var value = reader.Value.ToString();

            if (string.IsNullOrWhiteSpace(value) || value == "None")
                return null;

            if (decimal.TryParse(
                value,
                NumberStyles.Any,
                CultureInfo.InvariantCulture,
                out decimal result))
            {
                return result;
            }

            return null;
        }

        public override void WriteJson(
            JsonWriter writer,
            object value,
            JsonSerializer serializer)
        {
            writer.WriteValue(value);
        }
    }
}