import type { IBaseObjectProps } from "../../components/objects/BaseObject.tsx";
import Text from "../../components/objects/text/text.tsx";
import RichText from "../../components/objects/richtext/richtext.tsx";
import type { TextData } from "../../components/objects/text/text.tsx";

export type ObjectType = 'title' | 'text' | 'image' | 'richtext';
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
    type: 'text' as ObjectType,
    label: 'Título',
    icon: '📋',
    data: {
      content: 'Título de Exemplo',
      fontSize: '24px',
      color: '#333333'
    } as TextData
  },
  {
    id: "2",
    type: 'text' as ObjectType,
    label: 'Parágrafo',
    icon: '📄',
    data: {
      content: 'Este é um parágrafo de exemplo com mais conteúdo para testar.',
      fontSize: '14px',
      color: '#666666'
    } as TextData
  }
] as AnyObject[];


export const ObjectElements = [{
  type: 'text' as ObjectType,
  element: Text,
}, {
  type: 'richtext' as ObjectType,
  element: RichText,
}] as ObjectElement[];

export interface ObjectElement {
  type: ObjectType;
  element: React.FC<IBaseObjectProps>;
}