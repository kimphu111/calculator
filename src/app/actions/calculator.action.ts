// src/app/actions/calculator.action.ts
import { createAction, props } from '@ngrx/store';

export const addition = createAction(
  '[Calculate] Addition',
  props<{ num1: number; num2: number }>(),
);

export const subtraction = createAction(
  '[Calculate] Subtraction',
  props<{ num1: number; num2: number }>(),
);

export const multiplication = createAction(
  '[Calculate] Multiplication',
  props<{ num1: number; num2: number }>(),
);

export const division = createAction(
  '[Calculate] Division',
  props<{ num1: number; num2: number }>(),
);
