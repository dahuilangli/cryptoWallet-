
export const HOST = 'http://121.43.176.103';

export const API_ENDPOINT = `${HOST}/api/service`;

export const GETIMAGEURL = (imageId: number) =>
  `${API_ENDPOINT}/file/${imageId}`;


export const DEFAULTAVATAR =
  'https://tb2.bdstatic.com/tb/static-pb/img/head_80.jpg';

