import 'whatwg-fetch';

export default class Transport {
  constructor() {
    if (Transport.__instance) {
      return Transport.__instance;
    }

    this._headers = {};
    this._baseUrl = '';

    Transport.__instance = this;
  }

  get BaseUrl() {
    return this._baseUrl;
  }

  set BaseUrl(url) {
    this._baseUrl = url;
  }

  get Headers() {
    return this._headers;
  }

  set Headers(value) {
    if (!(value && (`${value}` === '[object Object]'))) {
      throw new TypeError('Headers must be a plain object');
    }

    const valid = Object.keys(value).every(key => typeof value[key] === 'string');

    if (!valid) {
      throw new TypeError('Headers must be a plain object');
    }

    this._headers = value;
  }

  get(uri) {
    return this._sender(uri, 'GET');
  }

  post(uri, data) {
    return this._sender(uri, 'POST', data);
  }

  put(uri) {
    return this._sender(uri, 'PUT');
  }

  delete(uri) {
    return this._sender(uri, 'DELETE');
  }

  _sender(uri, _method, data = null,
          _headers = { 'Content-Type': 'application/json; charset=utf-8' },
          coockies = 'include') {
    return fetch(this._baseUrl + uri, {
      method: _method,
      mode: 'cors',
      headers: _headers,
      body: data,
      credentials: coockies
    });
  }
}
