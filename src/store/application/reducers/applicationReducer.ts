
import { CURRENTLANGUAGE_SET, LOWPERFORMANCE_SET, OBJECTSLIST_SET as OBJECTSLIST_SET, OBJECTSUSED_ADD, OBJECTSUSED_MOVE, OBJECTSUSED_REMOVE, OBJECTSUSED_EDIT, type ApplicationState, type ApplicationTypes } from '../../../types/application';
import { InitialObjects, type Object } from '../../../types/objects';

const INITIAL_STATE: ApplicationState = {
    currentLanguage: 'pt',
    isLowPerformance: false,
    ObjectsList: InitialObjects,
    ObjectsUsed: [],
}

export function ApplicationReducer(state = INITIAL_STATE, action: ApplicationTypes): ApplicationState {
    switch (action.type) {
        case LOWPERFORMANCE_SET:
            return { ...state, isLowPerformance: action.payload };
        case CURRENTLANGUAGE_SET:
            return { ...state, currentLanguage: action.payload };
        case OBJECTSLIST_SET:
            return { ...state, ObjectsList: action.payload };
        case OBJECTSUSED_ADD: {
            // Função para gerar GUID
            function generateGuid() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }
            const newObject = {
                ...action.payload,
                id: generateGuid()
            };
            return {
                ...state,
                ObjectsUsed: state.ObjectsUsed ? [...state.ObjectsUsed, newObject] : [newObject]
            };
        }
        case OBJECTSUSED_REMOVE: {
            // Garante que o id comparado é string
            const removeId = String(action.payload.id);
            console.log(removeId)   

            const r = {
                ...state,
                ObjectsUsed: state.ObjectsUsed ? state.ObjectsUsed.filter((obj: Object) => String(obj.id) !== removeId) : []
            }

            console.log("r", r)
            return {
                ...state,
                ObjectsUsed: state.ObjectsUsed ? state.ObjectsUsed.filter((obj: Object) => String(obj.id) !== removeId) : []
            };
        }
        case OBJECTSUSED_MOVE: {
            if (!state.ObjectsUsed) return state;
            const { object, to } = action.payload;
            const filtered = state.ObjectsUsed.filter((obj: Object) => obj.id !== object.id);
            const newList = [...filtered.slice(0, to), object, ...filtered.slice(to)];
            return {
                ...state,
                ObjectsUsed: newList
            };
        }
        case OBJECTSUSED_EDIT: {
            if (!state.ObjectsUsed) return state;
            const { id, data } = action.payload;
            return {
                ...state,
                ObjectsUsed: state.ObjectsUsed.map((obj: Object) =>
                    obj.id === id ? { ...obj, ...data } : obj
                )
            };
        }
        default:
            return state;
    }
}