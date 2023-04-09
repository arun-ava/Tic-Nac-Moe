import { WSMessageTypes } from "../enums/ws-message";
import { IBoard } from './Board';
import { IPlayer } from "./Player";

export interface IWSMessageRequest {
    action : string; // contains the message action type
    message: {
        type: WSMessageTypes,
        gameid?: string,
        username?: string,
        board?: IBoard,
        lastMovedBy?: IPlayer,
    }
}

export interface IWSMessageResponse {
}