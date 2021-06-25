import 'config/configure';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import 'config/global';

import { AppRegistry } from 'react-native';
import App from 'routers/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
