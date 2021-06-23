import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import  {ReduxStore,persistor} from 'store';
import RootScreen from './RootScreen';
import { PersistGate } from 'redux-persist/es/integration/react';
import { RootSiblingParent } from 'react-native-root-siblings';
import checkPushyUpdate from 'utils/checkPushyUpdate';

import { WRootToastApp } from 'react-native-smart-tip';
export default function App() {
  React.useEffect(() => {
    checkPushyUpdate();
  }, []);
  return (
    <WRootToastApp>
      <Provider store={ReduxStore}>
        <StatusBar translucent={true} backgroundColor="transparent" barStyle={'light-content'}/>
        <PersistGate loading={null} persistor={persistor}>
          <RootSiblingParent>
            <RootScreen />
          </RootSiblingParent>
        </PersistGate>
      </Provider>
    </WRootToastApp>
  );
}
