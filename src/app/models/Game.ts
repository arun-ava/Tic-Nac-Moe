import { IMatch } from "./Match";
import { IAccount } from './Account';

export interface IGame {
    matches: IMatch;
    account: IAccount;
}