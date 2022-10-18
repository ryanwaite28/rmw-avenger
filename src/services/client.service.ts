import { Observable } from "rxjs";
import { ServiceMethodResultsInfo } from "../interfaces/_common.interface";
import * as Axios from 'axios';
import { AppKeysConstants } from "../enums/app.enum";







const axios = Axios.default;






export class ClientService {

  static readonly BASE_PATH: string = '/apps';
  // static readonly API: string = `${USE_API_CONFIG.DOMAIN}:${USE_API_CONFIG.PORT}` + ClientService.BASE_PATH;
  static readonly API: string = ``;

  static readonly axios = axios;

  static sendRequest<T = any>(
    route: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: object | FormData | null,
    overrideOptions?: any,
  ): Observable<ServiceMethodResultsInfo<T>> {
    return new Observable((observer) => {
      const jwt = window.localStorage.getItem(AppKeysConstants.JWT_NAME);

      const api_url = route.startsWith(`http`) ? route : ClientService.API + route;
        
      const headers: any = {
        'Accept': 'application/json',
      };

      const isJsonData = !!data && data.constructor === Object;
      console.log({ data, isJsonData });
      if (isJsonData) {
        headers['Content-Type'] = 'application/json';
      }
      else if (!!data && data.constructor === FormData) {
        console.log(`is form data =====`);
        headers['Content-Type'] = 'multipart/form-data';
      }
      
      const fetchOptions: any = {
        method,
        headers,
        // credentials: 'include',
      }
      if (overrideOptions) {
        Object.assign(fetchOptions, overrideOptions);
      }
      
      const body = isJsonData ? JSON.stringify(data) : (<FormData> data);
      switch (method) {
        case 'POST':
        case 'PUT': {
          if (data) {
            fetchOptions['body'] = body;
          }
          break;
        }
      }

      fetchOptions.headers['Authorization'] = `Bearer ${jwt}`;

      const axiosRequestOptions = {
        url: api_url,
        method: method.toLowerCase(),
        headers: fetchOptions.headers,
        data,
      };
        
      console.log(`\n\nfetching...`, api_url, `\n\n`);
      console.log(`\n\n`, fetchOptions, axiosRequestOptions, `\n\n`);

      (async () => {
        try {
          const response = await axios.request(axiosRequestOptions);
          console.log(`\n\n`);
          console.log({ response });
          console.log({ response_data: JSON.stringify(response.data) });
          console.log(`\n\n`);

          observer.next(response.data as ServiceMethodResultsInfo<T>);
        }
        catch (error: Axios.AxiosError | any) {
          console.log(`axios error block`);
          console.log({ axios_error: error });
          observer.error(error);
  
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(`Axios Error Response:`);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
          else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          }
          else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        }
        finally {
          console.log(`===== requested ended =====`);
          observer.complete();
        }
      })();
    });
  }
}