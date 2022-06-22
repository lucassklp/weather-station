from digi.xbee.devices import XBeeDevice
import requests
from datetime import datetime
import json
import random

def getValue(hex, start, end):
    val = ""
    for i in range(start, end, 2):
        analyzed = hex[start:i + 2]
        val += str(int(analyzed, 16)).rjust(2, '0')
        start+=2
    return float(val)

# Making http request
def sendValue(pressao, humidade, temperatura, anenometro, water, uv, rssi):
    url = "http://localhost/api/weather-station"
    data = {
        "temperature": temperatura,
        "pressure": pressao,
        "uv": uv,
        "humidity": humidade,
        "anemometer": anenometro,
        "waterSensor": water,
        "rssi": rssi,
        "instant": datetime.now().isoformat()
    }
    headers = {'Content-type': 'application/json'}
    requests.post(url, data=json.dumps(data), headers=headers)

#Debug purpose only
#sendValue(pressao=random.randrange(0,5), humidade=random.randrange(0,20), temperatura=random.randrange(0,100), anenometro=random.randrange(0,1), water=random.randrange(0,5), uv=random.randrange(0,10), rssi=random.randrange(0,100))

device = XBeeDevice("/dev/cu.usbserial-A4030QIG", 9600)
print("Abrindo device...")
device.open()
print("Device aberto! Lendo dados...")
while True:
    try:
        xbee_message = device.read_data()
        if xbee_message is not None:
            hex=xbee_message.data.hex()
            print(hex)
            pressao = getValue(hex, 0, 6) / 100
            print("Pressao: " + str(pressao))

            humidade = getValue(hex, 6, 10) / 100
            print("humidade: " + str(humidade))

            temperatura = getValue(hex, 10, 14) / 100
            print("temperatura: " + str(temperatura))

            anenometro = getValue(hex, 14, 16)
            print("anenometro: " + str(anenometro))

            water = getValue(hex, 16, 20)
            print("water: " + str(water))

            uv = getValue(hex, 20, 22)
            print("uv: " + str(uv))

            rssi = getValue(hex, 22, 26)
            print("rssi: " + str(rssi))

            #Send data to server
            sendValue(pressao, humidade, temperatura, anenometro, water, uv, rssi)
            print("Informações enviadas com sucesso ao servidor.")
    except Exception as e:
        print("A mensagem não está no formato UTF-8")
        print(e)
