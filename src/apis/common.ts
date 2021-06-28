import * as helper from "./helper"
import DeviceInfo from 'react-native-device-info';

export async function getToken(){
    const body = {
        device_id: DeviceInfo.getUniqueId(),
        mobile_model: DeviceInfo.getModel(),
        mobile_type: DeviceInfo.getSystemName(),
        sys_version:DeviceInfo.getSystemVersion()
      };
      const tt = await helper.getTokenForApp();
      if(tt == null){
        const result = await helper.post('/sys/device_authorization',body)
        return result
      }
      return null;
      
    }

export async function help(){
    const result = await helper.get('/sys/about',{})
    console.log(result)
    console.log(111111)
    return result
}