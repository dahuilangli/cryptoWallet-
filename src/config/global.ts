import i18n from '../i18n';
import { Dimensions } from 'react-native';

declare module global {
  let i18n: any;
  let screenHeight: number;
  let screenWidth: number;
}

global.i18n = i18n;
global.screenHeight = Dimensions.get('window').height;
global.screenWidth = Dimensions.get('window').width;
