import type { IBaseObjectProps } from "../../components/objects/BaseObject.tsx";
import Text from "../../components/objects/text/text.tsx";
import Title from "../../components/objects/title/title.tsx";
import Image from "../../components/objects/image/image.tsx";
import type { TextData } from "../../components/objects/text/text.tsx";
import type { TitleData } from "../../components/objects/title/title.tsx";
import type { ImageData } from "../../components/objects/image/image.tsx";
import type { TopicData } from "../../components/objects/topic/topic.tsx";
import Topic from "../../components/objects/topic/topic.tsx";

export type ObjectType = 'title' | 'text' | 'image' | 'topic';

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
    type: 'title' as ObjectType,
    label: 'Título',
    icon: '📋',
    data: {
      content: 'Título de Exemplo',
      fontSize: '24px',
      color: '#646cff'
    } as TitleData
  },
  {
    id: "1",
    type: 'text' as ObjectType,
    label: 'Texto',
    icon: '📝',
    data: {
      content: 'Este é um texto de exemplo.',
      fontSize: '16px',
      color: '#000000'
    } as TextData
  },{
    id: "2",
    type: 'image' as ObjectType,
    label: 'Imagem',
    icon: '🖼️',
    data: {
      imageUrl: "/default.png",
      imageAlt: "Exemplo de Imagem",
      source: "Fonte:Local",
      title: "Título da Imagem"
    } as ImageData
  },
  {
    id: "3",
    type: 'topic' as ObjectType,
    label: 'Tópico',
    icon: '🗂️',
    data: {
      topics: ['Exemplo de Tópico 1', 'Exemplo de Tópico 2']
    } as TopicData
  }

] as AnyObject[];


export const ObjectElements = [
  {
    type: 'title' as ObjectType,
    element: Title,
  }, {
    type: 'text' as ObjectType,
    element: Text,
  }, {
    type: 'image' as ObjectType,
    element: Image,
  }, {
    type: 'topic' as ObjectType,
    element: Topic,
  }
] as ObjectElement[];

export interface ObjectElement {
  type: ObjectType;
  element: React.FC<IBaseObjectProps>;
}