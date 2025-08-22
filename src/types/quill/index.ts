export const CURRENTQUILL_SET = 'CURRENTQUILL_SET';

export interface QuillState {
    currentQuillId: string | null;
}

export interface QuillCurrentAction {
    type: typeof CURRENTQUILL_SET;
    payload: string | null;
}

export type QuillTypes = QuillCurrentAction;