import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiConfiguration} from '../model/api-configuration.model';
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiConfiguration: ApiConfiguration = {baseUrl: "changeme", referentielijstenBaseUrl: "changeme"};

  constructor(private http: HttpClient) {
  }

  public async loadConfiguration(): Promise<ApiConfiguration | null> {
    return firstValueFrom(this.http
      .get('config/config.json'))
      .then((configuration: any) => {
        this.apiConfiguration = configuration as ApiConfiguration;
        return configuration;
      })
      .catch((error: any) => {
        console.error(error);
        return null;
      });
  }
}
