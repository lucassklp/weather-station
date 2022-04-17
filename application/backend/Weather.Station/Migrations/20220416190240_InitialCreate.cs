using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Weather.Station.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "WeatherStation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Temperature = table.Column<double>(type: "double", nullable: false),
                    AbsolutePressure = table.Column<double>(type: "double", nullable: false),
                    SeaLevelPressure = table.Column<double>(type: "double", nullable: false),
                    Altitude = table.Column<double>(type: "double", nullable: false),
                    Humidity = table.Column<double>(type: "double", nullable: false),
                    Anemometer = table.Column<double>(type: "double", nullable: false),
                    WaterSensor = table.Column<double>(type: "double", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeatherStation", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WeatherStation");
        }
    }
}
