import type { IBaseObjectProps } from "../../components/objects/BaseObject.tsx";
import Text from "../../components/objects/text/text.tsx";
import Title from "../../components/objects/title/title.tsx";
import type { TextData } from "../../components/objects/text/text.tsx";
import type { TitleData } from "../../components/objects/title/title.tsx";

export type ObjectType = 'title' | 'text';
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
  },
  {
    id: "1",
    type: 'title' as ObjectType,
    label: 'Título',
    icon: '📋',
    data: {
      content: 'Título de Exemplo',
      fontSize: '24px',
      color: '#333333'
    } as TitleData
  }
] as AnyObject[];


export const ObjectElements = [
  {
    type: 'title' as ObjectType,
    element: Title,
  }, {
    type: 'text' as ObjectType,
    element: Text,
  }
] as ObjectElement[];

export interface ObjectElement {
  type: ObjectType;
  element: React.FC<IBaseObjectProps>;
}