
import type { AppThunk } from "../../../utils/reduxUtil";
import i18n from '../../../i18n';
import { CURRENTLANGUAGE_SET, OBJECTSUSED_ADD, OBJECTSUSED_EDIT, OBJECTSUSED_MOVE, OBJECTSUSED_REMOVE } from "../../../types/application";
import type { Object } from "../../../types/objects";


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

export function AddObject(object: Object): AppThunk {
    return async function dispatchAddObject(dispatch) {
        dispatch({
            payload: object,
            type: OBJECTSUSED_ADD
        });
    };
}

export function RemoveObject(object: Object): AppThunk {
    return async function dispatchRemoveObject(dispatch) {
        dispatch({
            payload: object,
            type: OBJECTSUSED_REMOVE
        });
    };
}

export function MoveObject(object: Object, to: number): AppThunk {
    return async function dispatchMoveObject(dispatch) {
        dispatch({
            payload: { object, to },
            type: OBJECTSUSED_MOVE
        });
    };
}