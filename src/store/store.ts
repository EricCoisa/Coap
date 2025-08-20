import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export const Store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;

export function GetState(): RootState {
    return Store.getState()
}
