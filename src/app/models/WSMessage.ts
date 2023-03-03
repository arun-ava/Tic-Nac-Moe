import { WSMessageTypes } from "../enums/ws-message";

export interface IWSMessageRequest {
    action : string; // contains the message action type
    message: {
        type: WSMessageTypes,
        gameid: string,
        username: string,
    }
}

export interface IWSMessageResponse {
}