
import { Dimensions } from 'react-native';

// export const HOST = 'http://192.168.3.231:80';

export const HOST = 'http://121.43.176.103';

export const SWFTHOST = 'https://swap.swftcoin.com';

export const API_ENDPOINT = `${HOST}/api/service`;

export const API_SWFT = `${SWFTHOST}/api/v2`;


export const SCREENHEIGHT = Dimensions.get('window').height
export const SCREENWIDTH = Dimensions.get('window').width

export const GETIMAGEURL = (imageId: number) =>
  `${API_ENDPOINT}/file/${imageId}`;

export const DEFAULTAVATAR =
  'https://tb2.bdstatic.com/tb/static-pb/img/head_80.jpg';


export const CHAINS = {eth: 'ETH', bnb: 'BSC', ht: 'HECO'}