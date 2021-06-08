import React from 'react';
import { PermissionsAndroid, Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { ReduxStore, persistor } from 'reduxState/store';
import RootScreen from './RootScreen';
import { PersistGate } from 'redux-persist/es/integration/react';
import { RootSiblingParent } from 'react-native-root-siblings';
import checkPushyUpdate from 'utils/checkPushyUpdate';

export default function App() {
  const [permissionsGranted, setPermissionsGranted] = React.useState(false);

  React.useEffect(() => {
    function checkPermissions() {
      const PERMISSIONS = [
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ];
      if (Platform.OS === 'android') {
        PermissionsAndroid.requestMultiple(PERMISSIONS).then((results) => {
          const allPermissionsGranted = Object.values(results).every(
            (result) => result === 'granted',
          );
          if (allPermissionsGranted) {
            setPermissionsGranted(true);
          } else {
            checkPermissions();
          }
        });
      } else {
        setPermissionsGranted(true);
      }
    }
    checkPermissions();
    checkPushyUpdate();
  }, []);

  if (!permissionsGranted) {
    return null;
  }
  return (
    <Provider store={ReduxStore}>
      <StatusBar  
         animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden  
         hidden={false}  //是否隐藏状态栏。  
         backgroundColor="transparent" //状态栏的背景色  
         translucent={false}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。  
         barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')   
        >  
      </StatusBar> 
      
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <RootScreen />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}
