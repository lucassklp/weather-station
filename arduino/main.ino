//  Includes
//  for BMP180 sensor
#include <SFE_BMP180.h>
#include <Wire.h>
//  for DHT
#include "dht.h"
//  for Water-Sensor
#define POWER_PIN  7
#define SIGNAL_PIN A3


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

void setup()
{
  Serial.begin(9600);
  while(!Serial){ // wait till serial is initiated
    ;
  }

//  Relate to BMP180
  if (bmp180Object.begin())
    Serial.println("BMP180 inicializado com sucesso");
  else
  {
    Serial.println("Inicialização do BMP180 falhou!");
    Serial.println("Verifique as ligações!");
    while (1); // Stuck here in case BMP180 fails
  }
//  Related to Water-sensor
  pinMode(POWER_PIN, OUTPUT);   // Configuração do D7 como pin output
  digitalWrite(POWER_PIN, LOW); // Desligar o sensor


}


void loop()
{

  //  Related to BMP180
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
      Serial.println();
      Serial.println("BMP180 Measurements #####################: ");
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
          Serial.println(" meters, ");

        }
        else Serial.println("Erro em recolher medidas do objecto bmp180Object");
      }
      else Serial.println("Erro em iniciar o objecto bmp180Object");
    }
    else Serial.println("Erro em recolher a Temperatura medida");
  }
  else Serial.println("Erro em iniciar a medida de Temperatura");


  //  Relate to DHT
  dhtObject.read11(dht_pin); // DHT11 command to do measurements
  Serial.println( );
  Serial.println("DHT11 Measurements #####################: ");
  Serial.print("Humidade: ");
  Serial.print(dhtObject.humidity);
  Serial.print("%  ");
  Serial.print("Temperatura: ");
  Serial.print(dhtObject.temperature);
  Serial.println("ºC  ");
        
  //  Relater to Anemometer
  int sensorValue = analogRead(A1);
  //  Visual indicator by led if wanted
  analogWrite(ledPin, sensorValue * (51.0 / 1023.0) * 50);

  if (sensorValue > 0) {
    Serial.println( );
    Serial.println("Anemometer Measurements #####################: ");
    Serial.print("Valor do Anenometro: ");
    Serial.println(sensorValue);
    Serial.println( );
  } else {
    Serial.println( );
    Serial.println("Anemometer Measurements #####################: ");
    Serial.println("Valor do Anenometro: 0");
    Serial.println( );
    }
  delay(3000);

  
  //  Related to Water-sensor
  Serial.println("Water-sensor Measurements #####################: ");
  digitalWrite(POWER_PIN, HIGH);  // Ligar o sensor
  delay(10);                      // Espera de 10 ms
  value = analogRead(SIGNAL_PIN); // Ler o valor analogico do sensor
  digitalWrite(POWER_PIN, LOW);   // Desligar o sensor

  Serial.print("Water-sensor value: ");
  Serial.println(value);

  //  Serial dat to send to PC

    
  delay(5000);  // Pause for 10 seconds before repeat the loop

}
