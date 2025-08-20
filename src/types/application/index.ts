export const LOWPERFORMANCE_SET = 'LOWPERFORMANCE_SET';
export const CURRENTLANGUAGE_SET = 'CURRENTLANGUAGE_SET';
export const OBJECTSLIST_SET = 'OBJECTSLIST_SET';

export const OBJECTSUSED_ADD = 'OBJECTSUSED_ADD';
export const OBJECTSUSED_REMOVE = 'OBJECTSUSED_REMOVE';
export const OBJECTSUSED_MOVE = 'OBJECTSUSED_MOVE';
export const OBJECTSUSED_EDIT = 'OBJECTSUSED_EDIT';

import type { Object } from '../objects';

export interface ApplicationState {
    currentLanguage: string;
    isLowPerformance: boolean;
    ObjectsList?: Object[];
    ObjectsUsed?: Object[];
}

export interface ApplicationObjectsListAction {
    type: typeof OBJECTSLIST_SET;
    payload: Object[];
}

export interface ApplicationObjectsUsedAddAction {
    type: typeof OBJECTSUSED_ADD;
    payload: Object;
}

export interface ApplicationObjectsUsedRemoveAction {
    type: typeof OBJECTSUSED_REMOVE;
    payload: Object;
}

export interface ApplicationObjectsUsedMoveAction {
    type: typeof OBJECTSUSED_MOVE;
    payload: {
        object: Object;
        to: number;
    };
}

export interface ApplicationObjectsUsedEditAction {
    type: typeof OBJECTSUSED_EDIT;
    payload: {
        id: string;
        data: Record<string, unknown>;
    };
}

export interface ApplicationLowPerformanceAction {
    type: typeof LOWPERFORMANCE_SET;
    payload: boolean;
}

export interface ApplicationLanguageAction {
    type: typeof CURRENTLANGUAGE_SET;
    payload: string;
}

export type ApplicationTypes = ApplicationLanguageAction | ApplicationLowPerformanceAction | ApplicationObjectsListAction | ApplicationObjectsUsedAddAction | ApplicationObjectsUsedRemoveAction | ApplicationObjectsUsedMoveAction | ApplicationObjectsUsedEditAction;