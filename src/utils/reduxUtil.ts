import type { ThunkAction } from '@reduxjs/toolkit';
import { connect, type ConnectedProps } from "react-redux";
import { bindActionCreators } from 'redux';
import type { Dispatch, AnyAction, ActionCreatorsMapObject, Action } from 'redux';
import type { RootStateBase } from '../store/rootReducer';

export function connectUtil<TState, TProps, TDispatch extends ActionCreatorsMapObject>(
  // eslint-disable-next-line no-unused-vars
  mapState: (state: TState) => TProps,
  actions: TDispatch
) {
  function mapDispatch(dispatch: Dispatch<AnyAction>) {
    return bindActionCreators(actions, dispatch);
  }

  return connect(mapState, mapDispatch); // Combine mapState and mapDispatch
}


export function connectState<TState, TProps>(
  // eslint-disable-next-line no-unused-vars
  mapState: (state: TState) => TProps,
) {
  return connect(mapState); // Combine mapState and mapDispatch
}


export function connectAction<TDispatch extends ActionCreatorsMapObject>(
  actions: TDispatch
) {
  function mapState() {
    return {};
  }
  function mapDispatch(dispatch: Dispatch<AnyAction>) {
    return bindActionCreators(actions, dispatch);
  }
  return connect(mapState, mapDispatch); // Combine mapState and mapDispatch
}

export type PropsFromRedux<TConnector> = ConnectedProps<TConnector>;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootStateBase,
	undefined,
	Action
>;