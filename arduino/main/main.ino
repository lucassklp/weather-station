//  Includes
//  for BMP180 sensor
#include <SFE_BMP180.h>
#include <Wire.h> // Library to communicate with I2C https://www.arduino.cc/en/reference/wire

//  for DHT
#include <dht.h>

//  for Water-Sensor
#define POWER_PIN  7
#define SIGNAL_PIN A3
//  for SI1145
#include "Adafruit_SI1145.h"

//  Defines
//  for BMP180
#define localAltitude 14.0
//  for DHT
#define dht_pin A0

//  New instances and variables
//  for BMP180
SFE_BMP180 bmp180Object;
//  for DHT
dht dhtObject;
// for Anemometer
int ledPin = 9;
//  for Water-sensor
int value = 0;
//  for SI1145
Adafruit_SI1145 uv = Adafruit_SI1145();
// for RGB Led

#define red_pin 11
#define green_pin 10
#define blue_pin 9

void setup()
{
  Serial.begin(9600);

  while(!Serial);

  if (bmp180Object.begin())
  {
    Serial.println("BMP180 inicializado com sucesso");    
  }
  else
  {
    Serial.println("Inicialização do BMP180 falhou!");
    Serial.println("Verifique as ligações!");
    return;
  }

  if (!uv.begin()) {
    Serial.println("Didn't find Si1145");
    return;
  }

  // Related to Water-sensor
  pinMode(POWER_PIN, OUTPUT);   // Configuração do D7 como pin output
  digitalWrite(POWER_PIN, LOW); // Desligar o sensor

  // Related to RGB Led
  pinMode(red_pin, OUTPUT);
  pinMode(green_pin, OUTPUT);
  pinMode(blue_pin, OUTPUT);
}

void loop()
{
  bmp180Measurements();
  dhtMeasurements();
  anemometerMeasurements();
  waterSensorMeasurements();
  uvSensorMeasurements();
  
  Serial.print("\n\n---------------------------------\n\n");
  delay(5000);
}


void setRGBColor(int red, int green, int blue)
{
  analogWrite(red_pin, red);
  analogWrite(green_pin, green);
  analogWrite(blue_pin, blue);
}

void bmp180Measurements()
{
  char status;
  //  Definição das variáveis para as leituras
  //  T: Temperatura
  //  P: Pressão absoluta
  double T, P, p0, a;

  status = bmp180Object.startTemperature(); // Comando para começar a medida de temperatura. Retorna um valor em ms para esperar até à medida. Caso seja 0, indica falha.
  if (status != 0)
  {
    delay(status);  // Wait the time indicated by the comando startTemperature

    status = bmp180Object.getTemperature(T);  // Get the Temperature value from object bmp180Object
    if (status != 0)
    {
      Serial.println("\nBMP180 Measurements: ");
      Serial.print("Temperature: ");
      Serial.print(T, 2);
      Serial.println(" ºC");

      status = bmp180Object.startPressure(3); // Comando para começar a medida da pressão, com 3 amostrasRetorna um valor em ms para esperar até à medida. Caso retorno seja 0, indica falha.
      if (status != 0)
      {
        delay(status);  // Esperar o tempo indicado no comando startTemperature
        status = bmp180Object.getPressure(P, T); // Obter a Pressão Absoluta do comando anterior startPressure. Necessita da Temperatura anteriormente medda. Aloca a P o valor em mbar. Caso retorno seja 0, indica falha.
        if (status != 0)
        {
          Serial.print("Pressão Absoluta: ");
          Serial.print(P, 2); // Apresentação da Pressão com duas casas decimais
          Serial.println(" mb, ");  // mili Bars

          p0 = bmp180Object.sealevel(P, localAltitude); // Conversão a Pressão Absoluta em Pressão Relativa ao nível do mar (usada em informação Climatérica).
          Serial.print("Pressão Relativa ao Nível do Mar: ");
          Serial.print(p0, 2); // Apresentação da Pressão Relativa com duas casas decimais
          Serial.println(" mb, ");  // mili Bars

          a = bmp180Object.altitude(P, p0); // Conversão da Pressão Absoluta em Altitude.
          Serial.print("Altitude calculada: ");
          Serial.print(a, 2);
          Serial.println(" meters");

        }
        else Serial.println("Erro em recolher medidas do objecto bmp180Object");
      }
      else Serial.println("Erro em iniciar o objecto bmp180Object");
    }
    else Serial.println("Erro em recolher a Temperatura medida");
  }
  else Serial.println("Erro em iniciar a medida de Temperatura");

}

void dhtMeasurements()
{
  dhtObject.read11(dht_pin); // DHT11 command to do measurements
  Serial.println("\nDHT11 Measurements:");
  Serial.print("Humidade: ");
  Serial.print(dhtObject.humidity);
  Serial.print("%");
  Serial.print("\nTemperatura: ");
  Serial.print(dhtObject.temperature);
  Serial.print("ºC\n");
}

void anemometerMeasurements()
{
  int sensorValue = analogRead(A1);

  //  Visual indicator by led if wanted
  analogWrite(ledPin, sensorValue * (51.0 / 1023.0) * 50);

  Serial.println("\nAnemometer Measurements: ");
  if (sensorValue > 0)
  {
    Serial.print("Valor do Anenometro: ");
    Serial.println(sensorValue);
  }
  else
  {
    Serial.print("Valor do Anenometro: 0");
  }
}

void waterSensorMeasurements()
{
  Serial.println("\nWater-sensor Measurements:");
  
  digitalWrite(POWER_PIN, HIGH);  // Ligar o sensor
  delay(10);                      // Espera de 10 ms
  value = analogRead(SIGNAL_PIN); // Ler o valor analogico do sensor
  digitalWrite(POWER_PIN, LOW);   // Desligar o sensor

  Serial.print("Water-sensor value: ");
  Serial.println(value);
}

void uvSensorMeasurements()
{
  Serial.println("\nUV Sensor:");
  Serial.print("Vis: "); 
  Serial.print(uv.readVisible());
  Serial.print("\nIR: "); 
  Serial.print(uv.readIR());

  //float UVindex = 5;
  float UVindex = uv.readUV();
  UVindex /= 100.0;  // the index is multiplied by 100 so to get the integer index, divide by 100!
  
  Serial.print("\nUV: ");
  Serial.println(UVindex);
  if (UVindex < 3.0)
  {
    setRGBColor(0, 255, 0); // Green
  }
  else if (UVindex >= 3 && UVindex < 6)
  {
    setRGBColor(255, 255, 0); // Yellow
  }
  else if (UVindex >= 6 && UVindex < 8)
  { 
     setRGBColor(240, 100, 0); // Orange
  }
  else if (UVindex >= 8 && UVindex < 11)
  {
     setRGBColor(255, 0, 0); // Red
  }
  else 
  {
    setRGBColor(255, 0, 255); // Magenta
  }
}
