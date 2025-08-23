import { CURRENTQUILL_SET, type QuillState, type QuillTypes } from '../../../types/quill';

const INITIAL_STATE: QuillState = {
    currentQuillId: null,
}

export function QuillReducer(state = INITIAL_STATE, action: QuillTypes): QuillState {
    switch (action.type) {
        case CURRENTQUILL_SET:
            return { ...state, currentQuillId: action.payload };
        default:
            return state;
    }
}