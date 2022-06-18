using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Weather.Station.Migrations
{
    public partial class AddRSSI : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "RSSI",
                table: "WeatherStation",
                type: "double",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RSSI",
                table: "WeatherStation");
        }
    }
}
