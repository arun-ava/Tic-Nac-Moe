import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app.config.service';
import { catchError, map, of, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IAccount } from '../models/Account';
import { IMatch } from '../models/Match';

@Injectable({ providedIn: 'root' })
export class AWSService {
    
    private readonly aws_api_gateway_endpoint = 'aws-api-gateway-endpoint';
    private readonly user_base_endpoint = '/user';
    private readonly game_base_endpoint = '/game';

    constructor(private _httpClient: HttpClient,    
        private _appConfigService: AppConfigService) {
    }

    /**
     * @param username - Account Username to be registered
     * @param password - Account Password
     * @returns - An observable which will give the output of the http request
     */
    createUser(username: string, password: string) {
        const url = this._appConfigService.getConfig()[this.aws_api_gateway_endpoint] + this.user_base_endpoint;

        return this._httpClient.post(
            url,
            btoa(JSON.stringify({
                name: username,
                password: password,
            }))
        )
        .pipe(
            map((val) => {
                console.log("Success. User created ", val);
                return val;
            }),
            catchError(err => {
                console.log("catchError Error during creating user ", err);
                throw (err);
            }),
            finalize(() => {
                console.log("Request complete");
            })
        )
        // .subscribe();
    }

    getUser(username: string) {
        const url = this._appConfigService.getConfig()[this.aws_api_gateway_endpoint] + this.user_base_endpoint + '/' + username ;

        return this._httpClient.get(
            url,
        ).pipe(
            map((val) => {
                console.log("User details fetched ", val);
                return val as IAccount;
            }),
            catchError(err => {
                console.log("catchError Error during fetching user ", err);
                throw (err);
            }),
            finalize(() => {
                console.log("Request complete");
            })
        );
    }

    signInUser(username: string, password: string) {
        const url = this._appConfigService.getConfig()[this.aws_api_gateway_endpoint] + this.user_base_endpoint + '/' + username ;

        return this._httpClient.get(
            url,
        ).pipe(
            map((val) => {
                console.log("User details fetched ", val);
                return val;
            }),
            catchError(err => {
                console.log("catchError Error during fetching user ", err);
                throw (err);
            }),
            finalize(() => {
                console.log("Request complete");
            })
        );
    }

    createGame(match: IMatch) {
        const url = this._appConfigService.getConfig()[this.aws_api_gateway_endpoint] + this.game_base_endpoint;

        return this._httpClient.post(
            url,
            btoa(JSON.stringify({
                match
            }))
        ).pipe(
            map((val) => {
                console.log("New game created ", val);
                return val;
            }),
            catchError(err => {
                console.log("catchError Error during creating game ", err);
                throw (err);
            }),
            finalize(() => {
                console.log("Request complete");
            })
        );
    }

    getPlayerGames(username: string) {
        const url = this._appConfigService.getConfig()[this.aws_api_gateway_endpoint] 
        + this.user_base_endpoint + '/' + username + '/games';

        return this._httpClient.get(url).pipe(
            map((val) => {
                console.log("Games associated to {0} - {1}", username, val);
                return val;
            }),
            catchError(err => {
                console.log("catchError Error during fetching games ", err);
                throw (err);
            }),
            finalize(() => {
                console.log("Request complete");
            })
        );
    }
}