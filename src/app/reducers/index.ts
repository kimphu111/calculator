import { isDevMode } from '@angular/core';

import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { calculatorReudcer } from './calculator.reducer';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  calculate: calculatorReudcer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
