from digi.xbee.devices import XBeeDevice

def getValue(hex, start, end):
    val = ""
    for i in range(start, end, 2):
        analyzed = hex[start:i + 2]
        val += str(int(analyzed, 16))
        start+=2
    return float(val)

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

            humidade = getValue(hex, 6, 10) / 10
            print("humidade: " + str(humidade))

            temperatura = getValue(hex, 10, 14) / 10
            print("temperatura: " + str(temperatura))

            anenometro = getValue(hex, 14, 16)
            print("anenometro: " + str(anenometro))

            water = getValue(hex, 16, 20)
            print("water: " + str(water))

            uv = getValue(hex, 20, 22)
            print("uv: " + str(uv))

            #print(xbee_message.data.hex())
    except Exception as e:
        print("A mensagem não está no formato UTF-8")
        print(e)
