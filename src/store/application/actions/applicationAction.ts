import type { AppThunk } from "../../../utils/reduxUtil";
import i18n from '../../../i18n';
import { CURRENTLANGUAGE_SET, OBJECTSUSED_ADD, OBJECTSUSED_EDIT, OBJECTSUSED_MOVE, OBJECTSUSED_REMOVE, TOOLBAR_SET, VIEWMODE_SET, INSERT_MODE_SET, MOVE_MODE_SET, OBJECTSUSED_SET } from "../../../types/application";
import type { AnyObject } from "../../../types/objects";
import Store from '../../../store/store';
import type { ViewMode } from '../../../types';

export function Save() {
    try {
        const state = Store.getState();
        console.log("state", state)
        const objectsUsed = state?.ApplicationReducer?.ObjectsUsed ?? [];
        console.log("Saving objectsUsed", objectsUsed);

            localStorage.setItem('ObjectsUsed', JSON.stringify(objectsUsed));
        
    } catch {
        // Silencioso para evitar erros
    }
}

export function Limpar() {
    try {
        localStorage.removeItem('ObjectsUsed');
        localStorage.removeItem('FirstTime');
    } catch {
        // Silencioso para evitar erros
    }
}

export function Load() : AnyObject[] {
    try {
        const data = localStorage.getItem('ObjectsUsed');

        if (data) {
            return JSON.parse(data);
        }
    } catch {
        // Silencioso
    }
    return [];
}

function SetFirstTime() {
    try {
        localStorage.setItem('FirstTime', "true");
    } catch {
        // Silencioso para evitar erros
    }
}

export function LoadFirstTime() : boolean {
    try {
        const data = localStorage.getItem('FirstTime');
        console.log("FirstTime", data);
        if (data === 'true') {
            return false;
        }
    } catch {
        // Silencioso
    }
    SetFirstTime();
    return true;
}



export function LoadObjects(objects? : AnyObject[] | undefined): AppThunk {
    return async function dispatchLoadObjects(dispatch) {
        
        const saved = objects ?? Load()
        if(saved != null){
            dispatch({
                payload: saved,
                type: OBJECTSUSED_SET
            });
        }
    };
}

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

export function SetMoveMode(isActive: boolean, selectedObjectId?: string): AppThunk {
    return async function dispatchSetMoveMode(dispatch) {
        dispatch({
            payload: { isActive, selectedObjectId },
            type: MOVE_MODE_SET
        });
    };
}