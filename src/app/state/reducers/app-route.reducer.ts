import {createReducer, on} from '@ngrx/store';
import { IApplicationRoute } from 'src/app/models/ApplicationRoute';
import { addUrlActionCreator, setFirstUrlActionCreator } from '../actions/app-route.actions';

export const initialState:Readonly<IApplicationRoute> = {
    firstUrl: '',
    urls: []
};

export const applicationRouteReducer = createReducer(
    initialState,
    on(setFirstUrlActionCreator, (state, { url }) => {
        return {
            firstUrl: url,
            urls: state.urls,
        } 
    }),

    on(addUrlActionCreator, (state, { url }) => {
        return {
            firstUrl: state.firstUrl,
            urls: [...state.urls, url],
        } 
    }),
);
