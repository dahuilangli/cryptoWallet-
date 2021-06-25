import * as helper from './helper';
import DeviceInfo from 'react-native-device-info';

export function getToken() {
  const body = {
    device_id: DeviceInfo.getUniqueId(),
    mobile_model: DeviceInfo.getModel(),
    mobile_type: DeviceInfo.getSystemName(),
    sys_version: DeviceInfo.getSystemVersion(),
  };
  const { data }: any = helper.post('/sys/device_authorization', body);

  console.log(data);
}
