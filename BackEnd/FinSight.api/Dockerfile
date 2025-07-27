FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["BackEnd/FinSight.api/FinSight.api.csproj", "BackEnd/FinSight.api/"]
RUN dotnet restore "BackEnd/FinSight.api/FinSight.api.csproj"
COPY ["BackEnd/FinSight.api/", "BackEnd/FinSight.api/"]
WORKDIR "/src/BackEnd/FinSight.api"
RUN dotnet build "FinSight.api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "FinSight.api.csproj" -c $BUILD_CONFIGURATION -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FinSight.api.dll", "--urls", "http://+:8080"]