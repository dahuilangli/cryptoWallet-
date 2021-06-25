import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from 'components/navigationService';
import MainStackNavigator from './MainStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import { useDispatch } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import apis from 'apis';
import { User } from 'actions/types';
import wallet from 'actions/wallet';

function RootScreen() {
  const dispatch = useDispatch();
  let user: User;

  //初始加载、获取物理硬件信息
  // async function componentWillMount() {
  //   await console.log('品牌:', DeviceInfo.getBrand());
  //   await console.log('当前应用名称:', DeviceInfo.getApplicationName());
  //   await console.log('应用编译版本号:', DeviceInfo.getBuildNumber());
  //   await console.log('获取应用程序包标识符:', DeviceInfo.getBundleId());
  //   await console.log('运营商名称:', DeviceInfo.getCarrier());
  //   await console.log('设备所处国家:', DeviceInfo.getDevice());
  //   await console.log('设备ID:', DeviceInfo.getDeviceId());
  //   await console.log('设备名称:', DeviceInfo.getDeviceName());
  //   await console.log(
  //     '获取应用初始安装时间:',
  //     DeviceInfo.getFirstInstallTime(),
  //   );
  //   await console.log('设备字体大小:', DeviceInfo.getFontScale());
  //   await console.log('剩余存储容量(字节):', DeviceInfo.getFreeDiskStorage());
  //   await console.log('获取应用上次更新时间:', DeviceInfo.getLastUpdateTime());
  //   await console.log('设备制造商:', DeviceInfo.getManufacturer());
  //   await console.log(
  //     '获取JVM试图使用的最大内存量(字节):',
  //     DeviceInfo.getMaxMemory(),
  //   );
  //   await console.log('获取设备模式:', DeviceInfo.getModel());
  //   await console.log('获取电话号码:', DeviceInfo.getPhoneNumber());
  //   await console.log('获取应用程序可读版本:', DeviceInfo.getReadableVersion());
  //   await console.log('设备唯一序列号:', DeviceInfo.getSerialNumber());
  //   await console.log('获取系统名称:', DeviceInfo.getSystemName());
  //   await console.log('获取系统版本:', DeviceInfo.getSystemVersion());
  //   await console.log(
  //     '完整磁盘空间大小(字节):',
  //     DeviceInfo.getTotalDiskCapacity(),
  //   );
  //   await console.log('设备总内存(字节):', DeviceInfo.getTotalMemory());
  //   await console.log('设备唯一ID:', DeviceInfo.getUniqueId());
  //   await console.log('设备用户代理:', DeviceInfo.getUserAgent());
  //   await console.log('设备版本:', DeviceInfo.getVersion());
  //   await console.log('程序是否允许在模拟器中:', DeviceInfo.isEmulator());
  //   await console.log('是否是平板电脑:', DeviceInfo.isTablet());
  // }
  
  // const accountList = useSelector(wallet.getAccountList);
  const accountList = wallet.getAccountList;
  React.useEffect(() => {
    SplashScreen.hide();
    apis.common.getToken();
  });
  return (
    <NavigationContainer ref={navigationRef}>
      {accountList.length >= 0 ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default RootScreen;
