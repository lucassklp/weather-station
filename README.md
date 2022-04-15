# Weather Station

This application consist of two parts which are:

## Arduino 
The Arduino will control the sensors, capture and transmit data through ZigBee to the Application


## Application
The application contains three submodules which are:

- C# Web Application
- Angular frontend
- Database


It reads all values from sensors (through ZigBee) and then save it on database. 
The frontend is used to see the charts and data.