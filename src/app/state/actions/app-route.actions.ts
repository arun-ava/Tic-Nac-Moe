import { createAction, props } from '@ngrx/store';

export const setFirstUrlActionCreator = createAction(
    '[App] Set first url',
    props<{
        url: string
    }>()
);

export const addUrlActionCreator = createAction(
    '[App] Add url',
    props<{
        url: string
    }>()
);