# Weather Station

This application consist of two parts which are:

## Arduino 
The Arduino will control the sensors, capture and transmit data through ZigBee to the Application


## Application
The application contains three submodules which are:

- C# Web Application
- Angular frontend
- Database
- Python Module to read ZigBee packets and send to server

It reads all values from sensors (through ZigBee) and then save it on database. 
The frontend is used to see the charts and data.

## Setting up
Please, before running check the Serial port you are using and edit the file located on `application/backend/XBeeModule/xbee.py`:

```python
device = XBeeDevice("/dev/cu.usbserial-A4030QIG", 9600) # Use your serial port instead
```

## Running
In order to run, you will need to do:

```
docker compose build
docker compose up
```

Make sure you have python dependencies:
```
pip install digi-xbee
pip install requests
```

And then, run the python script (on root folder)
```
python './application/backend/XBeeModule/xbee.py'
```

