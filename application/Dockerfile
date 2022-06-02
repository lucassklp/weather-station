#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM node:16.13.1 as frontend-build
WORKDIR /src
COPY ./frontend .
RUN npm ci
RUN npm run build-prod

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ./backend .
RUN ls
WORKDIR "/src/Weather.Station"
COPY --from=frontend-build /src/dist/sensor ./wwwroot
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Weather.Station.dll"]