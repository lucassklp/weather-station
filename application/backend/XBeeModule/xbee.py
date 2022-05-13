from digi.xbee.devices import XBeeDevice

device = XBeeDevice("COM4", 9600)

print("Abrindo device...")
device.open()
print("Device aberto! Lendo dados...")
while True:
    try:
        xbee_message = device.read_data()
        if xbee_message is not None:
            print(xbee_message.data.decode("utf-8"))
    except Exception as e:
        print("A mensagem não está no formato UTF-8")



