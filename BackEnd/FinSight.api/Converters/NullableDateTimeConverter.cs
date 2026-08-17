using Newtonsoft.Json;
using System.Globalization;

namespace FinSight.api.Converters
{
    public class NullableDateTimeConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(DateTime?);
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

            if (DateTime.TryParse(
                value,
                CultureInfo.InvariantCulture,
                DateTimeStyles.None,
                out DateTime result))
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
            if (value == null)
                writer.WriteNull();
            else
                writer.WriteValue(value);
        }
    }
}