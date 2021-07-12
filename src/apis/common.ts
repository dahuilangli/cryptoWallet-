import * as helper from "./helper"
import DeviceInfo from 'react-native-device-info';

export async function getToken() {
  const params = {
    device_id: DeviceInfo.getUniqueId(),
    mobile_model: DeviceInfo.getModel(),
    mobile_type: DeviceInfo.getSystemName(),
    sys_version: DeviceInfo.getSystemVersion()
  };
  await helper.post('/sys/device_authorization', params).then((res: any) => {
    let data = res.data;
    if (data) {
      return data.token
    }
  })
}

export async function help() {
  await helper.get('/sys/about', {}).then(res => {
    return res
  })
  return null
}

export const deviceId = DeviceInfo.getUniqueId()
export const mobileType =  DeviceInfo.getSystemName()