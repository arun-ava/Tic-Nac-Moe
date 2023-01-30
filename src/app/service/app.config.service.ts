import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AppConfigService {
  private appConfig: any;
  

  constructor(private _httpClient: HttpClient) {}

  initAppConfig(){
    return firstValueFrom(this._httpClient.get('assets/configs.json')).then((val) => {
      this.appConfig = val;
    });

    // TODO : See if this can be done using observables instead of promises
    // return this._httpClient.get('assets/configs.json').subscribe((val) => {
    //   this.appConfig = val;
    // }).unsubscribe();
  }

  getConfig() {
    return this.appConfig;
  }
}