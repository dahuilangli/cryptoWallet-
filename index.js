import 'config/configure';
import 'react-native-get-random-values';
import "./shim";
import '@ethersproject/shims';
import { AppRegistry } from 'react-native';
import App from 'routers/App';
import { name as appName } from './app.json';

console.disableYellowBox = true // 关闭全部黄色警告

AppRegistry.registerComponent(appName, () => App);
