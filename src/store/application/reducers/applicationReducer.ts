
import { CURRENTLANGUAGE_SET, LOWPERFORMANCE_SET, OBJECTSLIST_SET, OBJECTSUSED_ADD, OBJECTSUSED_MOVE, OBJECTSUSED_REMOVE, OBJECTSUSED_EDIT, type ApplicationState, type ApplicationTypes, VIEWMODE_SET, TOOLBAR_SET, INSERT_MODE_SET, MOVE_MODE_SET, OBJECTSUSED_SET } from '../../../types/application';
import { InitialObjects, type AnyObject } from '../../../types/objects';

const INITIAL_STATE: ApplicationState = {
    currentLanguage: 'pt',
    isLowPerformance: false,
    ObjectsList: InitialObjects,
    ObjectsUsed: [],
    viewMode: 'editor',
    toolbar: false,
    insertMode: {
        isActive: false,
        selectedObject: undefined
    },
    moveMode: {
        isActive: false,
        selectedObjectId: undefined
    }
}

export function ApplicationReducer(state = INITIAL_STATE, action: ApplicationTypes): ApplicationState {
    switch (action.type) {
        case VIEWMODE_SET:
            return { ...state, viewMode: action.payload };
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
            
            const { object, position } = action.payload;
            const newObject = {
                ...object,
                id: generateGuid()
            };
            
            const currentList = state.ObjectsUsed || [];
            
            // Se uma posição foi especificada, inserir nessa posição
            if (typeof position === 'number') {
                const newList = [...currentList];
                const insertIndex = Math.max(0, Math.min(position, currentList.length));
                newList.splice(insertIndex, 0, newObject);
                return {
                    ...state,
                    ObjectsUsed: newList
                };
            }
            
            // Caso contrário, adicionar no final (comportamento padrão)
            return {
                ...state,
                ObjectsUsed: [...currentList, newObject]
            };
        }
        case OBJECTSUSED_REMOVE: {
            // Garante que o id comparado é string
            const removeId = String(action.payload.id);
            console.log(removeId)   

            const r = {
                ...state,
                ObjectsUsed: state.ObjectsUsed ? state.ObjectsUsed.filter((obj: AnyObject) => String(obj.id) !== removeId) : []
            }

            console.log("r", r)
            return {
                ...state,
                ObjectsUsed: state.ObjectsUsed ? state.ObjectsUsed.filter((obj: AnyObject) => String(obj.id) !== removeId) : []
            };
        }
        case OBJECTSUSED_MOVE: {
            if (!state.ObjectsUsed) return state;
            const { object, to } = action.payload;
            
            // Encontrar o índice atual do objeto
            const currentIndex = state.ObjectsUsed.findIndex((obj: AnyObject) => obj.id === object.id);
            if (currentIndex === -1) return state; // Objeto não encontrado
            
            // Se está tentando mover para a mesma posição, não fazer nada
            if (currentIndex === to) return state;
            
            // Criar uma nova lista
            const newList = [...state.ObjectsUsed];
            
            // Remover o objeto da posição atual
            newList.splice(currentIndex, 1);
            
            // Calcular a nova posição após a remoção
            let targetIndex = to;
            if (currentIndex < to) {
                targetIndex = to - 1; // Ajustar porque removemos um item antes
            }
            
            // Garantir que o índice esteja dentro dos limites
            targetIndex = Math.max(0, Math.min(targetIndex, newList.length));
            
            // Inserir o objeto na nova posição
            newList.splice(targetIndex, 0, object);
            
            return {
                ...state,
                ObjectsUsed: newList
            };
        }
        case OBJECTSUSED_EDIT: {
            console.log("Editando objeto:", action.payload);
            if (!state.ObjectsUsed) return state;
            const { id, data } = action.payload;
            return {
                ...state,
                ObjectsUsed: state.ObjectsUsed.map((obj: AnyObject) =>
                    obj.id === id ? { ...obj, data:data } : obj
                )
            };
        }
        case OBJECTSUSED_SET: {
            return { ...state, ObjectsUsed: action.payload };
        }
        case TOOLBAR_SET:
            return { ...state, toolbar: action.payload };
        case INSERT_MODE_SET:
            return { 
                ...state, 
                insertMode: {
                    isActive: action.payload.isActive,
                    selectedObject: action.payload.selectedObject
                }
            };
        case MOVE_MODE_SET:
            return { 
                ...state, 
                moveMode: {
                    isActive: action.payload.isActive,
                    selectedObjectId: action.payload.selectedObjectId
                }
            };
        default:
            return state;
    }
}