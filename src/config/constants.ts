
import { Dimensions } from 'react-native';

export const HOST = 'http://192.168.2.21:80';

// export const HOST = 'http://121.43.176.103';

export const API_ENDPOINT = `${HOST}/api/service`;


export const SCREENHEIGHT = Dimensions.get('window').height
export const SCREENWIDTH = Dimensions.get('window').width

export const GETIMAGEURL = (imageId: number) =>
  `${API_ENDPOINT}/file/${imageId}`;

export const DEFAULTAVATAR =
  'https://tb2.bdstatic.com/tb/static-pb/img/head_80.jpg';


export const CHAINS = {eth: 'ETH', bnb: 'BNB', ht: 'HT'}