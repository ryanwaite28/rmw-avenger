import { HttpStatusCode } from "../enums/http-codes.enum";



export interface IUser {
  
}






export interface ServiceMethodResultsInfo<T = any> {
  message?: string;
  data?: T;
  error?: any;
};

/**
 * @interface ServiceMethodResults
 * 
 * @description
 * Interface for a service method return value.
 * - status: uses an http code to signify result of action
 * - error: flag to indicate if there was an error
 * - info: object that serves as details about the results
 */
export type ServiceMethodResults<T = any> = {
  status: HttpStatusCode,
  error: boolean,
  info: ServiceMethodResultsInfo<T>,
};

export type ServiceMethodAsyncResults<T = any> = Promise<ServiceMethodResults<T>>;