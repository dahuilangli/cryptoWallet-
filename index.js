import 'utils/configure';

// 导入加密 getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// 导入 ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';
import 'utils/global';

import { AppRegistry } from 'react-native';
import App from 'routers/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
