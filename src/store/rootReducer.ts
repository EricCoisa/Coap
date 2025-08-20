import { combineReducers } from '@reduxjs/toolkit';
import { ApplicationReducer } from './application/reducers/applicationReducer';

const rootReducer = combineReducers({
  ApplicationReducer,
});

export default rootReducer;

export type RootStateBase = ReturnType<typeof rootReducer>
