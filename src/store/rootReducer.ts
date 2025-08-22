import { combineReducers } from '@reduxjs/toolkit';
import { ApplicationReducer } from './application/reducers/applicationReducer';
import { QuillReducer } from './quill/reducers/quillReducer';

const rootReducer = combineReducers({
  ApplicationReducer,
  QuillReducer
});

export default rootReducer;

export type RootStateBase = ReturnType<typeof rootReducer>
