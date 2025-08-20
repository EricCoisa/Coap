export const LOWPERFORMANCE_SET = 'LOWPERFORMANCE_SET';
export const CURRENTLANGUAGE_SET = 'CURRENTLANGUAGE_SET';
export const OBJECTSLIST_SET = 'OBJECTSLIST_SET';

export const OBJECTSUSED_ADD = 'OBJECTSUSED_ADD';
export const OBJECTSUSED_REMOVE = 'OBJECTSUSED_REMOVE';
export const OBJECTSUSED_MOVE = 'OBJECTSUSED_MOVE';
export const OBJECTSUSED_EDIT = 'OBJECTSUSED_EDIT';

import type { AnyObject } from '../objects';

export interface ApplicationState {
    currentLanguage: string;
    isLowPerformance: boolean;
    ObjectsList?: AnyObject[];
    ObjectsUsed?: AnyObject[];
}

export interface ApplicationObjectsListAction {
    type: typeof OBJECTSLIST_SET;
    payload: AnyObject[];
}

export interface ApplicationObjectsUsedAddAction {
    type: typeof OBJECTSUSED_ADD;
    payload: {
        object: AnyObject;
        position?: number;
    };
}

export interface ApplicationObjectsUsedRemoveAction {
    type: typeof OBJECTSUSED_REMOVE;
    payload: AnyObject;
}

export interface ApplicationObjectsUsedMoveAction {
    type: typeof OBJECTSUSED_MOVE;
    payload: {
        object: AnyObject;
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