import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app.config.service';
import { catchError, map, of, Subject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IAccount } from '../models/Account';
import { IMatch } from '../models/Match';
import { IMove, IBoard } from '../models/Board';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { IWSMessageRequest } from '../models/WSMessage';

@Injectable({ providedIn: 'root' })
export class AWSService {
    
    private readonly aws_api_gateway_endpoint = 'aws-api-gateway-endpoint';
    private readonly user_base_endpoint = '/user';
    private readonly game_base_endpoint = '/game';
    private readonly aws_ws_connection = 'aws-ws-connection';

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

    /**
     * @param username 
     * @returns All the games associated with the current user
     */
    getAllGamesByPlayer(username: string) {
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

    /**
     * @param username 
     * @returns All the games associated with the current user
     */
    // TODO: SEE IF BOARD CAN BE UPDATED WITH JUST MOVES. IS IT BETTER TO UPDATE WITH MOVES OR DIRECTLY SEND BOARD AS DYNAMODB DATABASES ARE DOCUMENT BASED
     makeMoveByGameID(gameid: string, move: IMove, board: IBoard) {
        const url = this._appConfigService.getConfig()[this.aws_api_gateway_endpoint] 
        + this.game_base_endpoint + '/moves';

        return this._httpClient.put(url,
            btoa(JSON.stringify({
                gameid: gameid,
                move: move,
                board: board
            }))).pipe(
            map((val) => {
                console.log('next val');
            }),
            catchError(err => {
                throw (err);
            }),
            finalize(() => {
                console.log("Request complete");
            })
        );
    }

    /**
     * @param username - username of the challenged
     * @param gameid - gameid of game to join as challenged 
     * @returns Observable of the post call to add a challenged player 
     */
    joinGame(username: string, gameid: string) {
        const url = this._appConfigService.getConfig()[this.aws_api_gateway_endpoint] 
        + this.game_base_endpoint + '/' + this.user_base_endpoint;

        return this._httpClient.post(url,
            btoa(JSON.stringify({
                gameid: gameid,
                user: username,
            }))).pipe(
            map((val) => {
                console.log('next val');
            }),
            catchError(err => {
                throw (err);
            }),
            finalize(() => {
                console.log("Request complete");
            })
        );
    }

    private _wsConnection!: WebSocketSubject<any>;
    createWSSConnection() {
        this._wsConnection = webSocket(this._appConfigService.getConfig()[this.aws_ws_connection]);
        this._wsConnection.subscribe({
            next: msg => console.log('ws message received: ' + msg), // Called whenever there is a message from the server.
            error: err => console.log('websocket error ', err), // Called if at any point WebSocket API signals some kind of error.
            complete: () => console.log('ws complete') // Called when connection is closed (for whatever reason).
           });
    }

    sendWSSMessageToServer(message: IWSMessageRequest) {
        this._wsConnection.next(message);
    }

    disconnectWSSConnection() {
        this._wsConnection.unsubscribe();
    }
}