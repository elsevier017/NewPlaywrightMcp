import axios, { AxiosInstance } from 'axios';

export class BaseApiService {
  protected api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({ baseURL });
  }
}
