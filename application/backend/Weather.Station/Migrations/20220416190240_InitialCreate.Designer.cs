﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Weather.Station.Persistence;

#nullable disable

namespace Weather.Station.Migrations
{
    [DbContext(typeof(DaoContext))]
    [Migration("20220416190240_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Weather.Station.Model.WeatherStationValues", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<double>("AbsolutePressure")
                        .HasColumnType("double");

                    b.Property<double>("Altitude")
                        .HasColumnType("double");

                    b.Property<double>("Anemometer")
                        .HasColumnType("double");

                    b.Property<double>("Humidity")
                        .HasColumnType("double");

                    b.Property<double>("SeaLevelPressure")
                        .HasColumnType("double");

                    b.Property<double>("Temperature")
                        .HasColumnType("double");

                    b.Property<double>("WaterSensor")
                        .HasColumnType("double");

                    b.HasKey("Id");

                    b.ToTable("WeatherStation");
                });
#pragma warning restore 612, 618
        }
    }
}