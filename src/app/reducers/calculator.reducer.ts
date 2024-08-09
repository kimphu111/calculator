import * as CalculatorActions from '../actions/calculator.action';
import { createReducer, on } from '@ngrx/store';

export const initialState = 0;

export const calculatorReudcer = createReducer(
  initialState,
  on(CalculatorActions.addition, (state, value) => value.num1 + value.num2),
  on(CalculatorActions.subtraction, (state, value) => value.num1 - value.num2),
  on(
    CalculatorActions.multiplication,
    (state, value) => value.num1 * value.num2,
  ),
  on(CalculatorActions.division, (state, value) => value.num1 / value.num2),
);
