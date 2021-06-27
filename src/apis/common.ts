import * as helper from "./helper"
import DeviceInfo from 'react-native-device-info';

export async function getToken(){
    const body = {
        device_id: DeviceInfo.getUniqueId(),
        mobile_model: DeviceInfo.getModel(),
        mobile_type: DeviceInfo.getSystemName(),
        sys_version:DeviceInfo.getSystemVersion()
      };
      const result = await helper.post('/sys/device_authorization',body)
      return result
    }