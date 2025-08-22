import type { AppThunk } from "../../../utils/reduxUtil";
import i18n from '../../../i18n';
import { CURRENTLANGUAGE_SET, OBJECTSUSED_ADD, OBJECTSUSED_EDIT, OBJECTSUSED_MOVE, OBJECTSUSED_REMOVE, TOOLBAR_SET, VIEWMODE_SET, INSERT_MODE_SET } from "../../../types/application";
import type { AnyObject } from "../../../types/objects";
import type { ViewMode } from '../../../types';


export function SetCurrentLanguage(language: string): AppThunk {
    return async function dispatchSetCurrentLanguage(dispatch) {
        i18n.changeLanguage(language);
        dispatch({
            payload: language,
            type: CURRENTLANGUAGE_SET
        });
    };
}

export function EditObject(id: string, data: Record<string, unknown>): AppThunk {
    return async function dispatchEditObject(dispatch) {
        dispatch({
            payload: {
                id,
                data
            },
            type: OBJECTSUSED_EDIT
        });
    };
}

export function AddObject(object: AnyObject, position?: number): AppThunk {
    return async function dispatchAddObject(dispatch) {
        dispatch({
            payload: { object, position },
            type: OBJECTSUSED_ADD
        });
    };
}

export function RemoveObject(object: AnyObject): AppThunk {
    return async function dispatchRemoveObject(dispatch) {
        dispatch({
            payload: object,
            type: OBJECTSUSED_REMOVE
        });
    };
}

export function MoveObject(object: AnyObject, to: number): AppThunk {
    return async function dispatchMoveObject(dispatch) {
        dispatch({
            payload: { object, to },
            type: OBJECTSUSED_MOVE
        });
    };
}

export function SetViewMode(mode: ViewMode): AppThunk {
    return async function dispatchSetViewMode(dispatch) {
        dispatch({
            payload: mode,
            type: VIEWMODE_SET
        });
    };
}

export function SetToolbar(toolbar: boolean): AppThunk {
    console.log("toolbar", toolbar)
    return async function dispatchSetToolbar(dispatch) {
        dispatch({
            payload: toolbar,
            type: TOOLBAR_SET
        });
    };
}

export function SetInsertMode(isActive: boolean, selectedObject?: AnyObject): AppThunk {
    return async function dispatchSetInsertMode(dispatch) {
        dispatch({
            payload: { isActive, selectedObject },
            type: INSERT_MODE_SET
        });
    };
}