import BluetoothDevice from 'web-bluetooth'

const devices = {
  CurieIMU: {
    serviceUuid: "19b10000-e8f2-537e-4f6c-d104768a1216",
    characteristics: {
      notify: {
        x: "4227f3b1-d6a2-4fb2-a916-3bee580a9c84",
        y: "5b974f46-6f48-43ee-9a55-4fb009867603",
        x: "09a64f10-32b3-497a-93c2-c914f46eba22"
      }
    }
  }
}

class BleDevice {
  constructor({ name }){
    this.name = name
    const filters = {
      name: name
    }
    this.bleDevice = new BluetoothDevice(filters)

    this.bleDevice.connect()
  }

  getDeviceCharacteristics(){
    return(devices[this.name].characteristics)
  }

  getServiceUuid(){
    return(devices[this.name].serviceUuid)
  }

  startNotify(characteristic, callback){
    this.bleDevice.addCharacteristic(
      characteristic,
      this.getServiceUuid(),
      ['notify']
    );
    this.bleDevice.startNotifications(characteristic, callback)
  }

  detectDevice({name}){
    return devices[name]
  }
}

export default BleDevice
