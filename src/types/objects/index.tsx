import type { IBaseObjectProps } from "../../components/objects/BaseObject.tsx";
import Text from "../../components/objects/text/text.tsx";
import type { TextData } from "../../components/objects/text/text.tsx";
export type ObjectType = 'title' | 'text' | 'image';
export type ObjectMode = 'edit' | 'view';

export interface Object<T = Record<string, unknown>> {
  id: string;
  type: ObjectType;
  label: string;
  icon?: string;
  data: T;
}

// Tipo para aceitar diferentes tipos de data no InitialObjects
export type AnyObject = Object<TextData> | Object<Record<string, unknown>>;

// Lista de tipos de objetos disponíveis na paleta (não são instâncias)
export const InitialObjects = [
  {
    id: "0",
    type: 'text' as ObjectType,
    label: 'Texto',
    icon: '📝',
    data: {
      content: 'Este é um texto de exemplo.',
      fontSize: '16px',
      color: '#000000'
    } as TextData
  }
] as AnyObject[];


export const ObjectElements = [{
  type: 'text' as ObjectType,
  element: Text,
}] as ObjectElement[];

export interface ObjectElement {
  type: ObjectType;
  element: React.FC<IBaseObjectProps>;
}