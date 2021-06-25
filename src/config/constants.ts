
import { Dimensions } from 'react-native';
import * as i18ns from "../i18n"

export const HOST = 'http://121.43.176.103';

export const API_ENDPOINT = `${HOST}/api/service`;


export const SCREENHEIGHT = Dimensions.get('window').height
export const SCREENWIDTH = Dimensions.get('window').width

export const GETIMAGEURL = (imageId: number) =>
  `${API_ENDPOINT}/file/${imageId}`;

eval("i18n=i18ns;")
export const DEFAULTAVATAR =
  'https://tb2.bdstatic.com/tb/static-pb/img/head_80.jpg';

