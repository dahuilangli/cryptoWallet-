import { apiEndpoint } from 'utils/constants';
import {ReduxStore}  from 'store';
import  {getToken} from 'selector/wallet';
import myAction from 'actions/my';

interface RequestOptions extends RequestInit {
  timeout?: number;
}


const falseResult = { ok: false, data: null };
async function request(
  url: string,
  options: RequestOptions,
): Promise<{ ok: boolean; data: any; msg?: string }> {
  const additionalHeader = (options.method === 'POST' ||
    options.method === 'PUT') && {
    Accept: 'application/json',
    'Content-Type':
      options.body instanceof FormData
        ? 'multipart/form-data'
        : 'application/json',
  };
  const resp = await Promise.race<Response | undefined>([
    fetch(apiEndpoint + url, {
      ...options,
      headers: {
        ...(additionalHeader || {}),
        ...(options.headers || {}),
        Authorization: `Bearer ${getToken(ReduxStore.getState())}`,
      },
    }).catch((_e) => undefined),
    new Promise<undefined>((resolve) =>
      setTimeout(resolve, options.timeout || 20000),
    ),
  ]);
  if (resp) {
    if (resp.status === 401) {
      ReduxStore.dispatch(myAction.logout());
      return falseResult;
    }
    const text = await resp.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      console.warn('RESP failed to parse: ', text);
      throw e;
    }
    return json;
  } else {
    // console.warn('request timeout:', url);
    return falseResult;
  }
}

export function get(url: string, options: RequestOptions = {}) {
  return request(url, {
    ...options,
    method: 'GET',
  });
}

export function post(url: string, body: object, options: RequestOptions = {}) {
  return request(url, {
    ...options,
    body: body instanceof FormData ? body : JSON.stringify(body),
    method: 'POST',
  });
}

export function put(url: string, body: object, options: RequestOptions = {}) {
  return request(url, {
    ...options,
    body: body instanceof FormData ? body : JSON.stringify(body),
    method: 'PUT',
  });
}
