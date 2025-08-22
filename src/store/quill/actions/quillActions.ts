import type { AppThunk } from "../../../utils/reduxUtil";
import { CURRENTQUILL_SET } from "../../../types/quill";

export function SetCurrentQuill(quillId: string): AppThunk {
    return async function dispatchSetCurrentQuill(dispatch) {
        dispatch({
            payload: quillId,
            type: CURRENTQUILL_SET
        });
    };
}
