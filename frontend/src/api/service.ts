import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// get apiURL from ENV
const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

// create axios instance with baseURL and predefined timeout
const _axios = axios.create({
  url: apiUrl,
  baseURL: apiUrl,
  timeout: 300000,
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken'
});

// set Authorization header via axios interceptors
// uncomment for API token or JWT auth
/* _axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${sessionStorage.getItem('authToken')}`;
  return Promise.resolve(config);
}, error => {
  return Promise.reject(error)
}) */

// defined methods in HttpClient
interface HttpMethods {
  get<R, P>(path: string, _params?: P | null): Promise<R>;
  post<R, B>(path: string, body: B): Promise<R>;
  put<R, B>(path: string, id: string | number | null | undefined, body: B): Promise<R>;
  patch<R, B>(path: string, id: string | number | null, body: B): Promise<R>;
  delete<R, B>(path: string, id: string | number | null, body?: B | undefined): Promise<R>;
  uploadFile<R>(path: string, file: File): Promise<R>;
  downloadFile<P>(path: string, _params?: P | null): Promise<Blob | AxiosResponse<Blob>>;
}

// exporting an object literal to keep KISS principle and avoid singletone boilerplate
export const HttpClient: HttpMethods = {
  async get<R, P>(path: string, _params: P | null = null) {
    const request: AxiosRequestConfig = {
      params: _params,
      withCredentials: true,
    };

    return _axios.get<R>(path, request)
      .then((response) => {
        return response.data as R
      });
  },

  async post<R, B>(path: string, body: B) {
    return _axios.post<R>(path, body)
      .then((resp: any) => resp.data as R);
  },

  async put<R, B>(path: string, id: string | number | null, body: B) {
    if (!id) {
      return _axios.put<R>(path, body)
      .then((resp: any) => resp.data as R);
    }
    return _axios.put<R>(`${path}${id}/`, body)
      .then((resp: any) => resp.data as R);
  },

  async patch<R, B>(path: string, id: string | number | null, body: B) {
    if (!id) {
      return _axios.patch<R>(path, body)
      .then((resp: any) => resp.data as R);
    }
    return _axios.patch<R>(`${path}${id}`, body)
      .then((resp: any) => resp.data as R);
  },

  async delete<R, B>(path: string, id: string | number | null, body?: B) {
    if (!id) {
      return _axios.delete<R>(path, { data: body})
        .then((resp: any) => resp.data as R);
    }
    return _axios.delete<R>(`${path}${id}`)
      .then((resp: any) => resp.data as R);
  },

  async uploadFile<R>(path: string, file: File) {
    const data = new FormData()
    data.append('dump', file)

    return _axios.post<R>(path, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(resp => resp.data as R);
  },

  async downloadFile<P>(path: string, _params: P | null = null) {
    return _axios.get<Blob>(path, { responseType: 'blob', params: _params })
      .then((response) => {
        let fileName: string = response.headers['content-disposition'].split('=')[1];
        if (fileName.includes('UTF-8')) {
          const encodedName = fileName.split("'");
          fileName = encodedName.length === 3 ? encodedName[2] : fileName;
        }
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return response;
    })
  }
}
