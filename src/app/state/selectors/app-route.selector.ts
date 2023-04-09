import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IMatch } from '../../models/Match';
import { IApplicationRoute } from '../../models/ApplicationRoute';

export const selectApplicationRoute = createFeatureSelector<IApplicationRoute>('applicationRoute');

export const applicationFirstRouteSelector  = createSelector(
    selectApplicationRoute,
    (route) => {
        return route.firstUrl;
    }
);


export const applicationAllRoutesSelector  = createSelector(
    selectApplicationRoute,
    (route) => {
        return route.urls;
    }
);
