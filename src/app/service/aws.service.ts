import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app.config.service';
import { catchError, map, of, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AWSService {
    
    private readonly aws_api_gateway_endpoint = 'aws-api-gateway-endpoint';
    private readonly create_user_endpoint = '/user'

    constructor(private _httpClient: HttpClient,    
        private _appConfigService: AppConfigService) {
    }

    /**
     * @param username - Account Username to be registered
     * @param password - Account Password
     * @returns - An observable which will give the output of the http request
     */
    createUser(username: string, password: string) {
        const url = this._appConfigService.getConfig()[this.aws_api_gateway_endpoint] + this.create_user_endpoint;

        this._httpClient.post(
            url,
            btoa(JSON.stringify({
                name: username,
                password: password,
            }))
        ).pipe(
            map((val) => {
                console.log("Success. User created ", val);
                return val;
            }),
            catchError(err => {
                console.log("catchError Error during creating user ", err);
                return of(err);
            }),
            finalize(() => {
                console.log("Request complete");
            })
        ).subscribe();
    }
}